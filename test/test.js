/**
 *
 * test.
 *
 * @project     node-aliyun-mts
 * @datetime    12:04 - 15/11/7
 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
 * @copyright   Thonatos.Yang <https://www.thonatos.com>
 *
 */

var should = require('should');

var mediaTransformService = require('../src/mts');
var mts = new mediaTransformService({
    'accessid': 'testId',
    'accesskey': 'testKeySecret'
});


describe('Array',function(){

    // Init
    describe('Init',function(){

        it('err should be null',function(){
            mts.submit({}, function (err, data) {
                err.should.equal(null);
            });
        });
    });

    describe('Data',function(){

        it('err should be null',function(){
            mts.submit({}, function (err, data) {
                data.should.be.an.instanceOf(Object);
            });
        });
    });


});