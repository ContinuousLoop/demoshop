const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  const productId = req.params.productId
  if(!editMode){
    res.redirect('/');
  }
  Product.findProductById(productId, product => {
    res.render("admin/edit-product",{   
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          editing: editMode,
          product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imgUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(productId, title, imgUrl, price, description)
  product.save();
  res.redirect("/");

}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imgUrl, price, description);
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

exports.postDeleteProduct = (req, res, next) => {
  let productId = req.body.productId;
  console.log(req.body.productId);
  Product.deleteProduct(productId);
  res.redirect("/");
}