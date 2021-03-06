// App.tsx
import React, { useState, useEffect } from "react";
import './index.css';

// Declare password strength type
type PasswordStrength =
  | "Very Weak"
  | "Weak"
  | "Medium"
  | "Strong"
  | "Very Strong";

const Top: React.FunctionComponent = () => {
  return(
    <div>
      <h1>Tyler's Password Strength Checker</h1>
      <h2><a href ="https://github.com/strrules105/Password-Strength-Checker">Github Repository</a></h2>
    </div>
  )
}

const App: React.FunctionComponent = () => {
  // The password
  const re=/[^A-Z][^a-z][^0-9]/g //regex to search for symbols/numbers in password to increase complexity
  const [symbols, setSymbols] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("Very Weak");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // This function will be triggered when the password input field changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value.trim();
    //Counts occurrences of non letters and sets symbol count
    const count = (str: string) => {
      return ((str || '').match(re) || []).length
    }
    setSymbols(count(enteredValue));
    setPassword(enteredValue);
  };

  useEffect(() => {
    if (password.length >=0 && password.length <4 && symbols===0) {
      setPasswordStrength("Very Weak");
      setIsButtonDisabled(true);
      (styles.strengthMeter.backgroundColor as string) = "red";
    } 
    else if (password.length >= 4 && password.length < 6 && symbols<=1) {
      setPasswordStrength("Weak");
      setIsButtonDisabled(true);
      (styles.strengthMeter.backgroundColor as string) = "orange";
    } 
    else if (password.length >= 6 && password.length < 8 && symbols >=2) {
      setPasswordStrength("Medium");
      (styles.strengthMeter.backgroundColor as string) = "yellow";
    } 
    else if (password.length >= 8 && password.length < 12 && symbols >= 2) {
      setPasswordStrength("Strong");
      setIsButtonDisabled(false);
      (styles.strengthMeter.backgroundColor as string) = "lime";
    } 
    else if(password.length>=12 && symbols >=3) {
      setPasswordStrength("Very Strong");
      (styles.strengthMeter.backgroundColor as string) = "green";
      setIsButtonDisabled(false);
    }
  }, [password, symbols]);


  // Button handler function
  const buttonHandler = () => {
    alert("You have entered a strong enough password");
    // Do other things here
  };

  return (
    <div style={styles.container}>
      <Top />
      <h3>Please Input a String</h3>

      {/* The input field */}
      <input
        type="password"
        value={password}
        onChange={inputHandler}
        placeholder="Enter a password"
        style={styles.password}
      />

      {/* This bar indicates the strength of the entered password */}
      <div style={styles.statusBar}>
        <div
          style={{
            ...styles.strengthMeter,
            width: `${(password.length / 16) * 100}%`,
            
          }}
        ></div>
      </div>

      {/* Password strength message */}
      <div style={styles.message}>{passwordStrength}</div>

      {//This button is only clickable when the entered password is strong enough }
      <button
        style={
          isButtonDisabled
            ? { ...styles.button, ...styles.disabledButton }
            : styles.button
        }
        disabled={isButtonDisabled}
        onClick={buttonHandler}
      >
        CONTINUE
      </button>}
    </div>
  );
};

// Styling
const styles = {
  container: {
    width: "60%",
    padding: "30px 90px",
    margin: "50px auto",
    background: "tan",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  password: {
    width: 300,
    padding: "8px 10px",
    border: "1px solid #444",
    borderRadius: "10px",
    outline: "none",
  },
  statusBar: {
    width: 300,
    height: 10,
    marginTop: 20,
    background: "#fff",
    border: "1px solid #444",
    borderRadius: "5px",
  },
  strengthMeter: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "red",
  },
  message: {
    padding: "20px 0",
  },
  button: {
    padding: "15px 30px",
    cursor: "pointer",
    background: "purple",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "30px",
  },
  disabledButton: {
    cursor: "not-allowed",
    opacity: 0.3,
  },
} as const;

export default App;