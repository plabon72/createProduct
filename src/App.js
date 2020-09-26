import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import image1 from "./background_tshirt.png";
import image2 from "./gallery1.png";
import happy from "./images/smile.png";
import grin from "./images/grinning.png";
import happiness from "./images/happiness.png";
import smiling from "./images/smiling.png";
import smiling1 from "./images/smiling-1.png";
import yummy from "./images/yummy.png";
import delet from "./images/delete.png";
import { fabric } from "fabric";
import Canvas from "./component/Canvas";


function App() {
  let canvRef = useRef(null);
  let contextRef = useRef(null);
  let [getImage, setImage] = useState([]);

  let [getColor, setColor] = useState("#fff");

  var canvas;
  //clear canvas each time new object added
  const clearCanvas = () => {
    let pp = document.getElementsByTagName("canvas");
    for (let i = 1; i < pp.length; i++) {
      pp[i].remove();
    }
  };

  //on adding image from dropdown this image this section works
  useEffect(() => {
    clearCanvas(); //clear canvas

    if (getImage.length > 0) {
      canvas = new fabric.Canvas("test");
      contextRef.current = canvas;

      canvas.setHeight(400);
      canvas.setWidth(200);

      // setStatus(true);

      const fileList = getImage.filter((item) => item.fieldType === "image");
      drawImage(canvas, fileList);
      const textList = getImage.filter((item) => item.fieldType === "text");
      if (textList.length > 0) {
        for (let i = 0; i < textList.length; i++) {
          canvas.add(
            new fabric.Text(textList[i].value, {
              left: textList[i].left,
              top: textList[i].top,
              id: textList[i].id,
            })
          );
        }
      }

      go(canvas);
      canvas.renderAll();
    }
  }, [getImage.length]);

  function takingSateValue(data, getImages) {
    console.log(getImages, "brooooooooooooooo");

    let st = getImages.length || 0;
    if (st == 0) return;
    console.log(st, "ttttttttttrrrrrrrrrrrrr");

    console.log(getImages);
    console.log(data);
    const allvalue = getImages.filter((item) => item.id != data);
    console.log(allvalue);

    clearCanvas();
    setImage([...allvalue]);
  }

  //uploading image saved in state
  async function imageUpload(e) {
    var reader = new FileReader();
    reader.onload = async function (event) {
      var imgObj = await new Image();
      imgObj.src = await event.target.result;

      let id = Date.now();
      let src = "image_" + id;
      setImage([
        ...getImage,
        {
          imageSrc: imgObj.src,
          left: 80,
          top: 80,
          height: 50,
          width: 50,
          id: src,
          fieldType: "image",
        },
      ]);
    };
    let p = e.target.files[0];

    reader.readAsDataURL(p);
  }

  //handleImoji saved in state

  const handleImoji = async (happy) => {
    let id = Date.now();
    let src = "image_" + id;

    //  let all=  await delImages();
    //  console.log("babuuuuuuuuu");
    setImage([
      ...getImage,
      {
        imageSrc: happy,
        left: 80,
        top: 80,
        height: 50,
        width: 50,
        id: src,
        fieldType: "image",
      },
    ]);
  };

  //text is saved for state
  const handleText = () => {
    let value = document.getElementById("text").value;
    document.getElementById("text").value = "";
    console.log(value, "PPPPPPPPPPPP");
    let id = Date.now();
    let src = "text_" + id;
    setImage([
      ...getImage,
      { value, left: 50, top: 50, id: src, fieldType: "text" },
    ]);
  };

  // draw image based on saved value
  // hidecontrols remove the corner space for delete btn
  const drawImage = (canvas, fileList) => {
    var HideControls = {
      tl: true,
      tr: false,
      bl: true,
      br: true,
      ml: true,
      mt: true,
      mr: true,
      mb: true,
      mtr: true,
    };
    for (let i = 0; i < fileList.length; i++) {
      //console.log("testttttttttttttttttt", getImage[i].imageSrc);
      fabric.Image.fromURL(fileList[i].imageSrc, function (img) {
        img.scaleToHeight(fileList[i].height);
        img.scaleToWidth(fileList[i].width);
        img.setControlsVisibility(HideControls);
        // methodsOf(img); //setting event on  each images
        canvas.add(
          img.set({
            top: fileList[i].top,
            left: fileList[i].left,
            id: fileList[i].id,
            fieldType: fileList[i].fieldType,
          })
        );
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

  //show canvas
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

  //delete btn created and placed on objects
  function addDeleteBtn(x, y) {
    console.log(x, y, "unexpecteddd");

    var btnLeft = x - 10;
    var btnTop = y - 10;
    let deletebtn = document.createElement("img");
    deletebtn.src = `${delet}`;
    deletebtn.className = "plabon";
    deletebtn.style.cssText = `position:absolute;top:${btnTop}px;left:${btnLeft}px;cursor:pointer;width:20px;height:20px`;
    let g = document.getElementsByClassName("canvas-container");
    g[0].appendChild(deletebtn);
    deletebtn.addEventListener("click", myTest);
  }

  function myTest() {
    console.log("VVVVVVVVVVVVVVVVVVVVVVV", canvas, contextRef.current);
    if (contextRef.current.getActiveObject()) {
      let gg = getImage;
      let seletedObj = contextRef.current.getActiveObject();
      takingSateValue(seletedObj.id, gg);
      canvas.remove(canvas.getActiveObject());

      let nodes = document.getElementsByClassName("plabon");
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].remove();
      }
    }
  }

  //here cnavas event is written
  function go(canvas) {
    canvas.on("mouse:down", function (e) {
      if (!canvas.getActiveObject()) {
       document.getElementsByClassName("plabon")[0].remove();
      }
    });

    canvas.on("mouse:dblclick", function (e) {
      if (canvas.getActiveObject()) {
        if (
          e.target.hasOwnProperty("oCoords") &&
          e.target.oCoords.hasOwnProperty("tr") &&
          e.target.oCoords.tr.hasOwnProperty("x") &&
          e.target.oCoords.tr.hasOwnProperty("y")
        )
          addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
      }
    });

    canvas.on("object:scaling", function (e) {
      let nodes = document.getElementsByClassName("plabon");
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].remove();
      }
    });
    canvas.on("object:moving", function (e) {
    //  $(".plabon").remove();
      let nodes=document.getElementsByClassName("plabon");
      for(let i=0;i<nodes.length;i++){
        nodes[i].remove();
      }
    });
    canvas.on("object:rotating", function (e) {
      let nodes = document.getElementsByClassName("plabon");
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].remove();
      }
    });

    //setting the height and width of objects while resize and saved
    canvas.on("object:scaled", function (obj) {
      let p = obj.target.scaleX;
      let r = obj.target.scaleY;
      let w = p * obj.target.width;
      let h = r * obj.target.height;

      console.log(obj, "scaledddddd   gggggggggggg");
      let cuId = obj.target.id;
      let getImages = getImage;

      if (obj.target.hasOwnProperty("_element")) {
        let content = [];
        for (let i = 0; i < getImages.length; i++) {
          let str = getImages[i].id;

          if (str.indexOf(cuId) !== -1) {
            getImages[i].height = h;
            getImages[i].width = w;
            getImages[i].id = getImages[i].id;
            getImages[i].fieldType = "image";
            getImages[i].top = obj.target.top;
            getImages[i].left = obj.target.left;
            content.push(getImages[i]);
          } else {
            content.push(getImages[i]);
          }
        }

        console.log(content);
        setImage([...content]);
      }
    });

    //while moving object in canvas redering all
    canvas.on("object:moved", function (obj) {
      console.log(obj.target.id);
      let id = obj.target.id;
      let field = obj.target.fieldType;
      let getImages = getImage;

      let cuId = obj.target.id;

      let content = [];
      let copyFile = {};

      for (let i = 0; i < getImages.length; i++) {
        let str = getImages[i].id;

        if (str.indexOf(cuId) !== -1) {
          if (field === "image") {
            copyFile = {
              imageSrc: getImages[i].imageSrc,
              top: obj.target.top,
              left: obj.target.left,
              height: getImages[i].height,
              width: getImages[i].width,
              id: getImages[i].id,
              fieldType: "image",
            };
          } else {
            copyFile = {
              fieldType: "text",
              value: getImages[i].value,
              top: obj.target.top,
              left: obj.target.left,
              id: getImages[i].id,
            };
          }

          content.push(copyFile);
        } else {
          content.push(getImages[i]);
        }
      }

      console.log(content);
      setImage([...content]);
    });
  }

  return (
    <div className="App">


      <div
        className="image"
        style={{ border: "2px solid black", padding: "10px", width: "400px" }}
      >
        <img
          src={happy}
          onClick={() => handleImoji(happy)}
          style={{ height: "50px", width: "50px" }}
        />

        <img
          src={yummy}
          onClick={() => handleImoji(yummy)}
          style={{ height: "50px", width: "50px" }}
        />

        <img
          src={happiness}
          onClick={() => handleImoji(happiness)}
          style={{ height: "50px", width: "50px" }}
        />

        <img
          src={grin}
          onClick={() => handleImoji(grin)}
          style={{ height: "50px", width: "50px" }}
        />
        <img
          src={happy}
          onClick={() => handleImoji(happy)}
          style={{ height: "50px", width: "50px" }}
        />
      </div>
      <div id="tshirt-div" style={{ margin: "10px" }}>
        <img id="tshirt-backgroundpicture" src={image1} />

        <div id="drawingArea" className="drawing-area">
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
    </div>
  );
}

export default App;
