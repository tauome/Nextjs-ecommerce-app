import mongooseConnect from "@/lib/mongoose";
import {Category} from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req, res);


    if (method === 'GET') {
        const categories = await Category.find().populate('parent'); 
        res.json(categories);
    }

    if (method === 'POST') {
        const {name, parentCategory, properties} = req.body; 

        const categoryDoc = await Category.create({name, parent: parentCategory || undefined, properties}); 
        res.json(categoryDoc);  

    };

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