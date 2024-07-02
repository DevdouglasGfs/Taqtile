import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login";
import ErrorPage from "../pages/error-page";
import UsersList from "../pages/users";

export const router = createBrowserRouter([{
    path: "/",
    element: <p>Nothing here until now. Access the /login page to login or /users to see the list of users</p>,
    errorElement: <ErrorPage />
}, {
    path: "/login",
    element: <LoginPage />,
}, {
    path: "/users",
    element: <UsersList />,
}])