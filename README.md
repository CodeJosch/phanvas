# phanvas

Use html5 canvas from nodejs with the same scripts as in the browser to create images

### Usage

Write a renderer function and pass it to phanvas. It will return a promise you can chain/catch.

```js 

const phanvas = require("phanvas");

phanvas({
    renderer: function(canvas){ 
      /* code drawing con canvas */
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(10,10,100,100);
    } 
    //,
    // - optionals -
    // renderto: "base64",       // or "dataurl" or "file". 
                                 // unfortunately "buffer" is documented but not wording
    // filename: "out.png",      // if renderto === "file"
    // format:"png",             // or "jpg" or 
    // width: 500,
    // height: 500
  })
  .then(function (base64) {
    // base64 contains base64 encoded image. 
    // do sth better than dumping it to the console ;)
    console.info(base64);
  })
  .catch(function(err){
  	console.error(err);
  })
```