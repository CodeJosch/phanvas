"use strict";
var err = "";
var system = require('system');
system.stdout.setEncoding("binary");

try {
	var page = require('webpage').create();
	var opts = {
		width: parseInt(system.args[1]),
		height: system.args[2],
		format: system.args[3],
		quality: system.args[4],
		renderto: system.args[5],
		filename: system.args[6],
		renderer: system.args[7],
		data: system.args[8]
	};
	page.onError = function (msg, trace) {
		err = "Page evaulation - " + msg;
	};
	page.viewportSize = {width: opts.width, height: opts.height};


	// create a plain page
	page.content = '<!-- doctype html--><html><head><style>body{margin:0;}</style></head><body><canvas width="'
		+ opts.width + '" height="' + opts.height + '"></canvas><script>(' +
		opts.renderer + ')(document.querySelector("canvas"),' +
		( (typeof opts.data !== "undefined") ? opts.data: "undefined") + ')</script></body></html>';
	if (err) throw new Error(err);

	// get canvas size, might have changed on rendering
	page.viewportSize = page.evaluate(function () {
		var c = document.querySelector("canvas");
		return {width: c.width, height: c.height};
	});
	if (err) throw new Error(err);

	// render page
	/*if (opts.renderto === "buffer") {
		// not supported in current prebuild release
		//page.renderBuffer( {format: opts.format, quality: opts.quality});
	} else */if (opts.renderto === "file") {
		page.render(opts.filename, {format: opts.format, quality: opts.quality});
	} else if (opts.renderto === "dataurl") {
		var pre = "data:";
		var format = opts.format.toLowerCase();
		if (format === "pdf") {
			pre += "application/pdf";
		} else {
			pre += "image/" + format;
		}
		system.stdout.write(pre + ";base64," + page.renderBase64(opts.format, opts.quality));
	} else {
		system.stdout.write(page.renderBase64(opts.format, opts.quality));
	}
	if (err) throw new Error(err);
}
catch (e) {
	err = e.message;
}

if (err) {
	system.stderr.write(err);
}
phantom.exit();
