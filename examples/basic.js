const phanvas = require("..");

phanvas(
	function (canvas) {
		/* code drawing on canvas */
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "red";
		ctx.fillRect(10, 10, 100, 100);
	}
)
.then(function (buffer) {
	// do sth better than dumping it to the console ;)
	console.info(buffer);
})
.catch(function (err) {
	// handle any error here
	console.error(err);
});
