import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProducts from "../pages/Products/SmallProducts";
import { useGetTopProductQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductQuery();
    console.log(data);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR: {error.message}</h1>;
    }

    if (!data || data.length === 0) {
        return <h1>No Products Found</h1>;
    }

    return (
        <div className="text-white">
            <div className="flex justify-between">
                <div className="xl:block lg:hidden md:hidden sm:hidden">
                    <div className="grid grid-cols-2">
                        {data.map((product) => (
                            <div key={product._id}>
                                <SmallProducts product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProductCarousel />
        </div>
    );
};

export default Header;
