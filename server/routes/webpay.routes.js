const express = require('express');
const router = express.Router();
const webpayService = require('../services/webpayService');

// Ruta de prueba
router.post('/debug', (req, res) => {
  res.send('🧪 Ruta POST /api/webpay/debug activa');
});

// Iniciar una transacción
router.post('/iniciar', async (req, res) => {
  const { buyOrder, sessionId, amount, returnUrl } = req.body;

  if (!buyOrder || !sessionId || !amount || !returnUrl) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  try {
    const result = await webpayService.iniciarTransaccion(buyOrder, sessionId, amount, returnUrl);
    res.status(201).json({
      mensaje: 'Transacción iniciada correctamente',
      token: result.token,
      url: result.url
    });
  } catch (error) {
    console.error('❌ Error iniciando pago:', error.message);
    res.status(500).json({ error: 'Error iniciando pago', detalle: error.message });
  }
});

// Confirmar una transacción
router.put('/confirmar/:token', async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ error: 'Token requerido.' });
  }

  try {
    const result = await webpayService.confirmarTransaccion(token);
    res.status(200).json({
      mensaje: 'Transacción confirmada',
      resultado: result
    });
  } catch (error) {
    console.error('❌ Error confirmando pago:', error.message);
    res.status(500).json({ error: 'Error confirmando transacción', detalle: error.message });
  }
});

// Consultar estado
router.get('/estado/:token', async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ error: 'Token requerido.' });
  }

  try {
    const estado = await webpayService.obtenerEstadoTransaccion(token);
    res.status(200).json({
      mensaje: 'Estado obtenido',
      estado
    });
  } catch (error) {
    console.error('❌ Error consultando estado:', error.message);
    res.status(500).json({ error: 'Error consultando estado', detalle: error.message });
  }
});

module.exports = router;
