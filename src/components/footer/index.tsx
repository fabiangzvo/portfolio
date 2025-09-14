import SocialNetwork from "@components/socialNetwork";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-[90vw] flex justify-between items-between pb-5 max-lg:w-[95%] max-sm:flex-col max-sm:items-center">
      <div className="flex flex-col max-md:ml-6">
        <Link
          href="/"
          className="font-extrabold text-lg cursor-pointer"
        >
          Fabián Guzmán Otavo.
        </Link>
        <p className="text-base pointer-events-none">
          All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
      <div className="max-sm:order-first max-sm:mb-2">
        <SocialNetwork />
      </div>
    </footer>
  );
}

export default Footer;
