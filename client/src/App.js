import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from './components/SingleProduct/SingleProduct';
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import OrderSuccessPage from "./components/OrderSuccessPage";


function App() {
    return (
        <BrowserRouter>
            <AppContext>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/success" element={<OrderSuccessPage />} />
                    
                   
                </Routes>
                <Newsletter />
                <Footer />
                
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
