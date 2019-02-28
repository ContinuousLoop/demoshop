const fs = require("fs");
const path = require("path");
const rootDir = require("../utility/path");

const _path = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart{
    //find cart data.
    static addProduct(productId, productPrice){
        fs.readFile(_path,(err, data) => {
            //if there is no data, create a cart.
            let cart = {
                products:[],
                price:0
            }
            //if there is data, read from file and parse.
            if(!err){
                cart = JSON.parse(data)
            }
            //see if product exists.
            let productIndex = cart.products.findIndex(product => product.id === productId);
            let product = cart.products[productIndex];
            if(product){
                //if product exists, update quantity & price & add to cart
                product = cart.products[productIndex];
                product.qty ++
                cart.products[productIndex] = product
            } else {
                //if product does not exist, add the quantity and ID.
                product = {
                    qty:1, 
                    id:productId
                }
                cart.products = [...cart.products, product]
            }
            
            cart.price = cart.price + +productPrice

            fs.writeFile(_path, JSON.stringify(cart), error =>{
                console.log(error);
            })
            
        })
    }
}


