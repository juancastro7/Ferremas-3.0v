const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/codigo/:codigo', productController.getProductByCodigo);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/categoria/:categoria', productController.getProductsByCategoria);
router.get('/stock-bajo', productController.getProductsWithLowStock);

module.exports = router;