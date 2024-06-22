import { useState } from 'react';
import './login-form.css';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutations/loginMutations';
import { checkLoginStatus, storeLoginToken } from '../../utils/auth';
import { UserDto } from '../../types/user';
import { Navigate } from 'react-router-dom';

export type UserBasicLoginData = Required<Pick<UserDto, 'email'> & { password: string }>;

export default function LoginForm() {
  if(checkLoginStatus()) Navigate({to: '/users'})

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const userData = { email, password } as UserBasicLoginData;

  onkeydown = (ev) => {
    if (ev.key === 'Enter') validateInput();
  };

  const validateInput = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;

    // Make the user input validation removing any spaces in the start and end of the input.
    if (emailRegex.test(email.trim())) setValidEmail(true);
    else setValidEmail(false);
    if (passwordRegex.test(password.trim()) && password.trim().length >= 7) setValidPassword(true);
    else setValidPassword(false);

    !validEmail || !validPassword ? setShowValidationMessage(true) : setShowValidationMessage(false);
    return validEmail && validPassword ? true : false
  };

  const [mutateLogin, { error, loading }] = useMutation(LOGIN_MUTATION)

  async function login(_?: void) {
    /**
     * Try to login with the user data and clear the local storage
     * if the user has a token because the user with a valid token
     * will be redirected to another page without the need to login again.
     */
    try {
      validateInput() && mutateLogin({
        variables: {
          data: userData
        }
      }).then(data => {
        storeLoginToken(data.data.login.token) 
        return data.data
      }).catch(error => console.log(error))

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form className='login-form'>
        <h1 className='login-form__title'>Bem-vindo(a) à Taqtile!</h1>
        <div className='login-form__user-input'>
          <fieldset>
            {/* Can be Refactored */}
            <label htmlFor='email' className='input-group'>
              Email
              <input
                id='email'
                name='email'
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
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
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                type='password'
                autoComplete='current-password'
                className='input-group__input'
              />
              {showValidationMessage && password.trim().length < 7 && (
                <p className='input-group__informative-message'>A senha deve ter ao menos 7 caractéres.</p>
              )}
              {showValidationMessage && !validPassword && (
                <p className='input-group__informative-message'>A senha deve ser composta por caractéres alfánumericos.</p>
              )}
            </label>
          </fieldset>
          {error && !loading && <p className='info-block_error'>{error.message}</p>}
        </div>

        <button disabled={loading} aria-disabled={loading} type='submit' onClick={(event) => login(event.preventDefault())} className='login-form__submit'>
          Entrar {loading && <div className="loading-spinner"></div>}
        </button>
      </form>
    </>
  );
}
