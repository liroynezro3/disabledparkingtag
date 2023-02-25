import "./App.css";

import { Route, Routes, Link } from "react-router-dom";
import { Disabledparking } from "./components/Disabledparking";
import React, { useState } from "react";
function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <React.Fragment>
      <div className="moveOn">
        {!toggle ? (
          <h1>Click Here to go cheack Disabled Parking</h1>
        ) : (
          <h1>Click Here to toggle Disabled Parking</h1>
        )}
        {!toggle ? (
          <Link to={"/Disabledparking"} className="link" onClick={()=>{setToggle(!toggle)}}>
            link to tags
          </Link>
        ) : (
          <Link to={"/"} className="link" onClick={()=>{setToggle(!toggle)}}>
            link to back
          </Link>
        )}
      </div>
      <Routes>
        <Route path={"/Disabledparking"} element={<Disabledparking />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
