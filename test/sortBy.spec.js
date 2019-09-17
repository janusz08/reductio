function descending(a, b) {
    return a < b ? 1 : a > b ? -1 : a >= b ? 0 : NaN;
}

describe('Reductio sortBy', function () {
    var group, reducer;

    beforeEach(function () {
        var data = crossfilter([
            {foo: 1, bar: 6},
            {foo: 2, bar: 5},
            {foo: 3, bar: 4},
            {foo: 4, bar: 3},
            {foo: 5, bar: 2},
            {foo: 6, bar: 1}
        ]);

        var dim = data.dimension(function(d) { return d.foo; });
        group = dim.group();
        groupString = dim.group();

        reducer = reductio()
                .sum('bar')
                .count(true)
                .avg(true);

        reducer(group);
    });

    it('has six groups', function (done) {
        expect(group.post().sortBy('value.sum')().length).toEqual(6);
        done();
    });

    it('orders correctly', function (done) {
        var all = group.post().sortBy('value.sum', descending)();
        for(var i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(6-i);
        }
        all = group.post().sortBy('value.sum')();
        for(i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(i+1);
        }
        done();
    });

    it('works with functions', function(done){
        var all = group.post().sortBy(function(d){
            return -d.value.sum;
        })();
        for(var i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(6-i);
        }
        all = group.post().sortBy(function(d){
            return d.value.sum;
        })();
        for(i = 0; i < all.length; ++i){
            expect(all[i].value.sum).toBe(i+1);
        }
        done();
    });

    it('works with cap', function(done){
        var all = group.post().sortBy('value.sum', descending).cap(3)();
        expect(all[0].value.sum).toBe(6);
        expect(all[1].value.sum).toBe(5);
        expect(all[2].value.sum).toBe(10);
        done();
    });

});
