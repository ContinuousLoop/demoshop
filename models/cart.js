const fs = require("fs");
const path = require("path");
const rootDir = require("../utility/path");

const _path = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart{
        // Find cart data to read from.
        static getCartData(productId, cb){
            fs.readFile(_path, (err, data) => {
                let cart = {
                    products: [],
                    price: 0
                };

                if(!err){ 
                    cart = JSON.parse(data)
                }
                let updatedProduct
                const existingProduct = cart.products.find(product => product.id === productId);
                if(existingProduct){
                    updatedProduct = {...existingProduct};
                    updatedProduct.qty ++;
                } else {
                    updatedProduct = {id:productId, qty:1};
                }
                

                // Set data to either be blank array, or set it to be JSON data.
                
                
            })
        }
        
        //check if item exists in data,
        //If data exists, increase quantity else add the item 
}


