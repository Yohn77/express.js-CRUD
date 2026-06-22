const express = require('express');
const router = express.Router();
const BarangController = require('../controllers/barangController');

// Routes untuk barang
router.get('/', BarangController.index);
router.get('/create', BarangController.createForm);
router.post('/store', BarangController.store);
router.get('/edit/:id', BarangController.editForm);
router.post('/update/:id', BarangController.update);
router.get('/delete/:id', BarangController.delete);
router.get('/search', BarangController.search);

module.exports = router;