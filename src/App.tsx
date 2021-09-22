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
      <h1>Tyler's Password Strength Checker</h1>
  )
}

const App: React.FunctionComponent = () => {
  // The password
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("Very Weak");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [strengthColor, setStrengthColor] = useState<string>("styles.strengthVeryWeak");

  // This function will be triggered when the password input field changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value.trim();
    setPassword(enteredValue);
  };

  useEffect(() => {
    if (password.length <= 4) {
      setPasswordStrength("Very Weak");
      setIsButtonDisabled(true);
      setStrengthColor("strengthVeryWeak")
    } else if (password.length <= 6) {
      setPasswordStrength("Weak");
      setIsButtonDisabled(true);
      setStrengthColor("strengthWeak")
    } else if (password.length <= 8) {
      setPasswordStrength("Medium");
      setStrengthColor("strengthMedium")
    } else if (password.length <= 12) {
      setPasswordStrength("Strong");
      setIsButtonDisabled(false);
      setStrengthColor("strengthStrong")
    } else {
      setPasswordStrength("Very Strong");
      setStrengthColor("strengthVeryStrong")
      
      setIsButtonDisabled(false);
    }
  }, [password]);


  // Button handler function
  const buttonHandler = () => {
    alert("You have entered a strong enough password");
    // Do other things here
  };

  return (
    <div style={styles.container}>
      <Top />
      <h3>Password Strength Checker</h3>

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
            
            ...styles.strengthWeak,
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
  strengthVeryWeak: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "red",
  },
  strengthWeak: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "orange",
  },
  strengthMedium: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "yellow",
  },
  strengthStrong: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "lime",
  },
  strengthVeryStrong: {
    height: "100%",
    maxWidth: "100%",
    backgroundColor: "green",
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