import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import Logo from '../assets/logo.jpg';
import * as apiClient from '../api/auth';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../api/user';
import { FaAngleDown, FaBars, FaUserCircle } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useAppContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserInformation();
        }
    }, [isLoggedIn]);

    const fetchUserInformation = async () => {
        try {
            const userData = await fetchCurrentUser();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setUserId(userData._id);
        } catch (error) {
            console.error('Error fetching user information:', error);
            setIsLoggedIn(false);
        }
    };

    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            setIsLoggedIn(false);
            await queryClient.invalidateQueries('verifyToken');
            toast.success('Signed out!');
            navigate("/");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };

    return (
        <div className="bg-white py-3 border-b-2 border-black shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
                </Link>
                <button
                    className="block lg:hidden p-2 rounded-md text-gray-600 focus:outline-none focus:bg-gray-200"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FaBars className="w-6 h-6" />
                </button>
                <div
                    className={`${
                        menuOpen ? 'block' : 'hidden'
                    } lg:flex flex-col lg:flex-row lg:space-x-4 items-center lg:justify-center w-full lg:w-auto flex`}
                >
                    
                    <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/">Home</Link>
                    </span>
                    <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/hotel">Hotel</Link>
                    </span>
                    <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/promotions">Festival promotions</Link>
                    </span>
                    <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/about">About Us</Link>
                    </span>
                    <div className="relative mt-2 lg:mt-0">
                        {isLoggedIn ? (
                            <>
                                <button
                                    className="flex items-center text-black px-3 font-medium hover:text-blue-800"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <FaUserCircle className="w-8 h-8 mr-2" />
                                    <span>Hello, {firstName} {lastName}</span>
                                    <FaAngleDown className='ml-1'/>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48 z-10">
                                        <Link
                                            to={`/my-bookings/${userId}`}
                                            className="block px-4 py-2 text-black hover:bg-gray-200"
                                        >
                                            My Bookings
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-black hover:bg-gray-200"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleClick}
                                            className="block w-full px-4 py-2 text-black hover:bg-gray-200 text-left"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                to="/sign-in"
                                className="flex bg-white items-center text-gray-600 px-3 py-2 font-bold hover:bg-gray-300 rounded-lg border-2 border-black"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
