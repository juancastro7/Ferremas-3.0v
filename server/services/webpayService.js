// v3.3 - Servicio Webpay compatible y limpio
const { WebpayPlus } = require('transbank-sdk');
const WebpayTransaction = require('../models/WebpayTransaction');

WebpayPlus.configureForIntegration(
  process.env.WEBPAY_COMMERCE_CODE,
  process.env.WEBPAY_API_KEY,
  'https://webpay3gint.transbank.cl'
);

const transaction = new WebpayPlus.Transaction();

exports.iniciarTransaccion = async (buyOrder, sessionId, amount, returnUrl) => {
  try {
    const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);

    if (!response || !response.token || !response.url) {
      throw new Error('Respuesta inválida de Webpay');
    }

    await WebpayTransaction.create({
      token: response.token,
      buyOrder,
      sessionId,
      amount,
      status: 'INICIADA'
    });

    // 💡 Este return es seguro y compatible
    return {
      token: response.token,
      url: response.url
    };
  } catch (error) {
    console.error('❌ Error en iniciarTransaccion:', error);
    throw error;
  }
};

exports.confirmarTransaccion = async (token) => {
  try {
    const response = await transaction.commit(token);

    await WebpayTransaction.update(
      {
        status: response.status || 'CONFIRMADA',
        responseData: JSON.stringify(response)
      },
      { where: { token } }
    );

    return response;
  } catch (error) {
    console.error('❌ Error en confirmarTransaccion:', error);
    throw error;
  }
};

exports.obtenerEstadoTransaccion = async (token) => {
  try {
    const response = await transaction.status(token);
    return response;
  } catch (error) {
    console.error('❌ Error en obtenerEstadoTransaccion:', error);
    throw error;
  }
};
