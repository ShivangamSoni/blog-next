import { useEffect, useState } from "react";

import Image from "next/image";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import axios from "axios";

import styles from "./styles.module.css";

import UserProfileImage from "../Assets/user.png";

const Dashboard = () => {
  const { status } = useSession();
  const { replace } = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/api/user");
        setUser(data.data);
      } catch (e) {}
    };

    fetchUserData();
  }, []);

  if (status === "unauthenticated") {
    replace("/signin");
  }

  if (!user || status === "loading") {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHead}>
        <div className={styles.profileImage}>
          <Image
            src={UserProfileImage}
            alt={user.name}
            width={160}
            height={160}
          />
        </div>
      </div>

      <div className={styles.userDetails}>
        <p className={styles.name}>
          {user.name} <span className={styles.userName}>({user.username})</span>
        </p>
        <p className={styles.email}>{user.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
