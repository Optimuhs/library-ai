import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useState } from "react";
import { SignOutUser, userStateListener } from "../../src/firebase/firebase";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  // "User" type from firebase
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const router = useRouter();
  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  // As soon as setting the current user to null,
  // the user will be redirected to the home page.
  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
    router.push("/");
  };

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
