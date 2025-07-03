"use client"

interface WordWriterProps {
  wordList: string[]
}

function WordWriter({ wordList }: WordWriterProps) {
  return (
    <div
      className="h-[38px] overflow-hidden flex flex-col justify-start"
    >
      {wordList.map((word, index) => (
        <span key={index} className="last:mt-6 &:nth-child(2):mt-5 h-full my-7 first:animate-listVertically inline-block">{word}</span>
      ))}
    </div>
  );
};

export default WordWriter;