import Layout from "@/components/layout";
import { useState } from "react";
import axios from "axios";

export default function Categories() {
    const [name, setName] = useState('');

    async function saveCategory(ev) {
        ev.preventDefault();
        await axios.post('/api/categories', {name});
        setName('');
    }

    return (
        <Layout>
            <div className="ml-2 mr-2">
                <h1>Categories</h1>
                <label> New Category Name</label>
                <form onSubmit={saveCategory} className="flex gap-2 p-1">
                    <input className="mb-0" type="text" placeholder="Category name" onChange={ev => setName(ev.target.value)} value={name}></input>  
                    <button type="submit" className="btn-primary">Save</button>
                </form>  
            </div>
        </Layout>
    );
};