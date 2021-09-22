import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

type PasswordStrength =
  | "Very Weak"
  | "Weak"
  | "Medium"
  | "Strong"
  | "Very Strong";

const App: React.FunctionComponent = () => {
  // The password
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("Very Weak");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // This function will be triggered when the password input field changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value.trim();
    setPassword(enteredValue);
  };

  useEffect(() => {
    if (password.length <= 4) {
      setPasswordStrength("Very Weak");
      setIsButtonDisabled(true);
    } else if (password.length <= 6) {
      setPasswordStrength("Weak");
      setIsButtonDisabled(true);
    } else if (password.length <= 8) {
      setPasswordStrength("Medium");
    } else if (password.length <= 12) {
      setPasswordStrength("Strong");
      setIsButtonDisabled(false);
    } else {
      setPasswordStrength("Very Strong");
      setIsButtonDisabled(false);
    }
  }, [password]);

  // Button handler function
  const buttonHandler = () => {
    alert("You have entered a strong enough password");
    // Do other things here
  };

  return (
    <div className='container'>
      <h3>Tutorial from KindaCode.com</h3>

      {/* The input field */}
      <input
        type="password"
        value={password}
        onChange={inputHandler}
        placeholder="Enter a password"
       // style={styles.password}
      />

      {/* This bar indicated the strength of the entered password */}
      <div className='statusBar'>
        <div className='strength'>
          style={{
            width: `${(password.length / 16) * 100}%`,
          }}
        </div>
      </div>

      {/* Password strength message */}
      <div className='message'>{passwordStrength}</div> 

      {/* This button is only clickable when the entered password is strong enough */}
      <button {
          ...isButtonDisabled ? {'button': 'disabledButton' }
            : 'button'
        }
        disabled={isButtonDisabled}
        onClick={buttonHandler}
      >
        CONTINUE
      </button>
    </div>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
