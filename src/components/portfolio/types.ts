export type CardProps = {
  title: string;
  description: string;
  link?: string;
  imageUrl: string;
  isWork?: boolean;
};

export type CardListProps = {
  items: Array<CardProps>;
};
