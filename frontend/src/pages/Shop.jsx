import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice'

import { setCategories, setProducts, setChecked } from '../redux/features/shop/shopSlice'

import Loader from '../components/Loader'

import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice'

const Shop = () => {

    const [priceFilter, setPriceFilter] = useState('')

    const dispatch = useDispatch()

    const { categories, products, checked, radio } = useSelector((state) => state.shop)

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch])

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading) {
                //filtere products based on checked categories and price filter

                const filteredProducts = filteredProductsQuery.data.filter((product) => {
                    //check if product price includes the entered price filter value
                    return (
                        product.price.toString().includes(priceFilter) || product.price === parseInt(priceFilter, 10)
                    )
                })
                dispatch(setProducts(filteredProducts))
            }
        }
    })

    const categoriesQuery = useFetchCategoriesQuery()

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    })

    return (
        <div>Shop</div>
    )
}
export default Shop