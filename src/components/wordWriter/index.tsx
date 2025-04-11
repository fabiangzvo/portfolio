"use client"

import React, { useState, useEffect } from 'react';

interface WordWriterProps {
  wordList: string[]
}

function WordWriter({ wordList }: WordWriterProps) {
  const [currWord, setCurrWord] = useState(wordList[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      const wordPosition = wordList.findIndex((word) => word === currWord);
      const nextPosition =
        wordPosition === wordList.length - 1 ? 0 : wordPosition + 1;

      setCurrWord(wordList[nextPosition]);
    }, 4000);

    return () => clearInterval(interval);
  });

  return (
    <p
      key={currWord}
      className="overflow-hidden whitespace-nowrap border-r-4 border-primary animate-typewriter w-[8ch]"
    >
      {currWord}
    </p>
  );
};

export default WordWriter;