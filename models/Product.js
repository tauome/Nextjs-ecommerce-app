const { Schema, model, models } = require("mongoose");

const productSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    price:{type: String, required: true},
    images: {type: [String]}
})

export const Product = models.Product || model('Product', productSchema);

