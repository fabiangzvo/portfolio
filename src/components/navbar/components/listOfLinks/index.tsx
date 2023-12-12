import React from "react";
import cs from "classnames";

import Link from "../link";

type ListOfLinksProps = {
  hide: boolean;
  items: Array<{ label: string; to: string }>;
};

function ListOfLinks(props: ListOfLinksProps) {
  const { hide, items } = props;
  //2xl:w-[55vw]
  return (
    <div
      className={cs({
        "flex justify-around order-none w-[25vw] lg:w-[52vw] xl:w-[45vw] max-lg:w-full max-lg:order-3 max-lg:pb-3":
          true,
        hidden: hide,
      })}
    >
      <ul className="flex justify-around w-full max-lg:flex-col h-auto duration-300 transition-all">
        {items.map((item, key) => (
          <Link key={key} {...item} />
        ))}
      </ul>
    </div>
  );
}

export default ListOfLinks;