const Product = require('../models/product');
const Cart = require('../models/cart');

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
    Product.findProductById(productId, product => {
        res.render("shop/product-detail", {
            pageTitle: "Product Details",
            path:"/products",
            product: product
        });
    });
}

exports.getCart = (req, res, next) => {
    let cart = [];
    //Get the list of products and match the cart ID with product ID
    Product.fetchAll(products => {
        // console.log(products[0]);
        Cart.getCart(cartItems => {
        // console.log(cartItems.products);
            for(let item of cartItems.products) {
                let cartItem = products.find( product => product.id === item.id);
                if(cartItem){
                    cart.push({productData: cartItem, qty:1});
                }
            }
            res.render('shop/cart',{
                pageTitle:'Cart',
                path:'/cart',
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    let productId = req.body.productId;
    //retrieve products from list to look up
    Product.findProductById(productId, product => {
        Cart.addProduct(productId, product.price);
    })
    res.redirect('/');
}

exports.getCheckOut = (req, res, next) => {
    res.render('shop/check-out',{
        pageTitle:'Check-Out',
        path:'/check-out'
    })
}


