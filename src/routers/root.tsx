import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/login";
import ErrorPage from "../pages/error-page";
import UsersList from "../pages/users";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
}, {
    path: "/login",
    element: <LoginPage />,
}, {
    path: "/users",
    element: <UsersList />,
}])