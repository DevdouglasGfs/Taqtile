import { useState } from 'react';
import './login-form.css';

export interface UserDTO {
  name?: string;
  email: string;
  password: string;
  validated?: boolean;
}
export type UserBasicPersonalData = Pick<UserDTO, 'email' | 'password'>;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userData = { email, password } as UserBasicPersonalData;

  return (
    <>
      <form action='/' className='login-form'>
        <h1 className='login-form__title'>Bem-vindo(a) d Taqtile!</h1>
        <div className='login-form__user-input'>
          <fieldset>
            {/* Should be Refactored */}
            <label className='input-group'>
              Email
              <input value={email} onChange={(ev) => setEmail(ev.target.value)} type='text' className='input-group__input' />
              <div className='input-group__content-side'></div>
              <p className='input-group__informative-message'></p>
            </label>
            <label className='input-group'>
              Senha
              <input value={password} onChange={(ev) => setPassword(ev.target.value)} type='text' className='input-group__input' />
              <div className='input-group__content-side'></div>
              <p className='input-group__informative-message'></p>
            </label>
          </fieldset>
        </div>

        <button type='submit' className='login-form__submit'>
           Entrar
        </button>
      </form>
    </>
  );
}
