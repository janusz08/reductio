// Alias tests
describe('Alias function', function () {
    var group;
    var values = {};

    beforeEach(function () {
        var data = crossfilter([
            { foo: 'one' },
            { foo: 'two' },
            { foo: 'three' },
            { foo: 'one' },
            { foo: 'one' },
            { foo: 'two' },
        ]);

        var dim = data.dimension(function(d) { return d.foo; });
        group = dim.group();

        var reducer = reductio()
                .count(true)
                .alias({ newCount: function(g) { return g.count; },
                         twoCount: function(g) { return 2*g.count; }
                       });

        reducer(group);
        group.top(Infinity).forEach(function (d) {
            values[d.key] = d.value;
        });
    });

    it('has three groups', function (done) {
        expect(group.top(Infinity).length).toEqual(3);
        done();
    });


    it('grouping for first alias have the right counts', function (done) {
        expect(values['one'].newCount()).toEqual(3);
        expect(values['two'].newCount()).toEqual(2);
        expect(values['three'].newCount()).toEqual(1);
        done();
    });

    it('groupings for second alias have the right values', function(done){
        expect(values['one'].twoCount()).toEqual(6);
        expect(values['two'].twoCount()).toEqual(4);
        expect(values['three'].twoCount()).toEqual(2);
        done();
    });

});