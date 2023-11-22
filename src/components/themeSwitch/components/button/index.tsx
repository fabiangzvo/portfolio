import cs from "classnames";

type ButtonType = {
  Icon: any;
  disable: boolean;
  isRight?: boolean;
  classes?: any;
};

function Button(props: ButtonType) {
  const { Icon, disable, isRight, classes } = props;

  return (
    <div
      className={cs({
        "translate-x-0 h-full w-full rounded-full flex justify-center items-center":
          true,
        "bg-background": disable,
        [classes?.container]: !!classes?.container,
      })}
    >
      <Icon
        className={cs({
          "fill-yellow-400": isRight,
          "fill-yellow-200": !isRight,
          "opacity-0 transition-opacity duration-100": !disable,
          "max-sm:translate-x-8": !isRight && !disable,
          "max-sm:translate-x-[-2rem]": isRight && !disable,
        })}
      />
    </div>
  );
}

export default Button;
