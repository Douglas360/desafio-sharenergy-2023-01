import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/auth';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/useAuth';
import { SignIn } from '../pages/SignIn';
import { User } from '../pages/User/User';
import { Customer } from '../pages/Customer/Customer';
import { Cat } from '../pages/Cat/Cat';
import { Dog } from '../pages/Dog/Dog';


export const AppRouter = () => {

    const Private = ({ children }) => {
        const { autenticado, loading } = useAuth()

        if (loading) {
            return (
                <div >
                    <Loader />

                </div>
            )
        }

        if (!autenticado) {
            return <Navigate to="/" />;
        }

        return children;
    };

    const Autenticado = ({ children }) => {
        const token = localStorage.getItem('token');
        if (token) {
            return <Navigate to="/user" />;
        }
        return children;
    };



    return (


        <Router>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <Autenticado>
                                <SignIn />
                            </Autenticado>

                        }
                    />
                    <Route
                        path="/user"

                        element={
                            <Private>
                                <User />
                            </Private>

                        }
                    />
                    <Route
                        path="/cat"

                        element={
                            <Private>
                                <Cat />
                            </Private>

                        }
                    />
                    <Route
                        path="/dog"

                        element={
                            <Private>
                                <Dog />
                            </Private>

                        }
                    />
                    <Route
                        path="/customer"

                        element={
                            <Private>
                                <Customer />
                            </Private>

                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>

    )
}