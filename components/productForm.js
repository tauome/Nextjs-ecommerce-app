import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({_id, name: existingName, description: existingDescription, price: existingPrice, images: existingImages}) {

    const [name, setName] = useState(existingName || ''); 
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || ''); 
    const [goToProducts, setGoToProducts] = useState(false); 
    const [images, setImages] = useState(existingImages|| []); 
    const [isUploading, setIsUploading] = useState(false);
    const Router = useRouter(); 

    async function saveProduct (ev) {
        ev.preventDefault(); 
        const data = {name, description, price, images};

        if (_id) {
            //update 
            await axios.put('/api/products', {...data, _id});

        } else {
            await axios.post('/api/products', data); 
        }
        setGoToProducts(true);
    }; 

    if (goToProducts) {
        Router.push('/products')
    }

    async function uploadImages (ev) {
        const files = ev.target?.files; 

        if (files?.length){
            setIsUploading(true); 
            const data = new FormData(); 
            for (const file of files) {
               data.append('file', file);  
            }
            const res = await axios.post('/api/upload', data);
            console.log(res.data); 
            setImages([...images, ...res.data.links]);
        }
        setIsUploading(false); 
    }

    function updateImageOrder(images) {
        setImages(images);
    }


    return (
        <div className="p-2">
            <form onSubmit={saveProduct}>
                <label>Product Name:</label>
                <input type="text" placeholder="product name" value={name} onChange={ev => setName(ev.target.value)}></input>
                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImageOrder}>
                       {images?.map(link => {
                        return (
                            <div key={link} className="h-24 rounded-md">
                                <img className="rounded-lg" src={link}></img>
                            </div>
                        )
                        })}   
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 p-1 flex items-center"> 
                            <Spinner></Spinner>
                        </div>
                    )}
                    <label className="w-24 h-24 cursor-pointer flex items-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
                    <div>
                        Upload
                    </div>
                    <input onChange={uploadImages} type="file" className="hidden"></input>
                </label>
                </div>
                <label>Description</label>
                <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea> 
                <label>Price (in USD)</label>
                <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}></input>
                <button type="submit" className="btn-primary">Save</button>  
            </form>
        </div>
    )
}