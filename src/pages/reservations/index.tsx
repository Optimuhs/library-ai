import { clsx } from "clsx";
import { Header } from "components/Layout/Header";
import { ConfirmedReservations } from "components/Workflow/Reservations/ConfirmedReservationComp";
import { ReservationComp } from "components/Workflow/Reservations/ReservationComp";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import "../../app/globals.css";

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
    <div className={clsx("text-royal-blue")}>
      <Header userData={userData} />
      <div className={clsx("m-10")}>
        <h2 className={clsx("text-2xl", "font-semibold")}>
          Showing active reservations for {userData?.firstName}{" "}
          {userData?.lastName}
        </h2>
      </div>

      <div className={clsx("text-royal-blue")}>
        <div>
          <ConfirmedReservations props={userData} />
        </div>

        <ReservationComp props={userData} />
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
    // securityHeaders(req, res);
    return {
      props: {
        session: session,
      },
    };
  } catch (err) {
    return err;
  }
}
