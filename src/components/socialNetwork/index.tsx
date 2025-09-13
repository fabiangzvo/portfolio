import cs from "classnames";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";

interface SocialNetworkProps {
  containerClass?: string;
}

function SocialNetwork(props: SocialNetworkProps) {
  const { containerClass = "" } = props;

  return (
    <div
      className={cs({
        "w-min flex justify-between text-4xl pb-5 left-0 bottom-0 gap-4": true,
        [containerClass]: !!containerClass,
      })}
    >
      <a
        href="https://www.linkedin.com/in/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="linkedin"
      >
        <FaLinkedin className="cursor-pointer text-text" size={32} />
      </a>
      <a  
        href="https://twitter.com/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="twitter"
      >
        <FaXTwitter className="cursor-pointer text-text" size={32} />
      </a>
      <a
        href="https://github.com/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="github"
      >
        <FaGithub className="cursor-pointer text-text" size={32} />
      </a>
    </div>
  );
}

export default SocialNetwork;
