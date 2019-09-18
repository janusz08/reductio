var reductio_types = require('./types.js');

var reductio_sum = {
	add: function (a, prior, path) {
		return function (p, v, nf) {
			if(prior) prior(p, v, nf);
			path(p).sum = reductio_types.numericType().sum(path(p).sum,  a(v));
			return p;
		};
	},
	remove: function (a, prior, path) {
		return function (p, v, nf) {
			if(prior) prior(p, v, nf);
			path(p).sum = reductio_types.numericType().sub(path(p).sum , a(v));
			return p;
		};
	},
	initial: function (prior, path) {
		return function (p) {
			p = prior(p);
			path(p).sum = reductio_types.numericType().of(0);
			return p;
		};
	}
};

module.exports = reductio_sum;