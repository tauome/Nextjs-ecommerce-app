import { Schema } from "mongoose";
import { models, model } from "mongoose";

const OrderSchema = new Schema({
    line_items: {type: Object},
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean
}, {
    timestamps: true, 
})

export const Order = models.Order || model('Order', OrderSchema);
