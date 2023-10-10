
const AWS = require('aws-sdk');

const uploadFiles = async (file) => {
    AWS.config.update({
        accessKeyId: "AKIASLSDUFBYNDK6HP47",
        secretAccessKey: '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',
        region: "ap-south-1"
    });

    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    const uploadParams = {
        Bucket: "newbucketketan",
        Key: `abc/${ file.originalname }`,
        Body: file.buffer,
        ACL: 'public-read'
};

try {
    const data = await s3.upload(uploadParams).promise();
    return data.Location;
} catch (error) {
    return { error: error.message }
}
};

module.exports = {
    uploadFiles
};