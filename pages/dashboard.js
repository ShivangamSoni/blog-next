import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]";

import Dashboard from "../src/Dashboard/Dashboard";

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: true,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
};
