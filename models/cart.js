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
}