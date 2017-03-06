# phanvas

Use html5 canvas from nodejs with the same scripts as in the browser to create images.


## Usage
```js 

const phanvas = require("..");
phanvas(options) 
  .then(...)
  .catch(...)
```
### Most simple

Write a renderer function and pass it to phanvas. It will return a promise you can chain/catch.

See examples and test folders for examples.
```js 

const phanvas = require("phanvas");

phanvas(
  function(canvas){ 
      /* code drawing con canvas */
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(10,10,100,100);
  })
  .then(function (buffer) { 
    // do sth better than dumping it to the console ;)
    console.info(buffer);
  })
  .catch(function(err){
    console.error(err);
  })
```

### Passing data to renderer function

As the renderer function will run in phantomjs browser scope, you can not use variables from node.

Supply a data that will be passed as parameter to rendering function. 

```js 

const phanvas = require("..");

phanvas({
  renderer: function (canvas, data) {
    /* code drawing on canvas */
    var ctx = canvas.getContext("2d");
    data.rectangles.forEach(function(rect) {
      ctx.beginPath();
      ctx.fillStyle = rect.fill;
      ctx.strokeStyle = rect.stroke;
      ctx.rect(rect.left, rect.top, rect.width, rect.height);
      ctx.fill();
      ctx.stroke();
    });

  },
  renderto: "base64",
  data: {
    rectangles: [
      {left: 2, top:2, width: 30, height: 50, fill:"red", stroke:"black"},
      {left: 100, top:100, width: 50, height: 30, fill:"blue", stroke:"black"},
      {left: 200, top:200, width: 40, height: 40, fill:"green", stroke:"black"}
    ]
  }
  }
)
  .then(function (base64) {
    // dataurl contains base64 encoded image.
    // do sth better than dumping it to the console ;)
    console.info(base64);
  })
  .catch(function (err) {
    // handle any error here
    console.error(err);
  });

```

## Options

* options.width (integer defaults to 400):
Width of canvas/image
* options.height (integer defaults to 400):
Height of canvas/image
* options.format (png|jpg|pdf default png):
Output image format
* options.quality (integer between 0 and 100):
Output image quality for jpg and pdf
* options.renderto (buffer|file|base64|dataurl default buffer):
Type of output rendering
* opts.filename (path to file):
Path to save image to if renderto is "file", else ignored