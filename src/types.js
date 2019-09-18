var Big = require('big.js');

var reductio_types = {
    defaultNumericType: function() {
	    return {
            sum: (a,b) => { return a + b; },
            sub: (a,b) => {return a - b; },
            mul: (a,b) => { return a * b; },
            div: (a,b) => { return a / b; },
            of: (a) => { return +a; }
        };
    },
    BigJsType: function() {
	    return {
            sum: (a,b) => { return a.plus(b); },
            sub: (a,b) => {return a.minus(b); },
            mul: (a,b) => { return a.times(b); },
            div: (a,b) => { return a.div(b); },
            of: (a) => { return new Big(a); }
        };
    },
    build : function(numericType, p) {
        p.numericType = numericType === undefined ? 'Number' : numericType;
        if(p.numericType === 'BigJs') {
            reductio_types.numericType = reductio_types.BigJsType;
        } else {
            reductio_types.numericType = reductio_types.defaultNumericType;
        }
    }
};



module.exports = reductio_types;