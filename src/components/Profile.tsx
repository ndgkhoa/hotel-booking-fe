import { useEffect, useState } from 'react';
import { fetchCurrentUser, fetchAccountUser, } from '../api/user';
import { UserType, AccountType } from '../shared/types'; 
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [account, setAccount] = useState<AccountType | null>(null); 

    useEffect(() => {
        fetchUserInformation();
        fetchAccountData();
    }, []);

    const fetchUserInformation = async () => {
        try {
            const userData = await fetchCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    const fetchAccountData = async () => {
        try {
            const accountData = await fetchAccountUser();
            setAccount(accountData);
        } catch (error) {
            console.error('Error fetching account information:', error);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    if (!user || !account) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <Header />
            <div className="min-h-screen">
                <div className="container mx-auto">
                    <button onClick={() => navigate(-1)} className="bg-blue-600 mt-10 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded">Back</button>
                    <div className="bg-white p-4 shadow-md shadow-gray-500 rounded-lg mt-5 border-t-gray-500 border-t-4">
                        <h1 className="text-3xl font-medium mb-4 text-center">User Profile</h1>
                        <div className="mb-4">
                            <p className="text-lg font-medium text-center bg-gray-600 text-white w-32 p-3 rounded-lg">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
                            <input type="text" name="username" defaultValue={account.username} readOnly className="bg-gray-300 border border-gray-300 rounded-md px-3 py-2 w-full cursor-default" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} defaultValue={account.password} name="password" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                                <button type="button" onClick={handleTogglePassword} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none">{showPassword ? 'Hide' : 'Show'}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                                <input type="text" name="firstName" value={user.firstName} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                                <input type="text" name="lastName" value={user.lastName} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input type="email" name="email" value={user.email} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                                <input type="text" name="phone" value={user.phone} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                            <input type="text" name="address" value={user.address} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Birthday:</label>
                            <input type="text" name="birthday" value={formatDate(user.birthday)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                        </div>
                        <div className="flex justify-center">
                            <button className="border p-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium">Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
