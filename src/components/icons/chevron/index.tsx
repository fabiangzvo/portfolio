type ChevronProps = {
  isOpen: boolean;
};

function Chevron(props: ChevronProps) {
  const { isOpen } = props;

  return (
    <svg
      className="w-2.5 h-2.5 ms-3 transition ease-in-out"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={isOpen ? "0 0 14 8" : "0 0 10 6"}
    >
      <path
        className="transition ease-in-out"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={isOpen ? "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" : "m1 1 4 4 4-4"}
      />
    </svg>
  );
}

export default Chevron;
