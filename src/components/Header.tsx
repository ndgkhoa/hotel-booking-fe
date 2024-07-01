import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';
import Logo from '../assets/logo.jpg';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../api/user'; 

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useAppContext();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
        } catch (error) {
            console.error('Error fetching user information:', error);
            setIsLoggedIn(false); 
        }
    };

    return (
        <div className="bg-white py-3 border-b-2 border-black shadow-lg ">
            <div className="container mx-auto flex justify-between items-center"> 
                <Link to="/">
                    <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
                </Link>
                <div className="flex-grow flex space-x-4 justify-center"> 
                <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/">Home</Link>
                    </span>
                    <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/search">Hotel</Link>
                    </span>
                    <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/promotion">Festival promotions</Link>
                    </span>
                    <span className="text-xl text-black font-medium tracking-tight hover:text-blue-800">
                        <Link to="/coupon">Coupons and offers</Link>
                    </span>
                </div>
                <span className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link
                                className="flex items-center text-black px-3 font-medium hover:text-blue-800"
                                to="/my-bookings"
                            >
                                My Bookings
                            </Link>
                            <Link
                                className="flex items-center text-black px-3 font-medium hover:text-blue-800"
                                to="/my-hotels"
                            >
                                My Hotels
                            </Link>
                            <Link to="/profile" className="text-sm text-black font-medium mt-3 cursor-pointer hover:underline">
                                Hello, {firstName} {lastName}
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <>
                            <Link
                                to="/sign-in"
                                className="flex bg-white items-center text-gray-600 px-3 py-2 font-bold hover:bg-gray-300 rounded-lg border-2 border-black"
                            >
                                Sign in
                            </Link>
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
