import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import styles from "./styles.module.css";
import { useDispatch } from "../Context/state";
import { showNotification } from "../Context/Notification/actions";

const ContactUs = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const emailChange = (e) => setEmail(e.target.value);

  const nameChange = (e) => setName(e.target.value);

  const messageChange = (e) => setMessage(e.target.value);

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

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError("All Fields are Necessary");
      return false;
    }

    if (!validateName() || !validateEmail()) {
      setFormError("All Fields Should Contain Valid Data");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const contactDetails = { name, email, message };

    try {
      dispatch(
        showNotification({
          title: "Sending Message....",
          message: "Your Message is on its way.",
          status: "pending",
        }),
      );

      const { data } = await axios.post("/api/contact", contactDetails);

      if (data.success) {
        dispatch(
          showNotification({
            title: "Success",
            message: data.message,
            status: "success",
          }),
        );

        setEmail("");
        setName("");
        setMessage("");
      } else {
        dispatch(
          showNotification({
            title: "Error!",
            message: data.message,
            status: "error",
          }),
        );
      }
    } catch (e) {
      dispatch(
        showNotification({
          title: "Error!",
          message: e.response.data.message,
          status: "error",
        }),
      );
    }
  };

  useEffect(() => {
    validateName();
  }, [name, validateName]);

  useEffect(() => {
    validateEmail();
  }, [email, validateEmail]);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={true}>
      <h2 className={styles.title}>
        Ask a Query / Leave a Review or Suggestion
      </h2>

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
          type="text"
          onChange={nameChange}
          value={name}
          placeholder="Name"
          required
          autoComplete="off"
        />
        {nameError ? <span className={styles.error}>{nameError}</span> : null}
      </div>

      <div className={styles.formGroup}>
        <textarea
          value={message}
          onChange={messageChange}
          placeholder="Message"
          required
          autoComplete="off"
        />
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactUs;
