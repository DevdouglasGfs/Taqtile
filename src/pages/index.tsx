import { Outlet, Route, Routes } from 'react-router-dom';
import UserManagement from './users/management';
import UsersList from './users/list';
import SpecificUserPage from './users/user';
import { ThemeProvider } from 'styled-components';
import { Heading } from '../components/common/Heading';
import { Wrapper } from '../components/common/Wrapper';
import { Menu } from '../components/common/Menu';
import { Link } from '../components/common/Link';
import theme from '../themes/default';
import { Header } from '../components/header';
import { getLoginToken } from '../utils/auth';
import LoginPage from './login';

const NavigationLinks = () => {
  return (
    <>
      <Wrapper $maxWidth='max(600px, 100%)'>
        <Menu $gap='2rem'>
          <Heading as={'h2'}>Atalhos rápidos</Heading>
          <Wrapper $wrap='wrap' $gap='12px'>
            <Link $fill $appearAsButton to={'/users'}>
              Lista de Usuários
            </Link>
            <Link $fill $appearAsButton to={'/users/management'}>
              Gestão dos usuários
            </Link>
          </Wrapper>
        </Menu>
      </Wrapper>
    </>
  );
};

export default function Router() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          {!getLoginToken() ? <Route index element={<LoginPage />} /> : null}
          {getLoginToken() && (
            <Route path='/' element={<Header />}>
              <Route path='' element={<NavigationLinks />} />
              <Route path='users' element={<Outlet />}>
                <Route path='' element={<UsersList />} />
                <Route path='user/:id' element={<SpecificUserPage />} />
                <Route path='management' element={<UserManagement />} />
              </Route>
            </Route>
          )}
        </Routes>
      </ThemeProvider>
    </>
  );
}
