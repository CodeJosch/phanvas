var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path


module.exports = {
	render: function (opts) {
		return new Promise(function (resolve, reject) {
				if (typeof opts === "function") {
					opts = {
						renderer: opts
					};
				}
				var childArgs = [
					path.join(__dirname, 'phanvas.phantom.js'),
					opts.width || 400,
					opts.height || 400,
					opts.format || "png",
					opts.quality || -1,
					opts.renderto || "buffer",
					opts.filename || "",
					opts.renderer,
					typeof opts.data !== "undefined" ? JSON.stringify(opts.data) : undefined
				]

				childProcess.execFile(binPath, childArgs, {encoding: 'binary', maxBuffer: 5000*1024},function (err, stdout, stderr) {
					if (err) {
						reject(err);
					} else if (stderr.toString()) {
						reject(new Error(stderr));
					} else {
						if (childArgs[5] === "buffer") {
							resolve( Buffer.from(stdout, 'base64') );
						} else {
							resolve(stdout);
						}
					}
				});
			}
		)
	}
}
;