const phanvas = require("..");
const http = require("http");


http.createServer(function(request, response){

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
			data: {
				rectangles: [
					{left: 2, top:2, width: 30, height: 50, fill:"red", stroke:"black"},
					{left: 100, top:100, width: 50, height: 30, fill:"blue", stroke:"black"},
					{left: 200, top:200, width: 40, height: 40, fill:"green", stroke:"black"}
				]
			}
		}
	)
		.then(function (buffer) {
			// buffer contains image
			response.writeHeader(200, {
				"Content-Type": "image/png",
				"Content-Size": buffer.length
			});
			response.write(buffer);
			response.end();
		})
		.catch(function (err) {
			// handle any error here
			console.error(err);
			response.writeHeader(200, {
				"Content-Type": "text/plain"
			});
			response.send("Error: "+err.message);
			response.end();
		});

}).listen(3001);

console.info("Server Running on 3001");