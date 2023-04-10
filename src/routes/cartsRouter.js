const { log } = require("console");
const { Router } = require("express");
const  CartManager  = require("../services/cartsServices");
const router = Router();

const manager = new CartManager()
// router.get("/", (req, res) => {
//     res.send("holaaa")
// })
router.post("/", async (req, res) => {
    // AGREGAR CARRIT A BBDD 
    try {
        const resultado = await manager.addCart();
        res.json({
            ok : true,
            message : "cart created succesfully",
            cart : resultado
        })
        
    } catch (error) {
        console.log(error.message);
    }

})
router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        // validar cid
        const cart = await manager.getCart(cid);
        // console.log("cart- -> ", cart);
        if (cart){
            // console.log("cart -- >", cart);
            return res.json({
                ok : true,
                message : "Get cart succesfully!",
                cart
            })
            
        }
        res.json({
            ok : false,
            message : "Cart not found"
        })
    } catch (error) {
        console.log("error -->", error.message);
    }
    // Mostrar array de productos a paritr del ID del carrito.
})
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { quantity } = req.body;
        const { cid, pid } = req.params;
        const result = await manager.addProductAtCart(cid, pid, quantity);
        // console.log(quantity);
        console.log("rsult --> ", result);
        if(result !== 1 && result !== 0 && result !== 2){
            return res.json({
                ok : true,
                message : "Product push!!",
                cart : result
            })
        }
        if(result == 2){
            return res.json({
                ok : false,
                message: "product added to cart previously"
            })
        }
        if(result == 1){
            return res.json({
                ok : false,
                message : "product not found"
            })
        }
        res.json({
            ok : false,
            message : "cart not found"
        }
        )
    }   catch (error) {
        console.log(error.message);
    }
})
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await manager.deleteProductAtCart(cid, pid)
        // console.log("result -->", result);
        // res.send("seguimos probando")
        if(result !== 1 && result !== 0 && result !== 2){
            return res.json({
                ok : true,
                message : "Product updated sucesfully!",
            })
        }
        if(result == 2){
            return res.json({
                ok : false,
                message: "product not found in the cart"
            })
        }
        if(result == 1){
            return res.json({
                ok : false,
                message : "The product does not exist"
            })
        }
        res.json({
            ok : false,
            message : "cart not found"
        }
        )
        
    } catch (error) {
        console.log(error.message);
    }
})
router.put("/:cid/product/:pid", async (req, res) => {
    // No podemos moficiar cantidad por que no lo pudimos agregar!
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        if (quantity){
            const resultado = await manager.updateProductAtCart(cid,pid,quantity)
            console.log("res",resultado);
            if(resultado == 0){
                return res.json({
                    ok : false,
                    message : "product not found in the cart"
                })
            }
            return res.json({
                ok:true,
                message : "Quantity updated succesfully"
            })
        }
        return res.status(400).json({
            ok: false,
            error: "did not send the correct param"
        })
    } catch (error) {
        console.log(error.message);
    }

})
router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    const deleteCart = await manager.deleteAllCart(cid)
    // console.log("delete", deleteCart);
    if(deleteCart == 1){
        res.json({
            ok : false,
            message : "Cart not found"
        })
    }
    res.json({
        ok : true,
        message: "deleted cart succesfully"
        
    })
    
})
router.put("/:cid", async(req, res) =>{
    const { cid } = req.params;
})
module.exports = router