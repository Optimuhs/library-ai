import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { BookSearch } from "./BookSearch";
export const Content = () => {
  const router = useRouter();

  async function signInRedirect() {
    router.push("/signin");
  }

  return (
    <div>
      <Image
        src="/blanton_school_image2.jpg"
        alt="an image of annie webb blanton elementary school"
        width={800}
        height={533}
        layout="responsive" // Makes the image responsive
        objectFit="fit" // Defines how the image is fitted within its container
      />

      <div className={clsx("flex", "flex-col", "p-10", "text-royal-blue")}>
        <section>
          <BookSearch />
        </section>
      </div>
    </div>
  );
};
