var crypto = require('crypto');
var extend = require('util')._extend;

/**
 *
 * 阿里云相关工具包
 *
 * @Ahthor      :   Thonatos.Yang
 * @Statement   :   部分代码拆分自aliyun-sdk
 */

var aliyun = function (options) {

    var obj = {};
    var utils = {};
    var defaults = options || {};

    var _protected = {};


    /**
     * 使用请求参数构造规范化的请求字符串
     * Canonicalized Query String
     *
     * @param clearString
     * @returns {string}
     *
     * @From:   https://docs.aliyun.com/?spm=5176.7616369.9.5.pUOHPW#/pub/mts/API-Reference/requestmethod
     * @From:   https://github.com/aliyun-UED/aliyun-sdk-js/blob/0e005fddf5cf4b1093f8cd41b6052d454ef8fba5/lib/util.js
     */
    utils.topEscape = function (clearString) {

        var x = 0;
        var output = '';
        var regex = /(^[a-zA-Z0-9-_.~]*)/;

        clearString = clearString.toString();

        while (x < clearString.length) {
            var match = regex.exec(clearString.substr(x));
            if (match != null && match.length > 1 && match[1] != '') {
                output += match[1];
                x += match[1].length;
            } else {
                if (clearString[x] == ' ')
                    output += '%20';
                else {
                    var charCode = clearString.charCodeAt(x);
                    var hexVal = charCode.toString(16);
                    output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
                }
                x++;
            }
        }

        return output;
    };

    /**
     * 转换对象为数据
     *
     * @param object
     * @returns {Array}
     */
    utils.objToArray = function (object) {

        var _array = [];
        var _obj = object || {};

        if (typeof object !== 'object') {
            console.log('type err');
        }

        for (var key in _obj) {
            _array.push(key + '=' + utils.topEscape(_obj[key]));
        }

        return _array;
    };

    /**
     * 对数组根据其首字母进行排序
     *
     * @param arr
     * @returns {*}
     */
    utils.sortArray = function (arr) {

        arr.sort(function (a, b) {
            return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
        });

        return arr;
    };

    /**
     * 根据 HMAC-SHA1 算法生成签名字符串
     *
     * @param string
     * @param secret
     * @returns {string}
     */
    utils.hMacSha1 = function (string, secret) {

        var sha1;

        sha1 = crypto.createHmac('sha1', secret);
        sha1.update(string);

        return utils.topEscape(sha1.digest('base64'));
    };

    /**
     * 根据 IOS-8601标准 格式化日期
     *
     * @param date
     * @param fmt
     * @returns {string}
     */
    utils.formatDate = function (date, fmt) {

        fmt = fmt || '%Y-%M-%dT%H:%m:%sZ';

        function pad(value) {
            return (value.toString().length < 2) ? '0' + value : value;
        }

        return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
            switch (fmtCode) {
                case 'Y':
                    return date.getUTCFullYear();
                case 'M':
                    return pad(date.getUTCMonth() + 1);
                case 'd':
                    return pad(date.getUTCDate());
                case 'H':
                    return pad(date.getUTCHours());
                case 'm':
                    return pad(date.getUTCMinutes());
                case 's':
                    return pad(date.getUTCSeconds());
                default:
                    throw new Error('Unsupported format code: ' + fmtCode);
            }
        });
    };

    /**
     * 根据规范构造用于计算签名的字符串
     *
     * @param args
     * @returns {string|*}
     */
    utils.getStringToSign = function (args) {

        var _stringToSign;
        var _queryString;

        // 符号编码
        function percentEncode(str) {
            return str.replace('/', '%2F');
        }

        // 排序后的字符串
        _queryString = utils.sortArray(args.queryArray).join('&');

        //console.log(_queryString);

        _stringToSign =
            args.httpMethod + "&" +
            percentEncode("/") + "&" +
            percentEncode(utils.topEscape(_queryString));

        return _stringToSign;
    };

    /**
     * 生成查询对象
     *
     * @param queryObj
     * @returns {{httpMethod: string, queryArray: (Array|*)}}
     */
    _protected.getQueryObject = function (queryObj) {

        var paramsObj,
            queryArray,
            _httpMethod = "GET",
            _date = new Date();

        paramsObj = {
            'SignatureVersion': '1.0',
            'SignatureMethod': 'HMAC-SHA1',
            'Fommat': defaults.format,
            'Version': defaults.version,
            'AccessKeyId': defaults.accessid,
            'Timestamp': utils.formatDate(_date),
            'SignatureNonce': Math.round(Math.random() * 1000000)
        };

        extend(paramsObj, queryObj);

        queryArray = utils.objToArray(paramsObj);

        return {
            'httpMethod': _httpMethod,
            'queryArray': queryArray
        };

    };

    /**
     * 生成签名字符串
     *
     * @param args
     * @returns {string}
     */
    _protected.getSignatureString = function (args) {

        var _stringToSign = utils.getStringToSign(args);

        //console.log(_stringToSign);

        return utils.hMacSha1(_stringToSign, defaults.accesskey + '&');
    };

    /**
     * 生成查询字符串
     *
     * @param params
     * @returns {string}
     */
    obj.getQueryString = function (params) {

        var queryObject = _protected.getQueryObject(params);
        var signature = _protected.getSignatureString(queryObject);

        //console.log(signature);

        return "http://" + defaults.host + "/?" + 'Signature=' + signature + '&' + queryObject.queryArray.join('&');
    };

    return obj;
};

module.exports = aliyun;