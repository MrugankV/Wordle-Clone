import "./App.css";
import React, { useEffect, useState } from "react";
import { LetterListProvider } from "./Context/LetterListContext";
import { useLetterList } from "./Context/LetterListContext"; // Replace with the correct path to LetterListContext.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { act } from "react-dom/test-utils";
function MainBoard({ crletter, activerow, setActiverow }) {
  let soln = ["D", "R", "I", "V", "E"];
  let mainlist = ["DRIVE", "SLATE", "CUTIE"];
  return (
    <div className="MainBoard">
      {/* {items.map((item, index) => (
        <Item key={index} data={item} />
      ))} */}
      <Rows
        rid={0}
        soln={soln}
        crletter={crletter}
        activerow={activerow}
        setActiverow={setActiverow}
        mainlist={mainlist}
      ></Rows>
      <Rows
        rid={1}
        soln={soln}
        crletter={crletter}
        mainlist={mainlist}
        activerow={activerow}
        setActiverow={setActiverow}
      ></Rows>
      <Rows
        rid={2}
        soln={soln}
        crletter={crletter}
        mainlist={mainlist}
        activerow={activerow}
        setActiverow={setActiverow}
      ></Rows>
      <Rows
        rid={3}
        soln={soln}
        crletter={crletter}
        mainlist={mainlist}
        activerow={activerow}
        setActiverow={setActiverow}
      ></Rows>
      <Rows
        rid={4}
        soln={soln}
        crletter={crletter}
        mainlist={mainlist}
        activerow={activerow}
        setActiverow={setActiverow}
      ></Rows>
      <Rows
        rid={5}
        soln={soln}
        crletter={crletter}
        mainlist={mainlist}
        activerow={activerow}
        setActiverow={setActiverow}
      ></Rows>
      {/* <Rows></Rows>
      <Rows></Rows>
      <Rows></Rows>
      <Rows></Rows>
      <Rows></Rows> */}
    </div>
  );
}
function Keyboardmodule({ crletter, activerow, setActiverow }) {
  return <div className="Keyboard-module"></div>;
}
function BoardModule() {
  // const [lettlerlist, setLettlerlist] = useState([]);
  const {
    lettlerlist,
    activerow,
    addLetter,
    clearlist,
    removeLastLetter,
    setActiverow,
  } = useLetterList();
  // window.addEventListener("keydown", handleKeyDown);
  // function handleKeyDown(e) {
  //   if (e.key.length < 2) {
  //     let x = e.key.toUpperCase();
  //     if (lettlerlist.length < 6) {
  //       setLettlerlist([...lettlerlist, x]);
  //     } else {
  //       setLettlerlist([]);
  //     }
  //   }
  //   if (e.key === "Backspace") {
  //     if (lettlerlist.length > 0) {
  //       setLettlerlist((prevLettlerlist) => prevLettlerlist.slice(0, -1));
  //     }
  //   }
  //   // console.log(e.key);
  //   // if (e.key.length < 2) {
  //   //   // lettlerlist.push(e.key.toUpperCase());
  //   //   // setLettlerlist(lettlerlist);
  //   //   let x = e.key.toUpperCase();
  //   //   if (lettlerlist.length < 6) {
  //   //     setLettlerlist([...lettlerlist, x]);
  //   //   } else {
  //   //     setLettlerlist([]);
  //   //   }

  //   //   // console.log(lettlerlist);
  //   // }
  //   // if (e.key == "Backspace") {
  //   //   if (lettlerlist != []) {
  //   //     lettlerlist.pop();
  //   //     setLettlerlist(lettlerlist);
  //   //     console.log(lettlerlist);
  //   //   }
  //   // }
  //   // setCurrentletter(e.key.toUpperCase());
  // }

  useEffect(() => {
    // Function to handle keydown events
    function handleKeyDown(e) {
      if (e.key.length < 2) {
        console.log(activerow);
        console.log(e.key);
        let x = e.key.toUpperCase();
        console.log(lettlerlist[activerow]);
        if (lettlerlist[activerow].length < 6) {
          // setLettlerlist([...lettlerlist, x]);
          addLetter(e.key, activerow);
        } else {
          // setLettlerlist([]);
          clearlist(activerow);
        }
      }
      if (e.key === "Backspace") {
        if (lettlerlist[activerow].length > 0) {
          // setLettlerlist((prevLettlerlist) => prevLettlerlist.slice(0, -1));
          removeLastLetter(activerow);
        }
      }
    }

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lettlerlist[activerow]]);
  return (
    <div className="Board-module">
      <MainBoard
        crletter={lettlerlist}
        activerow={activerow}
        setActiverow={setActiverow}
      ></MainBoard>
    </div>
  );
}
function Rows({ rid, crletter, soln, mainlist, activerow, setActiverow }) {
  const [submit, setSubmit] = useState(false);
  const notify = (mssg, type) => {
    if (type == "success") {
      toast.success(mssg, {
        position: toast.POSITION.BOTTOM_CENTER, // You can customize the position: ;
        autoClose: 3000, // Auto close the notification after 3 seconds (milliseconds)
      });
    }
    if (type == "failure") {
      toast.error(mssg, {
        position: toast.POSITION.BOTTOM_CENTER, // You can customize the position
        autoClose: 2000, // Auto close the notification after 3 seconds (milliseconds)
      });
    }
    if (type == "warning") {
      toast.warning(mssg, {
        position: toast.POSITION.BOTTOM_CENTER, // You can customize the position
        autoClose: 1000, // Auto close the notification after 3 seconds (milliseconds)
      });
    }
  };
  useEffect(() => {
    // Function to handle keydown events
    function handleKeyDown(e) {
      if (e.key === "Enter") {
        if (crletter[activerow].length === 5) {
          // setLettlerlist((prevLettlerlist) => prevLettlerlist.slice(0, -1));
          if (
            mainlist.includes(
              crletter[activerow].reduce((accumulator, currentChar) => {
                return accumulator + currentChar;
              }, "")
            )
          ) {
            notify("Success!", "success");
            setSubmit(true);
            setActiverow(activerow + 1);
          } else {
            notify("Word Absent!", "failure");
          }
        } else if (crletter[activerow].length < 6) {
          notify("Word too Short!", "warning");
        }
      }
    }

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [crletter[activerow]]);
  return (
    <div className="Row-module">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Tile
          id={index}
          val={crletter[rid][index]}
          solnid={soln[index]}
          mainsoln={soln}
          submit={submit}
          activerow={activerow}
          rid={rid}
        ></Tile>
      ))}
      {/* <Tile id={0} crletter={crletter}></Tile>
      <Tile id={1} crletter={crletter}></Tile>
      <Tile id={2} crletter={crletter}></Tile>
      <Tile id={3} crletter={crletter}></Tile>
      <Tile id={4} crletter={crletter}></Tile> */}
    </div>
  );
}
function Tile({ id, val, solnid, mainsoln, submit, activerow, rid }) {
  // const [mval, setMval] = useState("Tile-module");
  // if (val == solnid) {
  //   setMval("Correct-Tile");
  // } else if (val == solnid) {
  // } else {
  // }
  console.log("val prop in Tile:", val);
  return (
    <div
      className={
        val
          ? activerow > rid
            ? // ? submit
              solnid == val
              ? "Tile-module-Correct"
              : mainsoln.includes(val)
              ? "Tile-module-Present"
              : "Tile-module-Absent"
            : "Tile-module-selected"
          : "Tile-module"
      }
      data={solnid}
      data-animation="pop"
      style={{
        animationDelay: `${0.5 * id}s`,
      }}
    >
      {val}
    </div>
  );
}
function AppModule() {
  return (
    <div className="App-Module">
      <BoardModule></BoardModule>
      <Keyboardmodule></Keyboardmodule>
    </div>
  );
}
function App() {
  // const [currentletter, setCurrentletter] = useState("");
  // const [currentletter, setCurrentletter] = useState("");
  // setLettlerlist([...lettlerlist, crletter]);
  // useEffect(() => {

  // return function cleanup() {
  //   window.removeEventListener("keydown", handleKeyDown);
  // };
  // }, []);
  return (
    <div className="App">
      <ToastContainer />
      <LetterListProvider>
        <AppModule></AppModule>
      </LetterListProvider>
    </div>
  );
}

export default App;
