import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";

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
    {
        id: 4,
        path: '/detail/:id',
        page: <DetailPage />
    },
    {
        id: 5,
        path: '/search',
        page: <SearchPage />
    },
]