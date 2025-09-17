export type CardProps = {
  title: string;
  description: string;
  link?: string;
  imageUrl: string;
  isWork?: boolean;
  stackList: Array<string>;
};

export type CardListProps = {
  items: Array<CardProps>;
};
