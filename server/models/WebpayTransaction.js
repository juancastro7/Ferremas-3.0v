// models/WebpayTransaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WebpayTransaction = sequelize.define('WebpayTransaction', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  buyOrder: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'buy_order'
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'session_id'
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responseData: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'response'
  }
}, {
  tableName: 'webpay_transactions',
  timestamps: true
});

module.exports = WebpayTransaction;
