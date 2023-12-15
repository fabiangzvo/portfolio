import SocialNetwork from "@components/socialNetwork";

function Footer() {
  return (
    <footer className="w-[90vw] flex justify-between items-between pb-5">
      <div className="flex flex-col pointer-events-none">
        <span className="font-extrabold text-2xl">Fabián Guzmán Otavo.</span>
        <p>All rights reserved © 2023</p>
      </div>
      <div>
        <SocialNetwork />
      </div>
    </footer>
  );
}

export default Footer;
