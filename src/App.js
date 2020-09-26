import React, { useEffect, useRef, useState } from "react";
import image from "./assets/background_tshirt.png";
import imageback from "./assets/gallery1.png"
import Canvas from "./component/Canvas";

function App() {
  const [get, set] = useState(image);
  useEffect(() => {
    
  }, [get]);

const handle=()=>{
set(imageback);
}
  return (
    <div className="App">
      <button onClick={handle}>Go Back</button>
      <Canvas image1={image} />
    </div>
  );
}

export default App;
