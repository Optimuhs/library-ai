import { useRouter } from "next/router";

export const Checkout = () => {
  const router = useRouter();

  async function signInRedirect() {
    router.push("/signin");
  }

  return (
    <div>
      <form>
        <input type="text"></input>
      </form>
    </div>
  );
};
