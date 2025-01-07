import React, { useMemo } from "react";
import { motion, Variants, Spring } from "framer-motion";
import cs from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  id: string;
  label: string;
  description?: undefined | TrustedHTML;
  rightTitle?: boolean;
  classes?: { container?: string; title?: string; containerTitle?: string };
};

const transition: Spring = {
  type: "spring",
  bounce: 0.4,
  duration: 1,
};

const contentVariants: Variants = {
  offscreen: {
    opacity: 0,
    transition,
  },
  onscreen: {
    opacity: 1,
    transition,
  },
};

function Container(props: ContainerProps) {
  const { children, id, label, rightTitle, description, classes = {} } = props;
  const { container = "", title = "", containerTitle = "" } = classes;

  const { leftContent, rightContent } = useMemo(() => {
    const titleComponent = (
      <div
        className={cs({
          "w-[60vw] mb-10 max-lg:w-full max-2xl:order-first max-md:w-full":
            true,
          [containerTitle]: !!containerTitle,
        })}
      >
        <h1
          className={cs({
            "font-albertSans pointer-events-none font-extrabold fill-text-transparent bg-clip-text bg-gradient-to-r to-tertiary from-primary mb-[0.2em] pr-7 max-sm:w-full text-9xl max-md:text-8xl max-md:w-full":
              true,
            [title]: !!title,
          })}
        >
          {label}
        </h1>
        <span
          className="w-full text-2xl text-paragraph pointer-events-none max-md:text-4xl"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </div>
    );
    const content = (
      <div
        className={cs({
          "w-full max-2xl:order-last mb-10": true,
          "mr-10": rightTitle,
        })}
      >
        {children}
      </div>
    );

    return {
      leftContent: rightTitle ? content : titleComponent,
      rightContent: rightTitle ? titleComponent : content,
    };
  }, [containerTitle, title, label, description, children, rightTitle]);

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.1 }}
      variants={contentVariants}
      key={id}
      id={id}
      className={cs({
        "w-full min-h-[100vh] flex justify-center font-albertSans text-xl 2xl:items-center max-2xl:flex-col":
          true,
        [container]: !!container,
      })}
    >
      {leftContent}
      {rightContent}
    </motion.div>
  );
}

export default Container;
