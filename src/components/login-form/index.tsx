import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { storeLoginToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Field as LoginField } from '../field';
import { Heading } from '../common/Heading';
import { Wrapper } from '../common/Wrapper';
import { StatusBlock } from '../common/StatusBlock';
import { Cta } from '../common/Cta';
import { Spinner } from '../common/Spinner';
import { Form } from '../common/Form';
import { validateEmail, validatePassword } from '../../utils/validators';
import { useAuthentication } from '../../hooks/useAuth';


export default function LoginForm() {
  const navigate = useNavigate()
  if (useAuthentication().authenticated) navigate('/users', { replace: true })

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
    if(!validateEmail(email) && !validatePassword(password) && !(password.length >= 7)) return;
    mutateLogin({
      variables: { data: userData },
      onCompleted: ({ login: { token } }) => {
        storeLoginToken(token);
        navigate('/users', { replace: true });
      },
      onError: (error) => console.error(error),
    });
  }

  return (
    <>
      <Form>
        <Heading $size='1.5rem'>Bem-vindo(a) à Taqtile!</Heading>
        <Wrapper $dir='column' $gap='2rem'>
          <fieldset>
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
