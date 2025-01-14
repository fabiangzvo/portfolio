import SocialNetwork from "@components/socialNetwork";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-[90vw] flex justify-between items-between pb-5 max-lg:w-[95%]">
      <div className="flex flex-col max-md:ml-6">
        <Link
          href="/"
          className="font-extrabold text-2xl max-md:text-4xl cursor-pointer"
        >
          Fabián Guzmán Otavo.
        </Link>
        <p className="max-md:text-2xl pointer-events-none">
          All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
      <div>
        <SocialNetwork />
      </div>
    </footer>
  );
}

export default Footer;
