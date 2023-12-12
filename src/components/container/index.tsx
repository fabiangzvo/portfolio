import React, { useMemo } from "react";
import cs from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  id: string;
  label: string;
  rightTitle?: boolean;
  description?: any;
  classes?: { container?: string; title?: string; containerTitle?: string };
};

function Container(props: ContainerProps) {
  const { children, id, label, rightTitle, description, classes = {} } = props;
  const { container = "", title = "", containerTitle = "" } = classes;

  const { leftContent, rightContent } = useMemo(() => {
    const titleComponent = (
      <div
        className={cs({
          "w-[60vw] max-lg:w-full max-2xl:order-first mb-10": true,
          [containerTitle]: !!containerTitle,
        })}
      >
        <h1
          className={cs({
            "fill-text-transparent pointer-events-none text-text max-sm:w-full text-9xl max-md:text-7xl font-extrabold gradient-text text-4xl text-white font-extrabold bg-clip-text bg-gradient-to-r to-secondary from-primary mb-[0.2em] pr-7":
              true,
            [title]: !!title,
          })}
        >
          {label}
        </h1>
        <span
          className="w-full text-2xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    );
    const content = (
      <div className="w-full max-2xl:order-last mb-10">{children}</div>
    );

    return {
      leftContent: rightTitle ? content : titleComponent,
      rightContent: rightTitle ? titleComponent : content,
    };
  }, [containerTitle, title, label, description, children, rightTitle]);

  return (
    <div
      id={id}
      className={cs({
        "w-full min-h-[100vh] justify-center 2xl:items-center font-mono text-xl 2xl:flex max-2xl:flex max-2xl:flex-col":
          true,
        [container]: !!container,
      })}
    >
      {leftContent}
      {rightContent}
    </div>
  );
}

export default Container;
