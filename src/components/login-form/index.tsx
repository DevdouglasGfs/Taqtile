import { useState } from 'react';
import './login-form.css';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { getLoginToken, storeLoginToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Field as LoginField } from '../field';
import { Heading } from '../common/Heading';
import { Wrapper } from '../common/Wrapper';
import { Label } from '../common/Label';
import { StatusBlock } from '../common/StatusBlock';
import { Cta } from '../common/Cta';
import { Spinner } from '../common/Spinner';
import { Form } from '../common/Form';
import { Input } from '../common/Input';

export default function LoginForm() {
  const navigate = useNavigate();
  if (getLoginToken()) navigate('/users', { replace: true });

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const [userData, setUserData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const { email, password } = userData;

  onkeydown = (ev) => {
    if (ev.key === 'Enter') {
      login();
    }
  };

  const [mutateLogin, { error, loading }] = useMutation(LOGIN_MUTATION);

  function handleInput({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
  }

  async function login() {
    if ((email && password).length < 1) return;
    mutateLogin({
      variables: { data: userData },
      onCompleted: ({ login: { token } }) => {
        storeLoginToken(token);
        navigate('/users/list', { replace: true });
      },
      onError: (error) => console.error(error),
    });

  return (
    <>
      <Form>
        <Heading $size='1.5rem'>Bem-vindo(a) à Taqtile!</Heading>
        <Wrapper $dir='column' $gap='2rem'>
          <fieldset>
            <Label htmlFor='email'>
              Email
              <Input
                id='email'
                $invalid={showValidationMessage && !validEmail}
                aria-invalid={showValidationMessage && !validEmail}
                aria-required
                name='email'
                required
                value={userData.email}
                onChange={handleInput}
                type='email'
                placeholder='Digite seu email'
                autoComplete='email'
              />
              {showValidationMessage && !validEmail && <p>Digite um email válido.</p>}
            </Label>
            <Label htmlFor='password'>
              Senha
              <Input
                id='password'
                $invalid={showValidationMessage && !validatePassword(userData.password)}
                aria-invalid={showValidationMessage && !validatePassword(userData.password)}
                aria-required
                name='password'
                required
                value={userData.password}
                onChange={handleInput}
                type='password'
                autoComplete='current-password'
              />
              {showValidationMessage && userData.password.trim().length < 7 && (
                <p>A senha deve ter ao menos 7 caractéres.</p>
              )}
              {!validatePassword(userData.password) && userData.password.trim() !== '' && <p>A senha deve ser composta por caractéres alfánumericos.</p>}
            </Label>
            <LoginField type='email' update={handleInput} value={email} />
            <LoginField type='password' update={handleInput} value={password} />          
          </fieldset>
          {error && !loading && <StatusBlock $status='error'><p>{error.message}</p></StatusBlock>}
        </Wrapper>

        <Cta $primary disabled={loading} aria-disabled={loading} type='submit' onClick={(ev) => { ev.preventDefault(); login() }}>
          Entrar {loading && <Spinner />}
        </Cta>
      </Form>
    </>
  );
}
