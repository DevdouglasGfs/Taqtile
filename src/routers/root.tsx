import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login";
import ErrorPage from "../pages/error-page";
import UsersList from "../pages/users";
import { getLoginToken } from "../utils/auth";

export const router = createBrowserRouter([{
    path: "/",
    element: (getLoginToken() && <UsersList />) || <LoginPage />,
    errorElement: <ErrorPage />
}, {
    path: "/login",
    element: <LoginPage />,
}, {
    path: "/users",
    element: <UsersList />,
}])