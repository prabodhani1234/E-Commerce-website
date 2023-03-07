const Product =require('../models/product')

const ErrorHandler =require('../utils/errorHandler')

const catchAsyncErrors = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//Create new Product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async(req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get All Products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors (async(req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query) //req.queryStr is equal to req.query
                        .search()

    const Products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: Products.length,
        Products
    })
})

//Get single product details => /api/v1/:id

exports.getSingleProduct = catchAsyncErrors (async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }

    res.status(200).json({
        success:true,
        product
    })
})

//Update product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

//Delete Product => api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors (async(req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})