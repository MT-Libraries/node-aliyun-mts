# node-aliyun-mts

nodejs版本阿里云MTS服务.

实现了 aliyun mt s签名服务以及基础使用方法，具体的使用参数请参考aliyun mts api.

* submit    提交参数调用需要的功能
* callback 可返回json格式的数据

## Usage

- Install 

```
$ npm install node-aliyun-mts
```

- Initialize

```
var mediaTransformService = require('./src/mts');
var mts = new mediaTransformService({
    'accessid': 'testId',
    'accesskey': 'testKeySecret'
});

```

- Submit Operation

```
var callback = function(err,data){

    if(err){
        console.log(err);
        return;
    }
    console.log('Callback: \n',data);
};

/**
 * 查询自定义模板
 *
 * @param params Object:
 *         {
 *              Action       : String    'SearchTemplate'
 *              PageNumber   : Int       1(default)
 *              PageSize     : Int       10(default), max:100
 *              State        : String    All(default) || Normal || Deleted || null
 *         }
 * @param callback || null,
 *         TemplateList AliyunTemplate[ ]
 */
mts.submit({
    Action:'SearchTemplate',
    PageNumber:1,
    PageSize:10,
    State:  'All'
},callback);

/**
 * 提交OSS转码作业
 *
 * @param params Object:
 *         {
 *              Action          : String       'SubmitJobs'
 *              Input           : String       JSON
 *              OutputBucket    : String       BucketName
 *              OutputLocation  : String       'oss-cn-hangzhou'
 *              Outputs         : String       OutputName
 *              PipelineId      : String       Pipeline ID
 *         }
 * @param callback || null,
 *         TemplateList AliyunTemplate[ ]
 */

var inputJSON = {
    "Bucket":"bucket-name",
    "Location":"oss-cn-hangzhou",
    "Object":"original.mov"
};

var outputsJSON = [{
    "OutputObject":"test.mp4",
    "TemplateId":"b608835017cdab8ba40fcb4ae9f25f1c"
}];

mts.submit({
    Action: 'SubmitJobs',
    Input: JSON.stringify(inputJSON),
    OutputBucket:"bucket-name",
    OutputLocation:"oss-cn-hangzhou",
    Outputs:JSON.stringify(outputsJSON),
    PipelineId:"ccad9c34b343490ba04298f09968fa21"
},callback);

```

## Reference

- Api

	[https://docs.aliyun.com/?spm=5176.2020520116.104.1.8KCPTL#/pub/mts/API-Reference/summary](https://docs.aliyun.com/?spm=5176.2020520116.104.1.8KCPTL#/pub/mts/API-Reference/summary)
	
- NPM 

	[https://www.npmjs.com/package/node-aliyun-mts](https://www.npmjs.com/package/node-aliyun-mts)	

## License

The MIT License (MIT)

Copyright (c) 2015 Magic Term Libraries

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



