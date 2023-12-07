import mongoose, {model, models, Schema, Types} from "mongoose";

const CategorySchema = new Schema({
  name: {type:String,required:true},
  parent: {type: String, ref:'Category', required: false},
  properties: [{type: Object}]
});

export const Category = models?.Category || model('Category', CategorySchema);
