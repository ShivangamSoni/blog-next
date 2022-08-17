import { createPortal } from "react-dom";

import { AiOutlineCloseCircle } from "react-icons/ai";

import styles from "./styles.module.css";

import { useDispatch, useSelector } from "../../Context/state";
import { clearNotification } from "../../Context/Notification/actions";

const Notification = () => {
  const { active, data } = useSelector((state) => state.notification || {});
  const dispatch = useDispatch();

  const close = () => dispatch(clearNotification());

  if (active) {
    const { title, message, status } = data;
    let statusClass = "";

    if (status === "success") statusClass = styles.success;
    if (status === "error") statusClass = styles.error;

    return createPortal(
      <div className={`${styles.container} ${statusClass}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.msg}>{message}</div>

        <span className={styles.closeBtn} onClick={close}>
          <AiOutlineCloseCircle />
        </span>
      </div>,
      document.querySelector("#notification"),
    );
  }

  return null;
};

export default Notification;
