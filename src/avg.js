var reductio_types = require('./types.js');

var reductio_avg = {
	add: function (a, prior, path) {
		return function (p, v, nf) {
			if(prior) prior(p, v, nf);
			if(path(p).count > 0) {
				path(p).avg = reductio_types.numericType().div(path(p).sum, path(p).count);
			} else {
				path(p).avg = 0;
			}
			return p;
		};
	},
	remove: function (a, prior, path) {
		return function (p, v, nf) {
			if(prior) prior(p, v, nf);
			if(path(p).count > 0) {
				path(p).avg = reductio_types.numericType().div(path(p).sum, path(p).count);
			} else {
				path(p).avg = 0;
			}
			return p;
		};
	},
	initial: function (prior, path) {
		return function (p) {
			p = prior(p);
			path(p).avg = reductio_types.numericType().of(0);
			return p;
		};
	}
};

module.exports = reductio_avg;