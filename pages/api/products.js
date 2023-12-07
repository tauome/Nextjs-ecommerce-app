import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} =  req; 
    await mongooseConnect(); 
    await isAdminRequest(req, res);

    if (method === 'GET') {

        if (req.query?.id) {
            return res.json(await Product.findOne({_id: req.query?.id}));
        }
        return res.json(await Product.find()); 
    }

    if (method === 'POST') {
        const {name, description, price, images, category, properties} = req.body;
        const productDoc = await Product.create({
            name, description, price, images, category, properties
        })
        return res.json(productDoc); 
    }

    if (method === 'PUT') {
        const {_id, name, description, price, images, category, properties} = req.body;

        await Product.updateOne({_id}, {name, description, price, images, category, properties});
        return res.json(true); 
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id: req.query.id});
            return res.json(true); 
        }
    }
}