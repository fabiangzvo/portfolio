import React, { useState, useEffect } from 'react';

interface WordChangerProps {
  wordList: string[]
}

function WordChanger({ wordList }: WordChangerProps) {
  const [currWord, setCurrWord] = useState(wordList[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      const wordPosition = wordList.findIndex((word) => word === currWord)
      const nextPosition = wordPosition === wordList.length - 1 ? 0 : wordPosition + 1

      setCurrWord(wordList[nextPosition])
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <p key={currWord} className='w-[10ch] overflow-hidden whitespace-nowrap border-r-2 border-red-500 animate-typewriter'>{currWord}</p>
  );
};

export default WordChanger;