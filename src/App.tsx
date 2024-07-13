import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'
import EditHotel from './pages/EditHotel'
import Search from './pages/Search'
import MyBookings from './pages/MyBooking'
import Home from './pages/Home'
import Profile from './components/Profile'
import Coupons from './pages/Coupons'
import Spring from './dropdown/Spring'
import Summer from './dropdown/Summer'
import Autumn_Fall from './dropdown/Autumn_Fall'
import Winter from './dropdown/Winter'
import Room from './pages/Room'
import Hotel from './pages/Hotel'
import Detail from './pages/DetailRoom'
import Payments from './pages/Payments'

const App = () => {
    const { isLoggedIn } = useAppContext()
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <Search />
                        </Layout>
                    }
                />
                <Route
                    path="/hotel"
                    element={
                        <Layout>
                            <Hotel />
                        </Layout>
                    }
                />
                <Route
                    path="/detail/:roomId"
                    element={
                        <Layout>
                            <Detail />
                        </Layout>
                    }
                />
                <Route 
                    path="/register" 
                    element={
                        <Register />
                    }
                 />
                <Route 
                    path="/sign-in" 
                    element={
                        <SignIn />
                    }
                />
                <Route
                    path="/spring"
                    element={
                        <Layout>
                            <Spring />
                        </Layout>
                    }
                />
                <Route
                    path="/summer"
                    element={
                        <Layout>
                            <Summer />
                        </Layout>
                    }
                />
                <Route
                    path="/autumn-fall"
                    element={
                        <Layout>
                            <Autumn_Fall />
                        </Layout>
                    }
                />
                <Route
                    path="/winter"
                    element={
                        <Layout>
                            <Winter />
                        </Layout>
                    }
                />
                <Route
                    path="/coupon"
                    element={
                        <Layout>
                            <Coupons />
                        </Layout>
                    }
                />
                <Route
                    path="/:bookingId/payments"
                    element={
                        <Layout>
                            <Payments />
                        </Layout>
                    }
                />
                <Route
                    path="/room/:hotelId"
                    element={
                        <Layout>
                            <Room />
                        </Layout>
                    }
                />
                {isLoggedIn && (
                    <>
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/add-hotel"
                            element={
                                <Layout>
                                    <AddHotel />
                                </Layout>
                            }
                        />
                        <Route
                            path="/my-bookings/:userId"
                            element={
                                <Layout>
                                    <MyBookings />
                                </Layout>
                            }
                        />
                        <Route
                            path="/edit-hotel/:hotelId"
                            element={
                                <Layout>
                                    <EditHotel />
                                </Layout>
                            }
                        />
                    </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
export default App
