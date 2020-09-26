import React, { useEffect, useRef, useState } from "react";

import imageback from "./assets/happiness.png"
import Canvas from "./component/Canvas";
import image1 from "./assets/background_tshirt.png";
function App() {
 const[get,set]=useState("front");
 const handle=()=>{
   get==="front"?set("back"):set("front")
 }
  return (
    <div className="App">
      {get === "front" ? (
        <Canvas text="textt" image={image1} />
      ) : (
        <Canvas text="back---" image={imageback} />
      )}
      <button onClick={handle}>change</button>
    </div>
  );
}

export default App;
