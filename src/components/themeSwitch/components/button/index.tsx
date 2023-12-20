import cs from "classnames";

type ButtonType = {
  Icon: any;
  disable?: boolean;
  isRight?: boolean;
  classes?: any;
};

function Button(props: ButtonType) {
  const { Icon, classes } = props;

  return (
    <div
      className={cs({
        "h-full w-full rounded-full flex justify-center items-center bg-background":
          true,
        [classes?.container]: !!classes?.container,
      })}
    >
      <Icon className="fill-yellow-400" />
    </div>
  );
}

export default Button;
