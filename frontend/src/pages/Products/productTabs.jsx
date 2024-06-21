import { useState } from "react"
import Rating from "./Rating"
import { Link } from 'react-router-dom'
import { useGetTopProductQuery } from "../../redux/api/productApiSlice"
import SmallProducts from "./SmallProducts"
import Loader from "../../components/Loader"

const productTabs = (
    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product

) => {
    const [activeTab, setActiveTab] = useState(1)
    const [data, isLoading] = useGetTopProductQuery();
    if (isLoading) {
        <Loader />
    }
    const handleTabClick = (tabNum) => {
        setActiveTab(tabNum)
    }
    return (
        <div className="flex flex-col md:flex-row">productTabs
            <Rating />
            <SmallProducts />
            <section className="mr-[5rem]">
                <div className={`flex-1 p-4 cursor-pointer 
                text-lg ${activeTab === 1 ? "font-bold" : ""}`}
                    onClick={() => handleTabClick(1)}
                >Write Your review
                </div>

                <div className={`flex-1 p-4 cursor-pointer 
                text-lg ${activeTab === 2 ? "font-bold" : ""}`}
                    onClick={() => handleTabClick(2)}
                >All reviews
                </div>

                <div className={`flex-1 p-4 cursor-pointer 
                text-lg ${activeTab === 3 ? "font-bold" : ""}`}
                    onClick={() => handleTabClick(3)}
                >Related Products
                </div>
            </section>

            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className="my-2">
                                    <label htmlFor="rating"
                                        className="block text-xl mb-2"
                                    >Rating</label>

                                    <select id="rating" required value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[40rem] text-block"
                                    >
                                        <option value="1">Inferior</option><option value="2">Decent</option><option value="3">Great</option><option value="4">Excellent</option>
                                        <option value="5">exceptional</option>
                                    </select>
                                </div>

                                <div className="my-2">
                                    <label htmlFor="comment"
                                        className="block text-xl mb-2">comment</label>
                                    <textarea id="comment"
                                        rows="3"
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[40rem] text-block"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loadingProductReview}
                                    className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                                >Submit</button>
                            </form>
                        ) : (
                            <p>Please <Link to='/login' >Sign In</Link>To Write A Review </p>
                        )}
                    </div>
                )}
            </section>

            <section>
                {activeTab === 2 && (
                    <div>
                        {product.reviews.length === 0 ? (
                            <p>No reviews</p>
                        ) : (
                            <div>
                                {product.reviews.map((review) => (
                                    <div key={review._id}
                                    className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem]
                                    sm:ml[0rem]
                                    xl:w-[50rem]
                                    sm:w-[24rem] mb-5
                                    ">
                                    <div className="flex justify-between">
                                            <strong
                                            className="text-[#B0B0B0]"
                                            >{review.name}</strong>
                                            <p className="text-[#B0B0B0]">Rating: {review.createdAt.subString(0,10)}</p>
                                    </div>
                                                     
                                        <p className="my-4">{review.comment}</p>
                                        <Rating value={review.rating}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </section>

                <section>
                    {activeTab === 3 &&(
                        <section className="ml-[4rem] flex flex-wrap" >
                            {!data ?(
                                <Loader/>
                            ):(
                                data.map((product)=>(
                                    <div key={product._id} >
                                        <SmallProducts product={product} />
                                    </div>
                                ))
                            )}
                        </section>
                    )}
                </section>

        </div>
    )
}
export default productTabs