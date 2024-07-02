import { Outlet, useNavigate } from 'react-router-dom';
import { Cta } from '../common/cta';
import { Heading } from '../common/heading';
import { Hero } from '../common/hero';
import { Wrapper } from '../common/wrapper';
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
