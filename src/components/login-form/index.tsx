import { useState } from 'react';
import './login-form.css';

export interface UserDTO {
  name?: string;
  email?: string;
  password?: string;
  validated?: boolean;
}
export type UserBasicPersonalData = Required<Pick<UserDTO, 'email' | 'password'>>;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const userData = { email, password } as UserBasicPersonalData;

  onkeydown = (ev) => {
    if (ev.key === 'Enter') validateInput();
  };

  const validateInput = (_?: void) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^[a-zA-Z0-9]+$/;

    if (emailRegex.test(email.trim())) setValidEmail(true);
    else setValidEmail(false);
    if (passwordRegex.test(password.trim()) && password.trim().length >= 7) setValidPassword(true);
    else setValidPassword(false);

    !validEmail || !validPassword ? setShowValidationMessage(true) : setShowValidationMessage(false);
  };

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
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
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

        <button type='submit' onClick={(event) => validateInput(event.preventDefault())} className='login-form__submit'>
          Entrar
        </button>
      </form>
    </>
  );
}
