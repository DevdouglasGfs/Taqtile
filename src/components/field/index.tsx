import { ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/validators';

export const Field: React.FC<{
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  update: (ev: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}> = ({ type, update, value }) => {
  const [validInput, setValidInput] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);


  const validateInput = useCallback((): boolean => {
    if (type === 'email' && validateEmail(value)) setValidInput(true);
    else if (type === 'password' && validatePassword(value) && value.length >= 7) setValidInput(true);
    else setValidInput(false);

    !validInput ? setShowValidationMessage(true) : setShowValidationMessage(false);
    return validInput;
  }, [type, value, validInput]);

  useEffect(() => {
    validateInput();
  }, [value, validateInput]);

  return (
    <label htmlFor='email' className='input-group'>
      {type === 'email' ? 'Email' : 'Senha'}
      <input
        type={type}
        id={type === 'email' ? 'email' : 'password'}
        name={type === 'email' ? 'email' : 'password'}
        autoComplete={type === 'email' ? 'email' : 'current-password'}
        required
        value={value}
        onChange={update}
        className='input-group__input'
      />
      {type === 'email' && showValidationMessage && !validInput && (
        <p className='input-group__informative-message'>Digite um email válido.</p>
      )}
      {type === 'password' && showValidationMessage && value.length < 7 && (
        <p className='input-group__informative-message'>A senha deve ter ao menos 7 caracteres.</p>
      )}
      {type === 'password' && showValidationMessage && !validInput && (
        <p className='input-group__informative-message'>A senha deve ser composta por caracteres alfánumericos.</p>
      )}
    </label>
  );
};
