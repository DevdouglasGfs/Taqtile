import { Outlet, useNavigate } from 'react-router-dom';
import { Cta } from '../common/Cta';
import { Heading } from '../common/Heading';
import { Hero } from '../common/Hero';
import { Wrapper } from '../common/Wrapper';
import { logout } from '../../utils/auth';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Hero as='main'>
        <Wrapper $dir='column'>
          <Heading>
            <span>Dashboard</span>
            Taqtile
          </Heading>
          <Cta
            $fill='half'
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </Cta>
        </Wrapper>
      </Hero>
      <Outlet />
    </>
  );
};
