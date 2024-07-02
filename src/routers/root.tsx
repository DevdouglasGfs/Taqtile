import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login";
import { UserManagement } from "../pages/users/management";
import ErrorPage from "../pages/error-page";
import { SpecificUserPage } from "../pages/users/user";
import UsersList from "../pages/users/list";
import App from "../App";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{
        path: "/users",
        element: <UsersList />,
        errorElement: <ErrorPage />,
        children: [{
            path: "management",
            element: <UserManagement />,
        }, {
            path: "user/:id",
            element: <SpecificUserPage />,
        }]
    }]
}, {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
}])