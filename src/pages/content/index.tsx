import { signOut } from "next-auth/react";

export default function Content() {
  return (
    <div>
      <h1>Welcome to the libaray</h1>
      <p>Here is some content</p>
      <button onClick={() => signOut}>SignOut</button>
    </div>
  );
}
