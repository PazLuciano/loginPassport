
const { log } = require("console");
const cartsModel = require("../models/cartsModel");
const productsModel = require("../models/productsModel");
const { propfind } = require("../routes/productsRouter");

class CartManager {
    async addCart(){
        try {
            const cart = await cartsModel.create({});
            // console.log("cart --> ", cart);
            return cart
        } catch (error) {
            console.log(error.message);
        }
    }
    async getCart(cid){
        try {
            const cart = await cartsModel.find({ _id : cid}).populate("products.product")
            // console.log(cart.products);
            // cart = JSON.stringify(cart, null)
            // console.log("cart", cart);
            return cart

        } catch (error) {
          console.log("error  --> ", error.message);  
        }
    }
    async addProductAtCart(cid, pid, quantity = 1){
        try {
            const product = await productsModel.find({_id : pid})  
            let cart = await cartsModel.find({_id : cid})
            let confirmacion = 0
            const validando = cart[0].products.forEach((pro) => {
                const id = JSON.stringify(pro.product);
                const prueba = id.includes(pid)
                if(prueba){
                    confirmacion = 1 
                }
            })
            if(confirmacion == 0){
                const productPush = await cartsModel.updateOne({_id : cid}, {
                     $push : {
                        products : {
                            cantidad: quantity,
                            product : pid,
                        }
                    }
                })
                console.log("productPush", productPush);
                return productPush
            }
            if(confirmacion == 1){
                return 2
            }

        } catch (error) {
            console.log(error.message);
            if(error.message.includes("Carts")){
                console.log("error --> ", error.message);
                return 0
            }
            return 1
        }
    }    
    async deleteProductAtCart(cid, pid){
        try {
            const product = await productsModel.find({_id : pid})  
            let cart = await cartsModel.find({_id : cid})  
            let confirmacion = 0
            const validando = cart[0].products.forEach((pro) => {
                const id = JSON.stringify(pro.product);
                const prueba = id.includes(pid)
                if(prueba){
                    confirmacion = 1 
                }
            })
            console.log(confirmacion);
            if(confirmacion){
                const deletePush = await cartsModel.updateOne({_id : cid}, {
                    $pull : {
                       products : {
                            product : pid
                       }
                   }
               })
               console.log("productPush", deletePush);
               return deletePush
            }else{
                return 2
            }
            

        } catch (error) {
            console.log(error.message);
            if(error.message.includes("Carts")){
                console.log("error --> ", error.message);
                return 0
            }
            return 1
            
        }
    }
    async deleteAllCart(cid){
        try {
            let cart = await cartsModel.find({_id : cid})
            // cart[0].products = [];
            // console.log(cart);
            const deleteCart = await cartsModel.updateOne({_id : cid}, {products: []})
            // console.log(deleteCart);
            return deleteCart
        } catch (error) {
            console.log(error.message);
            return 1
        }
    }
    async updateProductAtCart(cid, pid, quantity){
        try {
            let cart = await cartsModel.find({_id : cid})
            // console.log(cart[0])
            // console.log("QUA", quantity);
            let indice = 0;
            cart[0].products.forEach((pro) => {
                // console.log("producto", pro);
                const id = JSON.stringify(pro.product);
                if (id.includes(pid)){
                    pro.quantity = quantity;
                    return
                }
                return 0
            })
            console.log(cart[0]);
            const update = await cartsModel.updateOne({_id : cid}, cart[0])
            console.log(update);
            // return update
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = CartManager;