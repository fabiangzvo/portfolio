type BadgeProps = {
  label: string;
};

function Badge(props: BadgeProps) {
  const { label } = props;

  return (
    <span className="bg-tertiary text-text text-base font-black me-2 px-2.5 py-0.5 rounded">
      {label}
    </span>
  );
}

export default Badge;
