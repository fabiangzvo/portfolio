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
    <div className="w-full h-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-items-center grid-wrap gap-8 max-md:grid-cols-1">
      {cardItems}
    </div>
  );
}

export default CardList;
