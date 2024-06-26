import styled, { ThemeProvider } from 'styled-components';
import LoginForm from '../../components/login-form';
import { theme } from '../users';

const Container = styled.div`
  width: 100%;
`;

export default function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container as="main">
        <LoginForm />
      </Container>
    </ThemeProvider>
  );
}
