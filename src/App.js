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
import $ from "jquery";

function App() {
  let canvRef = useRef(null);
  let contextRef = useRef(null);
  let [getImage, setImage] = useState([]);
  let [getText, setText] = useState([]);
  let [getColor, setColor] = useState("#fff");

  let [status, setStatus] = useState(true);
  var canvas;
  //clear canvas each time new object added
  const clearCanvas = () => {
    let pp = document.getElementsByTagName("canvas");
    console.log("remove-canvas", pp.length);
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
      contextRef.current = canvas;

      canvas.setHeight(400);
      canvas.setWidth(200);

      // setStatus(true);

      drawImage(canvas);

      if (getText.length > 0) {
        for (let i = 0; i < getText.length; i++) {
          canvas.add(
            new fabric.Text(getText[i].value, {
              left: getText[i].left,
              top: getText[i].top,
            })
          );
        }
      }

      go(canvas);
      canvas.renderAll();
    }
  }, [getImage.length]);

  //uploading image saved in state
  function imageUpload(e) {
    var reader = new FileReader();
    reader.onload = async function (event) {
      var imgObj = await new Image();
      imgObj.src = await event.target.result;
      setImage([
        ...getImage,
        { imageSrc: imgObj.src, left: 80, top: 80, height: 50, width: 50 },
      ]);
    };
    let p = e.target.files[0];

    reader.readAsDataURL(p);
  }

  //handleImoji saved in state

  const handleImoji = (happy) => {
    setImage([
      ...getImage,
      { imageSrc: happy, left: 80, top: 80, height: 50, width: 50 },
    ]);
  };

  //onchange if text this section works
  useEffect(() => {
    clearCanvas();
    console.log("bhaiiii");
    if (getText.length > 0) {
      canvas = new fabric.Canvas(canvRef.current);
      canvas.setHeight(400);
      canvas.setWidth(200);

      console.log(getText.length, "you areeeeeeeeeeeeeee");
      let setNewColor = "black";
      if (getColor === "#000") {
        setNewColor = "#f00";
      }
      for (let i = 0; i < getText.length; i++) {
        console.log(getText[i]);
        canvas.add(
          new fabric.Text(getText[i].value, {
            left: getText[i].left,
            top: getText[i].top,
            fill: setNewColor,
          })
        );
      }
      go(canvas);
      if (getImage.length > 0) {
        drawImage(canvas);
      }
    }
  }, [getText.length]);

  //text is saved for state
  const handleText = () => {
    let value = document.getElementById("text").value;
    document.getElementById("text").value = "";
    console.log(value, "PPPPPPPPPPPP");

    setText([...getText, { value, left: 50, top: 50 }]);
  };

  // draw image based on saved value
  // hidecontrols remove the corner space for delete btn
  const drawImage = (canvas) => {
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
    for (let i = 0; i < getImage.length; i++) {
      console.log("testttttttttttttttttt", getImage[i].imageSrc);
      fabric.Image.fromURL(getImage[i].imageSrc, function (img) {
       
        img.scaleToHeight(getImage[i].height);
        img.scaleToWidth(getImage[i].width);
        img.setControlsVisibility(HideControls);
        methodsOf(img);//setting event on  each images
        canvas.add(
          img.set({
            top: getImage[i].top,
            left: getImage[i].left,
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

  //images method 
  function methodsOf(circle) {
    circle.on("mousedown", function (e) {
      addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });
  }

  //delete btn created and placed on objects
  function addDeleteBtn(x, y) {
    console.log(x, y, "unexpecteddd");
    $(".deleteBtn").remove();
    var btnLeft = x - 10;
    var btnTop = y - 10;
    var deleteBtn =
      `<img src=${delet} class="deleteBtn" style="position:absolute;top:` +
      btnTop +
      "px;left:" +
      btnLeft +
      'px;cursor:pointer;width:20px;height:20px;"/>';
    $(".canvas-container").append(deleteBtn);
  }


  //adding handler to delete btn
  $(document).on("click", ".deleteBtn", function () {
    console.log(contextRef.current, "ssssssssssssssssssss oprs");

    // if (canvas.getActiveObject()) {
    //   canvas.remove(canvas.getActiveObject());
    //   $(".deleteBtn").remove();
    // }
  });

  //here cnavas event is written
  function go(canvas) {
  
    canvas.on("mouse:down", function (e) {
      if (!canvas.getActiveObject()) {
        $(".deleteBtn").remove();
      }
    });

    canvas.on("object:modified", function (e) {
      addDeleteBtn(e.target.oCoords.tr.x, e.target.oCoords.tr.y);
    });

    canvas.on("object:scaling", function (e) {
      $(".deleteBtn").remove();
    });
    canvas.on("object:moving", function (e) {
      $(".deleteBtn").remove();
    });
    canvas.on("object:rotating", function (e) {
      $(".deleteBtn").remove();
    });

    //setting the height and width of objects while resize and saved
    canvas.on("object:scaled", function (obj) {
      let p = obj.target.scaleX;
      let r = obj.target.scaleY;
      let w = p * obj.target.width;
      let h = r * obj.target.height;

      let getImages = getImage;
      setImage([]);
      console.log(getImages.length, "shittttttttttttttt");
      if (obj.target.hasOwnProperty("_element")) {
        let actualsource = obj.target._element.currentSrc.slice(
          obj.target._element.baseURI.length
        );
        let content = [];
        for (let i = 0; i < getImages.length; i++) {
          let str = getImages[i].imageSrc;

          if (str.indexOf(actualsource) !== -1) {
            getImages[i].height = h;
            getImages[i].width = w;

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
    canvas.on("object:moved", function () {
      let obj = canvas.getActiveObject();
      let canvasJson = JSON.stringify(canvas);
      canvasJson = JSON.parse(canvasJson);

      console.log(canvasJson);
      let images = getImage;
      setImage([]);
      const textList = canvasJson.objects.filter(
        (item) => item.type === "text"
      );
      console.log(textList.length, "texttttttt");

      let copyText = {};
      let all = [];
      for (let i = 0; i < textList.length; i++) {
        copyText = {
          value: textList[i].text,
          top: textList[i].top,
          left: textList[i].left,
        };
        all.push(copyText);
      }
      console.log(all.length);
      setText([...all]);

      const fileList = canvasJson.objects.filter(
        (item) => item.type === "image"
      );

      console.log(fileList.length, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiimage");

      let copyFile = {};
      let allImage = [];
      for (let i = 0; i < fileList.length; i++) {
        copyFile = {
          imageSrc: fileList[i].src,
          top: fileList[i].top,
          left: fileList[i].left,
          height: images[i].height,
          width: images[i].width,
        };
        allImage.push(copyFile);
      }
      console.log(allImage.length);
      setImage([...allImage]);
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
