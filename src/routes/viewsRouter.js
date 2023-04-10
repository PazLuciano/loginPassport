const { Router } = require("express");
const {authMdw, roleAuth} = require("../middleware/auth");
const  CartManager  = require("../services/cartsServices");
const router = Router();
const manager = new CartManager()
const { ProductManager } = require("../services/productsServices");
const productManager = new ProductManager()

router.get("/cart/:cid", async (req, res) => {
    ""
    // Buscar informacion para mandar a la vista
    const { cid } = req.params;
    const cart = await manager.getCart(cid)
    // console.log(cart);
    if (cart) {
        // console.log();
        // console.log(cart[0].products);

        const productosII = cart[0].products.map(product => product.toJSON())
        console.log(productosII);
        // const productos = {producots : cart[0].products}
        return res.render("cart", productosII)
    }
    // console.log("11asda");
    res.json({ok: false, message: "Cart not found"})
})

router.get("/products", async (req, res) => {
    console.log("holaa");
    try {
        const { limite = 10, pagina = 1, categoria } = req.query
        // QUERY: PUEDE ENVIAR LA CATEGORIA QUE QUIERA (DE LAS 3 POSINLRD)
        // console.log(query);
        if (categoria){
            if (categoria == "sanitarios" || categoria == "material" || categoria == "ferreteria"){
                const productos = await productManager.getProductsByCategory(query);
                return res.render("products", productos)
            }
           
            return res.json({
                ok: false,
                message : "categoria not found"
            })
        }
        const {docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, limit  } = await productManager.getProducts(limite, pagina);
        const productos = docs.map((prod) => {
            return prod.toJSON()
        })
        // console.log(productos, hasNextPage, hasPrevPage)
        
        return res.render("products",{
            productos,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasNextPage,
            hasPrevPage,
            limit
        })
    } catch (error) {
        console.log(error);
    } 
})

// Logins and session VIEWS.


router.get("/register", async (req, res) => {
    res.render("register")
})

router.get("/login", (req, res) => {
    if(req.session?.user){  
        // req.session.user._doc.nombre = "Luchiii"
        const user = req.session.user._doc;
        console.log(user);
        return res.render("pagemain", { user: user })
    }

    res.render("login")
})

router.get("/pagemain" ,[authMdw, roleAuth] ,(req,res) => {
    // console.log(req.session.user);
    const user = req.session.user._doc || req.session.user
    // console.log(user);
    // const user = req.session.user;
    // console.log(user);
    res.render("pagemain", {user})
})



module.exports = router