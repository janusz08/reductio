var crossfilter = require('crossfilter2');
var reductio = require('./reductio');

var group;

var data = crossfilter([
    { foo: 'one', bar: 1 },
    { foo: 'two', bar: 2 },
    { foo: 'three', bar: 3 },
    { foo: 'one', bar: 4 },
    { foo: 'one', bar: 5 },
    { foo: 'two', bar: 6 },
]);

var dim = data.dimension(function (d) { return d.foo; });
group = dim.group();

var reducer = reductio('BigJs')
    .sum(function (d) { return d.bar; })
    .count(true);


reducer(group);

group.top(Infinity).length;

var values = {};
group.top(Infinity).forEach(function (d) {
    values[d.key] = d.value;
});

