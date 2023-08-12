import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

type User = { id: number; firstName: string; lastName: string };

export default function Content() {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const data: User[] = await getAllUsers();

        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

async function getAllUsers() {
  const res = await fetch(`/api/getAllUsers`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}
