const fs = require('fs');
const path = require('path');
const root = require('../util/path');
const p = path.join(root,'data','products.json');

const getAllProducts = (cb) =>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
        return cb([]);
        }
        cb(JSON.parse(fileContent));
    })
}


module.exports = class Product{

    constructor(t){
        this.title = t;
    }


    save(){
    
        getAllProducts((products)=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            })    
        })
        
    }

    static fetchAll(cb){
         getAllProducts(cb);
    }
} 