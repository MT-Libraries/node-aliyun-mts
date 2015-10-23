var extend = require('util')._extend;
var aliyun = require('./lib/aliyun');
var api = require('./lib/api');

var mts = function (options) {

    var defaults = {
        'host': 'mts.aliyuncs.com',
        'accessid': 'testId',
        'accesskey': 'testKeySecret',
        'version': '2014-06-18',
        'format': 'json'
    };

    extend(defaults, options);    

    this.aliyun = aliyun(defaults);
    this.request = api(this.aliyun).request;

};

mts.prototype.submit = function (params, callback) {
    this.request(params, callback);
};


module.exports = mts;