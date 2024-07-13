import Logo from '../assets/logo.jpg'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-white py-5 border-t-2 border-t-gray-400 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
                </Link>
                <span className="text-black font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer hover:text-blue-600">Privacy Policy</p>
                    <p className="cursor-pointer hover:text-blue-600">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}
export default Footer
