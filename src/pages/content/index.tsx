import clsx from "clsx";
import { SignOutButton } from "components/Content/SignoutButton";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "../../app/globals.css";
import { Header } from "../../components/Header";
import { authOptions } from "../api/auth/[...nextauth]";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
};

export default function Content() {
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    async function getData() {
      try {
        // const data: User[] = await getAllUsers();
        const data: User = await getSpecificUser();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  return (
    <div className={clsx("flex", "flex-col")}>
      <Header />
      <div
        className={clsx("flex", "flex-row", "items-center", "justify-center")}
      >
        <SignOutButton />
      </div>
      <div>
        <div
          key={userData?.id}
        >{`${userData?.firstName} ${userData?.idNumber} `}</div>
      </div>
    </div>
  );
}

async function getAllUsers() {
  const session = await getSession();
  console.log(session);
  try {
    if (session) {
      const res = await fetch(`/api/getAllUsers`);
      if (!res.ok) {
        console.log(res);
      }
      return res.json();
    }
  } catch (err) {
    return err;
  }
}

async function getSpecificUser() {
  const session = await getSession();

  try {
    if (session) {
      const res = await fetch(
        `/api/getSpecificUser?email=${session?.user?.email}`
      );
      if (!res.ok) {
        console.log(res);
      }
      return res.json();
    }
  } catch (err) {
    return err;
  }
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  try {
    if (!session) {
      return {
        redirect: { destination: "/" },
      };
    }
    return {
      props: {
        session: session,
      },
    };
  } catch (err) {
    return err;
  }
}
