const phanvas = require("..");
const fs = require("fs.promised");
const path = require('path')

var template = "";


function createDataurl(script,w,h) {
	return phanvas({
		renderer: require(path.join(__dirname, "./src/" + script)),
		renderto: "dataurl",
		width:w,
		height: h
	})
	.then(function (dataurl) {
		return fs.writeFile(path.join(__dirname, "out/dataurl-"+script+".html"),
			template
				.replace("{{width}}", w)
				.replace("{{height}}", h)
				.replace("{{title}}", 'Imagedataurl created from '+script)
				.replace("{{script}}", '../src/' + script + '.js')
				.replace("{{serverimage}}", '<img width="'+w+'" height="'+h+'" src="' + dataurl + '" alt="server rendered"/>')
		)
	});

}


function createFile(script, w,h) {
	return phanvas({
		renderer: require(path.join(__dirname, "./src/" + script)),
		renderto: "file",
		filename: path.join(__dirname, "out/"+script+".png"),
		width:w,
		height: h
	})
	.then(function (dataurl) {
		return fs.writeFile(path.join(__dirname, "out/file-"+script+".html"),
			template
				.replace(/\{\{width}}/g, w)
				.replace(/\{\{height}}/g, h)
				.replace("{{title}}", 'Imagefile created from '+script)
				.replace("{{script}}", '../src/' + script + '.js')
				.replace("{{serverimage}}", '<img  width="'+w+'" height="'+h+'" src="' + script+'.png" alt="server rendered"/>')
		)
	});
}

Promise.resolve()
	.then(function () {
		return fs.readFile(path.join(__dirname, "tpl/x.html"))
	})
	.then(function (tpl) {
		template = tpl.toString();
	})
	.then(function () {
		return createDataurl("rectangles", 652, 652)
			.then(function () {
				console.info("Succesfully created rectangles with dataurl")
			});
	})
	.then(function () {
		return createFile("rectangles", 652, 652)
			.then(function () {
				console.info("Succesfully created rectangles with file")
			});
	})
	.catch(function (err) {
		console.error(err)
	});
