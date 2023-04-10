const { Router } = require("express");

const { ProductManager } = require("../services/productsServices");
const router = Router();


const manager = new ProductManager()

router.post("/productsBase", async (req, res) => {
    try {
        const products = await manager.insertion();
        res.json({
            ok : true,
            products
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.get("/", async (req, res) => {
    // obtener products
    try {
        const { limite = 10, pagina = 1, query } = req.query
        // QUERY: PUEDE ENVIAR LA CATEGORIA QUE QUIERA (DE LAS 3 POSINLRD)
        // console.log(query);
        if (query){
            if (categoria == "sanitarios" || categoria == "material" || categoria == "ferreteria"){
                const productos = await manager.getProductsByCategory(query);
                return res.json({
                    ok : true,
                    productos
                })
            }
            return res.json({
                ok: false,
                message : "categoria not found"
            })
        }
        const {docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, limit  } = await manager.getProducts(limite, pagina);
        // console.log(docs);
        return res.json({
            ok: true,
            products: docs,
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

router.get("/:id", async (req, res) => {
    let { id } = req.params
    // console.log("id -->", id);

    try {
        const product = await manager.getProductById(id);
        // console.log("product", product);
        if (product){
            return res.json({
                    ok : true,
                    message : "get product succesfully",
                    product
            })
        }
        res.status(404).json({
            ok : false,
            message: "Proct not found"
        })
    } catch (error) {
        console.log(error);
    }
    
})
router.get("/categoria/:categoria", async (req,res) => {
    try {
        const { categoria } = req.params;
        if (categoria == "sanitarios" || categoria == "material" || categoria == "ferreteria"){
            const productos = await manager.getProductsByCategory(categoria);
            res.json({
                ok : true,
                productos
            })
        }
        res.json({
            ok: false,
            message : "categoria not found"
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.post("/", async (req, res) => {
    try {
        const bodyProduct = req.body;
        //Validar que no se encuentre en la BBDD
        // console.log();
        const newProduct = await manager.createProduct(bodyProduct);
        if(newProduct){
            return res.json({
                ok : true,
                message : "Product created",
                newProduct
            })
    
        }
        res.send("Code is in use or missing necessary data")
        
    } catch (error) {
        console.log(error.message);
    }

});

router.put("/:id", (req, res) => {
    //actualizar
    try {
        const bodyProduct = req.body;
        let { id } = req.params
        const updateProduct = manager.updateProduct(id, bodyProduct);
        if (updateProduct){
            return res.json({
                ok : true, 
                message : "Product updated succesfully",
                updateProduct
            })       
        }
        res.json({
            ok : false,
            message: "product no found"
        })
        
        
    } catch (error) {
        console.log(error.message);
    }

})

router.delete("/:id", async (req, res) => {   
    try {
        let { id } = req.params
        const deleteProduct = await manager.deleteProduct(id);
        console.log(deleteProduct);
        if(deleteProduct){
            return res.json({
                ok : true, 
                message : "product deleted",
            })
        }
        res.json({
            ok : false,
            message: "Product not found"
        })

    } catch (error) {
        console.log(error.message);
    }
})



module.exports = router;