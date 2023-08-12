import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";

function AuthRequired({ children }: { children: JSX.Element }) {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  if (!currentUser) {
    router.push("/");
  }
  return children;
}
export default AuthRequired;
