import { useMemo } from "react";

import { CardListProps, CardProps } from "../types";
import Card from "./card";

function CardList(props: CardListProps) {
  const { items } = props;

  const cardItems = useMemo(
    () => items.map((item: CardProps) => <Card key={item.title} {...item} />),
    [items]
  );

  return (
    <div className="w-full h-full grid grid-cols-2 justify-items-center grid-wrap gap-10 max-md:gap-5 max-lg:grid-cols-1 max-lg:px-36 max-md:px-24 max-sm:px-5">
      {cardItems}
    </div>
  );
}

export default CardList;
