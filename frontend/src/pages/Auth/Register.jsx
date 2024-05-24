import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../components/Loader.jsx"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({username, email, password }).unwrap()
                dispatch(setCredentials(res))
                navigate(redirect)
                toast.success('Registered Successfully')
            } catch (error) {
                console.log(error);
                toast.error(error.data.message)

            }
        }
    }

    return (
        <section className="bg-black pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                        <input type="text" name="name" className="mt-1 p-2 block w-full rounded border-gray-300" placeholder="Enter Name" value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input type="email" name="email" className="mt-1 p-2 block w-full rounded border-gray-300" placeholder="Enter Email" value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input type="password" name="password" className="mt-1 p-2 block w-full rounded border-gray-300" placeholder="Enter Password" value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Conifrm Password</label>
                        <input type="password" name="confirmPassword" className="mt-1 p-2 block w-full rounded border-gray-300" placeholder="Confirm Password" value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button disabled={isLoading}
                        type='submit'
                        className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                    {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                    <p className="text-white">
                        Already have an account?
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/logout'} className="text-pink-500 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
            <img 
                src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="img"
                className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg "
            />
        </section >
    )
}

export default Register