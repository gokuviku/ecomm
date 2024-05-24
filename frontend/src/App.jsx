import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navigation from "./pages/Auth/Navigation"
// import PrivateRoute from "./components/PrivateRoute"
// import AdminRoute from "./pages/Admin/AdminRoute"
// import UserList from "./pages/Admin/UserList"
// import Login from "./pages/Auth/Login"
// import Register from "./pages/Auth/Register"
// import Profile from "./pages/Users/Profile"


function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />
      {/* <Login />
      <Register />
      <PrivateRoute/>
      <Profile/>
      <AdminRoute/>
      <UserList/> */}
      <main className="py-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
