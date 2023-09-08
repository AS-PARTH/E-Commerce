import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { TbSearch } from 'react-icons/tb';
import { CgShoppingCart } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';

import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";
import "./Header.scss";
import { useAuth0 } from "@auth0/auth0-react";



const Header = () => {

    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { cartCount } = useContext(Context);
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true)
        } else {
            setScrolled(false)

        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, []);


    return (
        <>
            <header
                className={`main-header ${scrolled ? "sticky-header" : ""}`}
            >
                <div className="header-content">
                    <ul className='left'>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li>About</li>
                        <li>Categories</li>
                    </ul>
                    <div className="center"
                        onClick={() => navigate("/")}>STORE</div>
                    <div className="right">
                        <TbSearch onClick={() => setShowSearch(true)} />
                        <AiOutlineHeart />
                        <span className="cart-icon" onClick={() => setShowCart(true)}>

                            <CgShoppingCart />
                            {!!cartCount && <span>{cartCount}</span>}
                        </span>

                        {/*  login authentication */}
                        <div className="auth-buttons-container">
                            {isAuthenticated ? (
                                <div className="logout-button">
                                    <button
                                        className="logout"
                                        onClick={() =>
                                            logout({
                                                logoutParams: { returnTo: window.location.origin },
                                            })
                                        }
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="button">
                                    <button className="button-cta" onClick={() => loginWithRedirect()}>
                                        Login
                                    </button>
                                </div>
                            )}
                        </div>
                        


                    </div>
                </div>
            </header>
            {showCart && <Cart setShowCart={setShowCart} />}
            {showSearch && < Search setShowSearch={setShowSearch} />}
        </>
    );
};

export default Header;
