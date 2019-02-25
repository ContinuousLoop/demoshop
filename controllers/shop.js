const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'Shop',
            products: products,
            path: '/products'
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle:'Home',
            products:products,
            path:'/'
        })
    })
}

exports.getOrders=(req, res, next) => {
    res.render('shop/orders', {
        pageTitle:'My Orders',
        path:"/orders"
    })
}

exports.getProductId = (req,res,next) => {
    let productId = req.params.productId;
    Product.findProductById(productId, product =>{
        console.log(product);
    });
    res.redirect('/');
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path:'/cart'
    })
}

exports.getCheckOut = (req, res, next) => {
    res.render('shop/check-out',{
        pageTitle:'Check-Out',
        path:'/check-out'
    })
}


