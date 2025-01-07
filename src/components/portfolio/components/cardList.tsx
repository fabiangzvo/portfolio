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
    <div className="w-full h-full grid grid-cols-3 justify-items-center grid-wrap gap-10 text-2xl max-lg:grid-cols-1">
      {cardItems}
    </div>
  );
}

export default CardList;
