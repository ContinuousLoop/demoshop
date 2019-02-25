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
    constructor(_title, _imgUrl, _price, _description) {
        this.title = _title;
        this.imgUrl = _imgUrl;
        this.price = _price;
        this.description = _description;
    }

    save() {
        this.id = Math.random().toString();
        getProducts(products => {
            products.push(this);
            fs.writeFile(_path, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })

    }

    static fetchAll(callback) {
        getProducts(callback);
    }

    static findProductById(productId, cb){
        getProducts(products => {
            let product = products.find( product => product.id === productId );
            cb(product);
        })
    }
}