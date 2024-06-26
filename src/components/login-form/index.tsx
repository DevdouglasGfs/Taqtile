import { useState } from 'react';
import './login-form.css';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/login';
import { checkLoginStatus, storeLoginToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { UserBasicLoginData } from '../../types/user';
import { validateEmail, validatePassword } from '../../utils/validators';

export default function LoginForm() {
  const navigate = useNavigate()
  if (checkLoginStatus()) navigate('/users', { replace: true }) 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const [userData, setUserData] = useState<UserBasicLoginData>({
    email: '',
    password: ''
  });

  onkeydown = (ev) => {
    if (ev.key === 'Enter') login();
  };

  const validateInput = (): boolean => {

    // Make the user input validation removing any spaces in the start and end of the input.
    if (validateEmail(email)) setValidEmail(true);
    else setValidEmail(false);
    if (validatePassword(password) && password.trim().length >= 7) setValidPassword(true);
    else setValidPassword(false);

    !validEmail || !validPassword ? setShowValidationMessage(true) : setShowValidationMessage(false);
    return validEmail && validPassword
  };

  const [mutateLogin, { error, loading }] = useMutation(LOGIN_MUTATION)

  function handleInput({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value })
  }

  async function login() {
    validateInput() && mutateLogin({
      variables: { data: userData },
      onCompleted: () => navigate('/users/list', { replace: true }),
      onError: (error) => console.log(error)
    }).then(({ data: { login: { token } } }) => storeLoginToken(token))
  }

  return (
    <>
      <form className='login-form'>
        <h1 className='login-form__title'>Bem-vindo(a) à Taqtile!</h1>
        <div className='login-form__user-input'>
          <fieldset>
            <label htmlFor='email' className='input-group'>
              Email
              <input
                id='email'
                name='email'
                required
                value={userData.email}
                onChange={handleInput}
                type='email'
                className='input-group__input'
                autoComplete='email'
              />
              {showValidationMessage && !validEmail && <p className='input-group__informative-message'>Digite um email válido.</p>}
            </label>
            <label htmlFor='password' className='input-group'>
              Senha
              <input
                id='password'
                name='password'
                required
                value={userData.password}
                onChange={handleInput}
                type='password'
                autoComplete='current-password'
                className='input-group__input'
              />
              {showValidationMessage && password.trim().length < 7 && (
                <p className='input-group__informative-message'>A senha deve ter ao menos 7 caracteres.</p>
              )}
              {showValidationMessage && !validPassword && (
                <p className='input-group__informative-message'>A senha deve ser composta por caracteres alfánumericos.</p>
              )}
            </label>
          </fieldset>
        </div>

        <button disabled={loading} aria-disabled={loading} type='submit' onClick={(ev) => { ev.preventDefault(); login() }} className='login-form__submit'>
          Entrar {loading && <div className="loading-spinner"></div>}
        {loading && <p className='info-block__loading'>Carregando...</p>}
        {error && <p className='info-block__error'>{error.message}</p>}
        </button>
      </form>
    </>
  );
}