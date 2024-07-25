import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { useAppContext } from './contexts/AppContext'
import EditHotel from './pages/EditHotel'
import Search from './pages/Search'
import MyBookings from './pages/MyBooking'
import Home from './pages/Home'
import Profile from './components/Profile'
import Room from './pages/DetailHotel'
import Hotel from './pages/Hotel'
import Detail from './pages/DetailRoom'
import Payments from './pages/Payments'
import Promotions from './dropdown/Promotions'
import Abouts from './pages/About'
import { Elements } from '@stripe/react-stripe-js'

const App = () => {
    const { isLoggedIn } = useAppContext()
    const { stripePromise } = useAppContext()
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
                <Route path="/register" element={<Register />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route
                    path="/promotions"
                    element={
                        <Layout>
                            <Promotions />
                        </Layout>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <Layout>
                            <Abouts />
                        </Layout>
                    }
                />
                <Route
                    path="/:bookingId/payments"
                    element={
                        <Elements stripe={stripePromise}>
                            <Layout>
                                <Payments />
                            </Layout>
                        </Elements>
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
