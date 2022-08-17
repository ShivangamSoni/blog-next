import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import styles from "../styles.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCPasswordError] = useState("");

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const nameChange = (e) => setName(e.target.value);
  const userNameChange = (e) => setUserName(e.target.value);
  const emailChange = (e) => setEmail(e.target.value);
  const passwordChange = (e) => setPassword(e.target.value);
  const cPasswordChange = (e) => setCPassword(e.target.value);

  const validateName = useCallback(() => {
    if (!name.trim()) return;

    let nameErrorMsg = "";
    const nameRegex = /^([a-zA-Z]{3,})+(\s([a-zA-Z\s]{1,})+)*$/;
    if (!nameRegex.test(name.trim())) {
      nameErrorMsg =
        "Name Can only Contain Alphabets.\nIt Should have at least 3 Characters.";
    }
    setNameError(nameErrorMsg);

    return nameErrorMsg === "";
  }, [name]);

  const validateUserName = useCallback(() => {
    if (!userName.trim()) return;

    let userNameErrorMsg = "";
    const userNameRegex = /^(?=.{8,20}$)(?![_])[a-z0-9_]+(?<![_])$/;
    if (!userNameRegex.test(userName.trim())) {
      userNameErrorMsg =
        "Username Can only Contain Lower Case AlphaNumerics and _\nIt Should be between 8 & 20 Character.\nIt can't start or End with _";
    }
    setUserNameError(userNameErrorMsg);

    return userNameErrorMsg === "";
  }, [userName]);

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

  const validateCPassword = useCallback(() => {
    if (!cPassword.trim()) return;

    let cPasswordErrorMsg = "";
    if (cPassword !== password) {
      cPasswordErrorMsg = "Password & Confirm Password Don't Match";
    }

    setCPasswordError(cPasswordErrorMsg);

    return cPasswordErrorMsg === "";
  }, [password, cPassword]);

  const validateForm = () => {
    if (
      !name.trim() ||
      !userName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !cPassword.trim()
    ) {
      setFormError("All Fields are Necessary");
      return false;
    }

    if (
      !validateName() ||
      !validateUserName() ||
      !validateEmail() ||
      !validatePassword() ||
      !validateCPassword()
    ) {
      setFormError("All Fields Should Contain Valid Data");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const valid = validateForm();
    if (!valid) return;

    const newUser = { name, email, username: userName, password };

    // TODO: Call Register API
  };

  useEffect(() => {
    validateName();
  }, [name, validateName]);

  useEffect(() => {
    validateUserName();
  }, [userName, validateUserName]);

  useEffect(() => {
    validateEmail();
  }, [email, validateEmail]);

  useEffect(() => {
    validatePassword();
  }, [password, validatePassword]);

  useEffect(() => {
    validateCPassword();
  }, [cPassword, validateCPassword]);

  return (
    <form className={styles.form} onSubmit={handleRegister} noValidate={true}>
      <h2 className={styles.title}>Join Now.</h2>
      {formError ? <span className={styles.error}>{formError}</span> : null}
      {formSuccess ? (
        <span className={styles.success}>{formSuccess}</span>
      ) : null}

      <div className={styles.formGroup}>
        <input
          type="text"
          value={name}
          onChange={nameChange}
          placeholder="Name"
        />
        {nameError ? <span className={styles.error}>{nameError}</span> : null}
      </div>

      <div className={styles.formGroup}>
        <input
          type="text"
          value={userName}
          onChange={userNameChange}
          placeholder="Unique Username"
        />
        {userNameError ? (
          <span className={styles.error}>{userNameError}</span>
        ) : null}
      </div>

      <div className={styles.formGroup}>
        <input
          type="email"
          value={email}
          onChange={emailChange}
          placeholder="Email"
        />
        {emailError ? <span className={styles.error}>{emailError}</span> : null}
      </div>

      <div className={styles.formGroup}>
        <input
          type="password"
          value={password}
          onChange={passwordChange}
          placeholder="Password"
        />
        {passwordError ? (
          <span className={styles.error}>{passwordError}</span>
        ) : null}
      </div>

      <div className={styles.formGroup}>
        <input
          type="password"
          value={cPassword}
          onChange={cPasswordChange}
          placeholder="Confirm Password"
        />
        {cPasswordError ? (
          <span className={styles.error}>{cPasswordError}</span>
        ) : null}
      </div>

      <button type="submit">Register</button>

      <span>
        Already have a Account?{" "}
        <Link href="/signin">
          <a className={styles.link}>SignIn</a>
        </Link>
        .
      </span>
    </form>
  );
};

export default Register;
