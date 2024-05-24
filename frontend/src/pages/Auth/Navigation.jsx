import { useState } from 'react'
import { AiOutlineHome, AiOutlineLogin, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai"
import { FaHeart } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'
import './Navigation.css'


function Navigation() {

    const { userInfo } = useSelector(state => state.auth)

    const [dropDown, setdropDownOpen] = useState(false)
    const [showSideBar, setshowSideBar] = useState(false)

    const toggleDropDown = () => {
        setdropDownOpen(!dropDown)
    }
    const toggleSidebar = () => {
        setshowSideBar(!showSidebar)
    }

    const closeSidebar = () => {
        setshowSideBar(false)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div style={{ zIndex: 99 }} className={`${showSideBar}?"hidden":"flex"} xl:flex lg:flex md:hidden
         sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id="navigation-container">
            <div className="flex flex-col justify-center space-y-4">
                <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
                </Link>
                <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                </Link>
                <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
                </Link>

                <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaHeart className='mr-2 mt-[3rem]' size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">FAVOURITES</span>{" "}
                </Link>
            </div>

            <div className="relative">
                <button onClick={toggleDropDown}
                    className='flex items-center text-gray-8000 focus:outline-none'>
                    {userInfo
                        ? <span className='text-white'>{userInfo.username}</span>
                        : (<></>)
                    }

                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className='{`h-4 w-4 ml-1 ${
                                    dropDown ? "transform rotate-180" : ""
                                }`}'
                            fill="none"
                            viewBox='0 0 24 24'
                            stroke='white'
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropDown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>
                    )
                    }
                </button>
                {dropDown && userInfo && (
                    <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bh-white text-gray-600 
                    ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-100'>
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/admin/productlist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Products
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/admin/categorylist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Category
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/admin/orderlist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Orders
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/admin/userlist' className='block px-4 py-2 hover:bg-gray-100'>
                                        Users
                                    </Link>
                                </li>


                            </>
                        )}
                        <li>
                            <Link to='/admin/profile' className='block px-4 py-2 hover:bg-gray-100'>
                                Profile
                            </Link>
                        </li>

                        <li>
                            <Link to='/admin/logout' onClick={logoutHandler} className='block px-4 py-2 hover:bg-gray-100'>
                                Logout
                            </Link>
                        </li>

                    </ul>
                )}
            </div>
            {!userInfo && (
                <ul>
                    <li>
                        <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>{" "}
                        </Link>
                    </li>

                    <li>
                        <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>{" "}
                        </Link>
                    </li>
                </ul>
            )}
        </div >
    )
}

export default Navigation