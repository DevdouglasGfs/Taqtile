import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/login';
import UserManagement from '../pages/users/management';
import UsersList from '../pages/users/list';
import ErrorPage from '../pages/error-page';
import SpecificUserPage from '../pages/users/user';
import Router from '../pages';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Router />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        element: <UsersList />,
        children: [
          {
            path: 'management',
            element: <UserManagement />,
          },
          {
            path: 'user/:id',
            element: <SpecificUserPage />,
          },
        ],
      },
    ],
  },
]);
