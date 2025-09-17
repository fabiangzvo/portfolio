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

export type DetailModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  imageUrl: string;
  title: string;
  description: string;
  stackList: Array<React.ReactNode>;
  link?: string;
};
