import styled, { ThemeProvider } from 'styled-components';
import LoginForm from '../../components/login-form';
import theme from '../../themes/default';

const Container = styled.main`
  width: 100%;
`;

export default function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LoginForm />
      </Container>
    </ThemeProvider>
  );
}
