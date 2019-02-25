const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imgUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('admin/products', {
            pageTitle: 'Products',
            path: '/admin/products',
            products: products
        });
    } )
}

exports.getEditProducts = (req, res, next) => {
    res.render('admin/edit-product',{
        pageTitle:'Edit Products',
        path: '/admin/edit-product'
    })
}