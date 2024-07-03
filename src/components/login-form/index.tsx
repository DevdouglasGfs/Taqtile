import { useState } from 'react';
import './login-form.css';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { getLoginToken, storeLoginToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Field as LoginField } from '../field';

export default function LoginForm() {
  const navigate = useNavigate();
  if (getLoginToken()) navigate('/users', { replace: true });

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

  const [mutateLogin, { error, loading }] = useMutation<{ login: { token: string } }>(LOGIN_MUTATION);

  function handleInput({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value.trim() });
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
  }

  return (
    <>
      <form className='login-form'>
        <h1 className='login-form__title'>Bem-vindo(a) à Taqtile!</h1>
        <div className='login-form__user-input'>
          <fieldset>
            <LoginField type='email' update={handleInput} value={email} />
            <LoginField type='password' update={handleInput} value={password} />
          </fieldset>
        </div>

        {loading && <p className='info-block__loading'>Carregando...</p>}
        {error && <p className='info-block__error'>{error.message}</p>}
        <button
          disabled={loading}
          aria-disabled={loading}
          type='submit'
          onClick={(ev) => {
            ev.preventDefault();
            login();
          }}
          className='login-form__submit'
        >
          Entrar {loading && <div className='loading-spinner'></div>}
        </button>
      </form>
    </>
  );
}
