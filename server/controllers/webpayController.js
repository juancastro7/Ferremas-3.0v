// v2.1 - Totalmente compatible con transbank-sdk@3.x
const { WebpayPlus } = require('transbank-sdk');

// Configura el entorno de integración
WebpayPlus.configureForIntegration(
  '597055555532', // API Key ID (Integration)
  '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', // API Key Secret (Integration)
  'https://webpay3gint.transbank.cl' // URL oficial integración
);

// Iniciar transacción
exports.initTransaction = async (req, res) => {
  try {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    const response = await WebpayPlus.Transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    res.status(200).json({
      token: response.token,
      url: response.url
    });
  } catch (error) {
    console.error('Error iniciando transacción:', error);
    res.status(500).json({ error: 'No se pudo iniciar la transacción' });
  }
};

// Confirmar transacción (commit)
exports.commitTransaction = async (req, res) => {
  try {
    const { token_ws } = req.body;

    if (!token_ws) {
      return res.status(400).json({ error: 'token_ws es requerido' });
    }

    const response = await WebpayPlus.Transaction.commit(token_ws);
    console.log('Transacción confirmada:', response);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Error al confirmar la transacción:', error);
    res.status(500).json({ error: 'No se pudo confirmar la transacción' });
  }
};

// Obtener estado de la transacción
exports.getTransactionStatus = async (req, res) => {
  try {
    const token = req.params.token;

    const response = await WebpayPlus.Transaction.status(token);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error al obtener estado:', error);
    res.status(500).json({ error: 'No se pudo obtener el estado' });
  }
};
