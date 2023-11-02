import Link from "next/link";

export default function Custom400() {
  return (
    <div>
      <h1>User not found, try again</h1>
      <div>
        <Link href="/">Return to home</Link>
      </div>
    </div>
  );
}
