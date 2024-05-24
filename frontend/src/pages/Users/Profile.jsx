import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { userInfo } = useSelector(state => state.auth);
    const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

    const [updateProfile] = useProfileMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!username || !email) {
            toast.error('Please fill all inputs');
            return;
        } else if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoadingUpdateProfile(true);

        try {
            const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap();
            dispatch(setCredentials(res));
            toast.success("Profile Updated Successfully.");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }

        setLoadingUpdateProfile(false);
    };

    if (!userInfo) {
        return <Loader />;
    }

    return (
        <div className="bg-black container h-screen mx-auto p-4">
            <div className="flex justify-center align-center md:flex md:space-x-4">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            </div>
            <div className="md:w-1/3">
                <form onSubmit={submitHandler} className="px-auto">
                    <div className="mb-4">
                        <label className="block text-white mb-2">Name</label>
                        <input type="text" placeholder="Enter Name"
                            className="form-input p-4 rounded-sm w-full"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Email</label>
                        <input type="text" placeholder="Enter Email"
                            className="form-input p-4 rounded-sm w-full"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Password</label>
                        <input type="password" placeholder="Enter Password"
                            className="form-input p-4 rounded-sm w-full"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password"
                            className="form-input p-4 rounded-sm w-full"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600" disabled={loadingUpdateProfile}>
                            {loadingUpdateProfile ? 'Updating...' : 'Update'}
                        </button>
                        <Link to='/user-orders' className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700">
                            My Orders
                        </Link>
                    </div>
                </form>
            </div>
            {loadingUpdateProfile && <Loader />}
        </div>
    );
};

export default Profile;
