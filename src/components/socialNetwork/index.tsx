import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";

function SocialNetwork() {
  return (
    <div className="w-40 flex justify-between text-4xl pb-5">
      <a
        href="https://www.linkedin.com/in/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className="cursor-pointer text-text" />
      </a>
      <a
        href="https://twitter.com/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaXTwitter className="cursor-pointer text-text" />
      </a>
      <a
        href="https://github.com/fabiangzvo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className="cursor-pointer text-text" />
      </a>
    </div>
  );
}

export default SocialNetwork;
