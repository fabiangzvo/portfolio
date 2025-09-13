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
        <span key={index} className="last:mt-[1.6rem] nth-2:mt-7 mt-7 h-full mb-8 first:animate-listVertically inline-block">{word}</span>
      ))}
    </div>
  );
};

export default WordWriter;