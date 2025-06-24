require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();


// Rutas externas
const sucursalRoutes = require('./routes/sucursalRoutes');
const productRoutes = require('./routes/productRoutes');
const webpayRoutes = require('./routes/webpay.routes');
const bcchRoutes = require('./routes/bcchRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');

// Configuración de Sequelize
const sequelize = require('./config/database');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // necesario para servir pago-exitoso.html

// 🛣 Rutas API
app.use('/api/bcch', bcchRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/sucursales', sucursalRoutes);
app.use('/api/products', productRoutes);
app.use('/api/webpay', webpayRoutes);
app.use('/api/sucursales', require('./routes/sucursales'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/currency', require('./routes/currencyRoutes'));
app.use('/api/user', require('./routes/userMessages.routes'));

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ⚙️ Cache para tasas de cambio
let ratesCache = {
  lastUpdated: null,
  data: null
};
const CACHE_TTL = 3600000; // 1 hora

// 📈 Función para obtener tasas
async function getExchangeRates() {
  const now = new Date();
  if (!ratesCache.data || now - ratesCache.lastUpdated > CACHE_TTL) {
    try {
      const response = await axios.get(process.env.BCCH_API_URL);
      ratesCache.data = {
        USD: response.data.dolar.valor,
        EUR: response.data.euro.valor,
        lastUpdated: new Date(response.data.dolar.fecha)
      };
      ratesCache.lastUpdated = now;
    } catch (error) {
      console.error('Error al obtener tasas:', error.message);
      throw new Error('Error al consultar tasas de cambio');
    }
  }
  return ratesCache.data;
}

// 📊 Rutas de divisas
app.get('/api/currency/rates', async (req, res) => {
  try {
    const rates = await getExchangeRates();
    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/currency/convert', async (req, res) => {
  try {
    const { amount, from, to } = req.body;
    const rates = await getExchangeRates();

    const validCurrencies = ['USD', 'EUR', 'CLP'];
    if (!validCurrencies.includes(from) || !validCurrencies.includes(to)) {
      return res.status(400).json({ error: 'Moneda no soportada. Use USD, EUR o CLP' });
    }

    const ratesToCLP = {
      USD: rates.USD,
      EUR: rates.EUR,
      CLP: 1
    };

    const amountInCLP = amount * ratesToCLP[from];
    const convertedAmount = amountInCLP / ratesToCLP[to];

    res.json({
      originalAmount: amount,
      fromCurrency: from,
      toCurrency: to,
      exchangeRate: ratesToCLP[from] / ratesToCLP[to],
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      lastUpdated: rates.lastUpdated
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🟢 Ruta que sirve el HTML estático tras pago (Webpay redirige aquí)
app.get('/pago-exitoso', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pago-exitoso.html'));
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API de Ferretería Online con MySQL y Conversión de Divisas');
});

app.get('/test', (req, res) => {
  res.send('FERREMAS API activa');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// 🚀 Inicio del servidor HTTP (modo desarrollo)
sequelize.sync({ force: false })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`
      🚀 Servidor HTTP activo en: http://localhost:${PORT}
      📦 Productos: POST http://localhost:${PORT}/api/products
      💹 Divisas: GET http://localhost:${PORT}/api/currency/rates
      🔄 Conversor: POST http://localhost:${PORT}/api/currency/convert
      💳 Webpay: POST http://localhost:${PORT}/api/webpay/iniciar
      🔁 Retorno Webpay: GET http://localhost:${PORT}/pago-exitoso
      `);
    });
  })
  .catch(error => {
    console.error('Error de conexión a DB:', error);
  });
