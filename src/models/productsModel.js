
const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const ProductsCollection = "products"
const ProductsSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true,
    },
    descripcion : {
        type : String,
        required : true,
    },
    section : {
        type: String,
        required: true,
        enum: ["material", "sanitarios", "ferreteria"]
    },
    price : {
        type : Number,
        required : true
    },
    code : {
        type : Number,
        required : true,
        unique : true 
    },
    stock : {
        type : Number,
        required : true
    },
    thumbanail : {
        type: Array,
        default: []
    }
    

})
ProductsSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(ProductsCollection, ProductsSchema)

module.exports = productsModel;