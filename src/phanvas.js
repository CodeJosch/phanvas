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
					opts.renderer
				]

				childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
					if (err) {
						reject(err);
					} else if (stderr) {
						reject(new Error(stderr));
					} else {
						resolve(stdout)
					}
				});
			}
		)
	}
}
;