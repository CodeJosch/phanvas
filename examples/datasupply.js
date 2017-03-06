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
