import React, { useEffect, useContext } from "react";
import Banner from './Banner/Banner';
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
    const { categories, setCategories, products, setProducts } = useContext(Context);

    const getCategories = async () => {
        try {
            const res = await fetchDataFromApi("/api/categories?populate=*");
            setCategories(res);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getProducts = async () => {
        try {
            const res = await fetchDataFromApi("/api/products?populate=*");
            setProducts(res);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category categories={categories} />
                    <Products
                     headingText="Popular Products"
                      products={products} />
                </div>
            </div>
        </div>
    );
};

export default Home;
