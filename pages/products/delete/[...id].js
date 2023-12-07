import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/layout";

export default function deleteProductPage () {
    const [productInfo, setProductInfo] = useState(null); 
    const router = useRouter(); 
    const {id} =  router.query; 

    function goBack(){
        router.push('/products'); 
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id);
        goBack(); 
    }

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/api/products?id='+id).then(res => {
            setProductInfo(res.data); 
        })
    }, [id])

    return (
        <Layout>
            <div className="ml-4 mt-4">
                <h1 className="text-center">Do you really want to delete "{productInfo?.name}"?</h1>
                <div className="flex gap-2 justify-center">
                    <button onClick={deleteProduct} className="btn-red">Yes</button>
                    <button className="btn-default" onClick={goBack}>No</button>
                </div>  
            </div>
        </Layout>
    );
}