/**
 *
 * test.js.
 *
 * @project     node-aliyun-mts
 * @datetime    23:05 - 15/10/22
 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
 * @copyright   Thonatos.Yang <https://www.thonatos.com>
 *
 */

var mediaTransformService = require('./src/mts');
var mts = new mediaTransformService({
    'accessid': 'testId',
    'accesskey': 'testKeySecret'
});

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
