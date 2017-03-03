const phanvas = require(".");

phanvas({
	renderer: function (canvas) {
		/* code drawing con canvas */
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "red";
		ctx.fillRect(10, 10, 100, 100);
	}
})
.then(function (base64) {
	// dataurl contains base64 encoded image.
	// do sth better than dumping it to the console ;)
	console.info(base64);
})
.catch(function (err) {
	console.error(err);
});
