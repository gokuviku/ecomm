import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import store from './redux/store.js'
import Cart from './pages/Cart.jsx'

//private route
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'

//auth
import Home from './Home.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import UserList from './pages/Admin/UserList.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Profile from './pages/Users/Profile.jsx'

//router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favourites" element={<Favorites/>} />
      <Route path="/favourites/:id" element={<ProductDetails />} />



      {/* Protected Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path='categorylist' element={<CategoryList/>} />
        <Route path='productlist' element={<ProductList />} />
        <Route path='allproductslist' element={<AllProducts />} />
        <Route path='product/update/:id' element={<ProductUpdate />} />



      </Route>
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
