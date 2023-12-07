import mongooseConnect from "@/lib/mongoose";
import {Category} from "@/models/Category";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'POST') {
        const {name, parentCategory, properties} = req.body; 

        const categoryDoc = await Category.create({name, parent: parentCategory || undefined, properties}); 
        res.json(categoryDoc);  

    };

    if (method === 'GET') {
        const categories = await Category.find().populate('parent'); 
        res.json(categories);
    }

    if (method === 'PUT') {
        const {_id, name, parentCategory, properties} = req.body;

        await Category.updateOne({_id}, {name, parent: parentCategory || undefined, properties});
        res.json(true);
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json(true);
    }
}