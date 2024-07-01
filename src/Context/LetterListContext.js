// LetterListContext.js
import React, { createContext, useContext, useState } from "react";

const LetterListContext = createContext();

export function useLetterList() {
  return useContext(LetterListContext);
}

export function LetterListProvider({ children }) {
  const [lettlerlist, setLettlerlist] = useState([[], [], [], [], [], []]);
  const [activerow, setActiverow] = useState(0);
  // const addLetter = (letter, i) => {
  //   if (letter.length === 1 && lettlerlist[i].length < 6) {
  //     let y = lettlerlist;
  //     let x = [...lettlerlist[i], letter.toUpperCase()];
  //     y[i] = x;
  //     console.log("MAINARRAY", y);
  //     setLettlerlist(y);
  //   }
  // };
  const clearlist = (i) => {
    let y = lettlerlist;
    y[i] = [];
    setLettlerlist(y);
    //  if (letter.length === 1 && lettlerlist.length < 6) {
    //  setLettlerlist([...lettlerlist, letter.toUpperCase()]);
    //  }
  };

  // const removeLastLetter = (i) => {
  //   if (lettlerlist[i].length > 0) {
  //     let y = lettlerlist;
  //     y[i] = y[i].slice(0, -1);
  //     // y[i] = (prevLettlerlist) => prevLettlerlist.slice(0, -1);
  //     console.log("lien36>>", y[i]);
  //     setLettlerlist(y);
  //   }
  // };
  const addLetter = (letter, i) => {
    if (letter.length === 1 && lettlerlist[i].length < 6) {
      const updatedRow = [...lettlerlist[i], letter.toUpperCase()];
      const updatedList = [...lettlerlist];
      updatedList[i] = updatedRow;
      setLettlerlist(updatedList);
    }
  };

  const removeLastLetter = (i) => {
    if (lettlerlist[i].length > 0) {
      const updatedRow = lettlerlist[i].slice(0, -1);
      const updatedList = [...lettlerlist];
      updatedList[i] = updatedRow;
      setLettlerlist(updatedList);
    }
  };
  return (
    <LetterListContext.Provider
      value={{
        lettlerlist,
        activerow,
        addLetter,
        removeLastLetter,
        clearlist,
        setActiverow,
      }}
    >
      {children}
    </LetterListContext.Provider>
  );
}
