
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice'

import { toast } from 'react-toastify'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import AdminMenu from "./AdminMenu"

const ProductUpdate = () => {
    const params = useParams()
    const { data: ProductData } = useGetProductByIdQuery(params._id)

    const [image, setImage] = useState(ProductData?.image || "")
    const [name, setName] = useState(ProductData?.name || "")
    const [price, setPrice] = useState(ProductData?.price || "")
    const [category, setCategory] = useState(ProductData?.category || "")
    const [description, setDescription] = useState(ProductData?.description || "")
    const [stock, setStock] = useState(ProductData?.countInStock)
    const [quantity, setQuantity] = useState(ProductData?.quantity | "")
    const [brand, setBrand] = useState(ProductData?.brand || "")

    const navigate = useNavigate()
    const { data: categories = [] } = useFetchCategoriesQuery()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()
    const [uploadProductImage] = useUploadProductImageMutation()

    useEffect(() => {
        if (ProductData && ProductData._id) {
            setImage(ProductData.image);
            setName(ProductData.name);
            setPrice(ProductData.price);
            setCategory(ProductData.category);
            setDescription(ProductData.description);
            setStock(ProductData.countInStock);
            setBrand(ProductData.brand);
            setQuantity(ProductData.quantity);
        }
    }, [ProductData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('quantity', quantity);
            formData.append('brand', brand);
            formData.append('countInStock', stock);

            const { data } = await updateProduct({productId:params._id,formData});

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(`Product is updated Successfully`);
                navigate('/admin/allproductslist');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed updating Product, Try Again");
        }
    };
    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are You Sure ?');
            if(!answer) return;
            const {data} = await deleteProduct(params._id)
            toast.success(`${data.name} is Deleted`)
            navigate('/admin/allproductslist')
        } catch (error) {
            console.log(error);
            toast.error ("delete failed.")
        }
    }

    const uploadFileHandler = async(e) => {
        const formData = new FormData()
        formData.append('image',e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            setImage(res.image)
            toast.success("added item successfully.")
        } catch (error) {
            toast.error("can not add item ")
        }
    }

    

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Create Product</div>
                    {image && (
                        <div className="text-center">
                            <img src={image}
                                alt="product"
                                className="block mx-auto max-h-[200px]" />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input type="file" name="image" accept=".jpg,.jpeg,.png,.webp"
                                onChange={uploadFileHandler}
                                className={!image ? 'hidden' : 'text-white'}
                            />
                        </label>
                    </div>
                    <div className="py-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011]
                            text-white " value={name} onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="name block">Price</label><br />
                                <input type="number" className=" p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011]
                            text-white " value={price} onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="one">
                                <label htmlFor="name block">Quantity</label><br />
                                <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011]
                            text-white " value={quantity} onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className="two ml-10">
                                <label htmlFor="name block">Brand</label><br />
                                <input type="text" className=" p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011]
                            text-white " value={brand} onChange={e => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <label htmlFor="" className="my-5">Description</label>
                        <textarea type="text"
                            className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                            value={description} onChange={e => setDescription(e.target.value)}
                        > </textarea>
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block">Count In Stock</label><br />
                                <input type="text"
                                    className="p-4 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                                    value={stock} onChange={e => setStock(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="category">Category</label><br />
                                <select
                                    placeholder="Choose category"
                                    id="category"
                                    className="p-4 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    {categories?.map((c, index) => (
                                        <option key={c.id || index} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="">
                            <button
                                onClick={handleSubmit}
                                className="py-4 px-10 mt-5 rounded-lg text-lg
                        font-bold bg-green-600 mr-6"
                            >
                                Update
                            </button>

                            <button
                                onClick={handleDelete}
                                className="py-4 px-10 mt-5 rounded-lg text-lg
                        font-bold bg-pink-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate

