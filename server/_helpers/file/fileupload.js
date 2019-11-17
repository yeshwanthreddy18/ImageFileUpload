var AWS = require('aws-sdk');
var fs = require('fs');
var uuid = require('node-uuid');
var config = require('../../config/environment');
var s3 = new AWS.S3();
var async = require("async");
AWS.config.update({
    signatureVersion: 'v4',
    apiVersion: '2012-05-04'
});



var FileUploader = (function() {
    function FileUploader() {
        this.aws_access_key_id = config.aws.aws_access_key_id;
        this.aws_secret_access_key = config.aws.aws_secret_access_key;
        AWS.config.update({ accessKeyId: this.aws_access_key_id, secretAccessKey: this.aws_secret_access_key });
    }
    FileUploader.prototype.uploadFiles = function(files, success) {
        var Pictures = [];
        var projectGalaryPictures = [];
        async.forEachOf(files, function(value, key, callback) {
                var t_arr = [];
                t_arr[0] = value;
                FileUploader.prototype.uploadImage(t_arr, function(Error, path) {
                    projectGalaryPictures.push(path);
                    callback();
                });
            }, function(error) {
                console.log(projectGalaryPictures)
                success(null, projectGalaryPictures)
            })
            // files.forEach(function (element) {
            //     Pictures.push(element);
            // });
            // if (Pictures.length > 0)
            //     this.uploadImage(Pictures, function (Error, path) {
            //         console.log(path)
            //     });
    };
    FileUploader.prototype.uploadImage = function(files, success) {
        var uid = uuid.v4();
        var uploadedCount = 0;
        var filesCount = files.length;
        var project = {};
        var element = files[0];
        var fileName = element.originalname;
        var params = {
            Key: element.fieldname + "/" + uid + "__" + fileName,
            Body: element.buffer
        };
        var s3bucket = new AWS.S3({ params: { Bucket: config.aws.bucket_name } });
        var opts = { queueSize: 2, partSize: 1024 * 1024 * 5 };



        var metadata = new AWS.MetadataService();
        metadata.request('/latest/meta-data/iam/security-credentials/', function(err, rolename) {
            if (err) console.log(err);
            console.log(rolename);
        });

        s3bucket.upload(params, opts).
        on('httpUploadProgress', function(evt) {
            console.log('Progress:', evt.loaded, '/', evt.total);
        }).
        send(function(err, data) {
            if (err) success(err, null);
            else success(null, data.Location);
        });
        // s3bucket.upload(params, function(err, data) {
        //     if (err) success(err, null);
        //     else success(null, data.Location);
        // });
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;