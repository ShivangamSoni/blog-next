import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import styles from "../styles.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const emailChange = (e) => setEmail(e.target.value);

  const passwordChange = (e) => setPassword(e.target.value);

  const validateEmail = useCallback(() => {
    if (!email.trim()) return;

    let emailErrorMsg = "";
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      emailErrorMsg = "Enter a Valid Email";
    }
    setEmailError(emailErrorMsg);

    return emailErrorMsg === "";
  }, [email]);

  const validatePassword = useCallback(() => {
    if (!password.trim()) return;

    let passwordErrorMsg = "";
    if (password.length < 8 || password.length > 16) {
      passwordErrorMsg = "Password should be between 8 to 16 Characters";
    }
    setPasswordError(passwordErrorMsg);

    return passwordErrorMsg === "";
  }, [password]);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setFormError("Email & Password are Necessary");
      return false;
    }

    if (!validateEmail() || !validatePassword()) {
      setFormError("Valid Email & Password are Necessary");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // TODO: Call Login API
  };

  useEffect(() => {
    validateEmail();
  }, [email, validateEmail]);

  useEffect(() => {
    validatePassword();
  }, [password, validatePassword]);

  return (
    <form className={styles.form} onSubmit={handleLogin} noValidate={true}>
      <h2 className={styles.title}>Welcome Back.</h2>

      {formError ? <span className={styles.error}>{formError}</span> : null}

      <div className={styles.formGroup}>
        <input
          type="email"
          onChange={emailChange}
          value={email}
          placeholder="Registered Email"
          required
          autoComplete="off"
        />
        {emailError ? <span className={styles.error}>{emailError}</span> : null}
      </div>

      <div className={styles.formGroup}>
        <input
          type="password"
          onChange={passwordChange}
          value={password}
          placeholder="Password"
          required
          autoComplete="off"
        />
        {passwordError ? (
          <span className={styles.error}>{passwordError}</span>
        ) : null}
      </div>

      <button type="submit">Sign In</button>

      <span>
        No Account?{" "}
        <Link href="/register">
          <a className={styles.link}>Create One</a>
        </Link>
        .
      </span>
    </form>
  );
};

export default SignIn;
