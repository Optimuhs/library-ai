import { Header } from "components/Header";
import { ReservationComp } from "components/Workflow/ReservationComp";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
};

export default function ReservationsPage() {
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
    <div>
      <Header />
      <div>
        <h3>Reserve your books here!</h3>
        <ReservationComp props={userData?.id} />
      </div>
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

    return {
      props: {
        session: session,
      },
    };
  } catch (err) {
    return err;
  }
}
