const { Schema, model, models } = require("mongoose");
import mongoose from "mongoose";

const productSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    price:{type: String, required: true},
    images: {type: [String]},
    category: {type: String, ref: 'Category'},
    properties: {type: Object}
})

export const Product = models.Product || model('Product', productSchema);

