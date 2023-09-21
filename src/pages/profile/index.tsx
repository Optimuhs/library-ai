import clsx from "clsx";
import { HistoryDisplay } from "components/Profile/HistoryDisplay";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../../app/globals.css";
import { Header } from "../../components/Layout/Header";
import securityHeaders from "../../middleware/securityHeaders";
import { authOptions } from "../api/auth/[...nextauth]";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    async function getData() {
      try {
        const data = await getSpecificUser();
        setUserData(data);
      } catch (err) {
        router.push(`/${err.status}`);
      }
    }
    getData();
  }, [router]);

  return (
    <div className={clsx("flex", "flex-col")}>
      <Header userData={userData} />
      <HistoryDisplay />
    </div>
  );
}

async function getSpecificUser() {
  const session = await getSession();

  try {
    if (session) {
      const res = await fetch(
        `/api/getSpecificUser?email=${session?.user?.email}`
      );
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      return res.json();
    }
  } catch (err) {
    throw err;
  }
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  try {
    if (!session) {
      return {
        redirect: { destination: "/signin" },
      };
    }

    securityHeaders(req, res);

    return {
      props: {
        session: session,
      },
    };
  } catch (err) {
    return err;
  }
}
