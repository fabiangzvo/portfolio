export type Options = Array<{ label: string; value: string }>;

export type DropdownProps = {
  label: string | React.ReactElement;
  options: Options;
  handleClick: React.MouseEventHandler<HTMLElement>;
};

export type OptionListProps = {
  isOpen: boolean;
  options: Options;
  handleClick: React.MouseEventHandler<HTMLElement>;
};

export type OptionProps = {
  value: string;
  label: string;
  handleClick: React.MouseEventHandler<HTMLElement>;
};
