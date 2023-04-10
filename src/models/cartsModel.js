
const mongoose = require("mongoose")

const CartsCollection = "carts"
const CartsSchema = new mongoose.Schema({

    products: {
        type: [
            {
                product:{
                    // cantidad: {
                    //     type: Number, // invalid
                    //     default: 1
                    // },
                    type: mongoose.Schema.Types.ObjectId,
                    unique: true,
                    ref: "products",
                },
                quantity : {
                    type: Number,
                    default: 1
                }
                
            
            }
        ],
        default: []
    }
})

const cartsModel = mongoose.model(CartsCollection, CartsSchema)

module.exports = cartsModel;