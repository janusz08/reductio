// Counting tests
describe('Reductio count', function () {
    var group;

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
                .count(true);

        reducer(group);
    });

    it('has three groups', function (done) {
        expect(group.top(Infinity).length).toEqual(3);
        done();
    });

    it('grouping have the right counts', function (done) {
        var values = {};
        group.top(Infinity).forEach(function (d) {
            values[d.key] = d.value;
        });

        expect(values['one'].count).toEqual(3);
        expect(values['two'].count).toEqual(2);
        expect(values['three'].count).toEqual(1);
        done();
    });
    
    it('has a user-defined property name', function(done) {
      reductio().count(true, 'otherCount')(group);
      expect(group.top(1)[0].value.otherCount).toEqual(3);
      expect(group.top(1)[0].value.count).toEqual(undefined);
      done();
    })
});