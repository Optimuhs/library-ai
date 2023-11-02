import Link from "next/link";

export default function Custom500() {
  return (
    <div>
      <h1>An error has occured, try again</h1>
      <div>
        <Link href="/">Return to home</Link>
      </div>
    </div>
  );
}
