import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import image1 from "./background_tshirt.png";
import image2 from "./gallery1.png";

import { fabric } from "fabric";

function App() {
  let canvRef = useRef(null);
  let [getImage, setImage] = useState([]);
  let [getText, setText] = useState([]);
  let [getColor, setColor] = useState("#fff");
  var canvas;
  //clear canvas each time new object added
  const clearCanvas = () => {
    let pp = document.getElementsByTagName("canvas");
    console.log("pp", pp.length);
    for (let i = 1; i < pp.length; i++) {
      console.log(pp[i], "", i);
      pp[i].remove();
    }
  };

  //on adding image from dropdown this image this section works
  useEffect(() => {
    clearCanvas(); //clear canvas

    if (getImage.length > 0) {
      canvas = new fabric.Canvas("test");
      canvas.setHeight(400);
      canvas.setWidth(200);

      drawImage(canvas);

      if (getText.length > 0) {
        for (let i = 0; i < getText.length; i++) {
          canvas.add(new fabric.Text(getText[i]));
        }
      }
      canvas.renderAll();
    }
  }, [getImage]);

  //uploading image saved in state
  function imageUpload(e) {
    var reader = new FileReader();
    reader.onload = async function (event) {
      var imgObj = await new Image();
      imgObj.src = await event.target.result;
      setImage([...getImage, imgObj.src]);
    };
    let p = e.target.files[0];

    reader.readAsDataURL(p);
  }

  //onchange if text this section works
  useEffect(() => {
    clearCanvas();

    if (getText.length > 0) {
      canvas = new fabric.Canvas(canvRef.current);
      canvas.setHeight(400);
      canvas.setWidth(200);
      let setNewColor = "black";
      if (getColor === "#000") {
        setNewColor = "#f00";
      }
      for (let i = 0; i < getText.length; i++) {
        canvas.add(
          new fabric.Text(getText[i], {
            left: 50,
            top: 50,
            fill: setNewColor,
          })
        );
      }

      if (getImage.length > 0) {
        drawImage(canvas);
      }
    }
  }, [getText]);

  // draw image based on saved value
  const drawImage = (canvas) => {
    for (let i = 0; i < getImage.length; i++) {
      fabric.Image.fromURL(getImage[i], function (img) {
        img.scaleToHeight(100);
        img.scaleToWidth(100);
        if (getImage.length > 0) {
          canvas.centerObject(img);
        }
        canvas.add(img);
      });
    }
    canvas.renderAll();
  };

  // for changing color
  function mycolor(e) {
    document.getElementById("tshirt-div").style.backgroundColor =
      e.target.value;
    setColor(e.target.value);
  }

  //text is saved for state
  const handleText = () => {
    let value = document.getElementById("text").value;
    document.getElementById("text").value = "";
    console.log(value, "PPPPPPPPPPPP");

    setText([...getText, value]);
  };

  const deleteItem = (e) => {
    console.log("myyyyyyy");
  };

  function display() {
    let pl = canvRef.current;
    console.log(getColor);
    pl = pl.toDataURL();

    console.log(pl);
    let image = document.createElement("img");
    image.src = pl;
    image.style.border = "1px solid red";
    document.querySelector(".App").appendChild(image);
  }
  return (
    <div className="App">
      <div id="tshirt-div" style={{ margin: "10px" }}>
        <img id="tshirt-backgroundpicture" src={image1} />

        <div
          id="drawingArea"
          className="drawing-area"
          onKeyPress={(e) => deleteItem(e)}
        >
          <div className="canvas-container">
            <canvas
              ref={canvRef}
              id="test"
              style={{
                height: "400px",
                width: "200px",
                border: "5px solid black",
              }}
            ></canvas>
          </div>
        </div>
      </div>

      <div style={{ margin: "10px" }}>
        <label>T-Shirt Color:</label>
        <select id="tshirt-color" onChange={(e) => mycolor(e)}>
          <option value="#fff">White</option>
          <option value="#000">Black</option>
          <option value="#f00">Red</option>
          <option value="#008000">Green</option>
          <option value="#ff0">Yellow</option>
        </select>
      </div>

      <div style={{ margin: "10px" }}>
        <label>Upload image</label>
        <input
          type="file"
          multiple
          id="tshirt-custompicture"
          onChange={(e) => imageUpload(e)}
        />
      </div>

      <div style={{ margin: "10px" }}>
        <input type="text" id="text" placeholder="type your text" />
        <button onClick={handleText}> Submit Text</button>
      </div>

      <div style={{ margin: "10px" }}>
        <button type="button" onClick={display}>
          Display
        </button>
      </div>
      {/* <div style={{ margin: "10px" }}>
        <label>Select your Text color:</label>
        <input
          type="color"
          id="favcolor"
          name="favcolor"
         
        ></input>
  
      </div> */}
    </div>
  );
}

export default App;
