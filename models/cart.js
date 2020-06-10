const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart{
    static addProduct(id,productPrice) {

        fs.readFile(p,(err,fileContent)=>{
            //Load Previous cart if exists
            let cart = {products:[],totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            //Analyze existing cart for product
        const existingProdIndex = cart.products.findIndex(prod=>prod.id===id);
        const existingProd = cart.products[existingProdIndex];
        if(existingProd){
            let updatedProd = {...existingProd};
            updatedProd.qty = updatedProd.qty+1;    
            cart.products=[...cart.products];
            cart.products[existingProdIndex] = updatedProd; 
            }else{
          let updatedProd = {id: id , qty: 1};
            cart.products= [...cart.products,updatedProd];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })
        })
    }

    static deleteProduct(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                return;
            }
            let cart = JSON.parse(fileContent);
            const updateCart ={...cart};
            const product = updateCart.products.find(p=> p.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updateCart.products = updateCart.products.filter(prod => prod.id !== id);
            updateCart.totalPrice = updateCart.totalPrice-productPrice*productQty;

            fs.writeFile(p,JSON.stringify(updateCart),err=>{
                if(err){
                    console.log("Error:",err);  
                }
            })
        })
    }
    static getCart(cb){
        fs.readFile(p,(err,fileContent)=>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        })
    }
}