const assert = require('assert');
const findSimilar = require('../index.js');

describe('find similar packages', function () {
    describe('#valid package', function () {
        it('should return non empty array', function (done) {
            findSimilar('redis').then(function (packages) {
                assert.ok(packages.length > 0);
                done();
            }).catch(() => { });
        });
    });
});

describe('find similar packages', function () {
    describe('#invalid package', function () {
        it('should return non empty array', function (done) {
            findSimilar('xy-yz', 20).then(function (packages) {
                assert.fail('should not be here');
                done();
            }).catch((error) => {
                assert.ok(error);
                done();
            });
        });
    });
});
