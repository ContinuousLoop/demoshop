const fs = require('fs');
const rootDir = require('../utility/path');
const path = require('path');

const _path = path.join(rootDir, 'data', 'products.json');

const getProducts = callback => {
    fs.readFile(_path, (err, data) => {
        if (err) {
            return callback([])
        }
        callback(JSON.parse(data));
    })
}

module.exports = class Product {
    constructor(_id, _title, _imgUrl, _price, _description) {
        this.id = _id;
        this.title = _title;
        this.imgUrl = _imgUrl;
        this.price = _price;
        this.description = _description;
    }

    // Retrieve products and check if the id === productId if product id already
    // exists, find index and replace it with new item write to file

    save() {
        getProducts(products => {
            if (this.id) {
                let productIndex = products.findIndex(product => product.id === this.id);
                let newProducts = [...products];
                newProducts[productIndex] = this;
                fs.writeFile(_path, JSON.stringify(newProducts), error => {
                    console.log(error);
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(_path, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }

        })
    }

        static fetchAll(callback) {
            getProducts(callback);
        }

        static findProductById(productId, cb) {
            getProducts(products => {
                let product = products.find(product => product.id === productId);
                cb(product);
            })
        }
    }