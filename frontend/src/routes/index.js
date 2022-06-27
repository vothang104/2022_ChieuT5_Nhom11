import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const publicRoutes = [
    {
        id: 1,
        path: '/',
        page: <HomePage />
    },
    {
        id: 2,
        path: '/register',
        page: <RegisterPage />
    },
    {
        id: 3,
        path: '/login',
        page: <LoginPage />
    },
]