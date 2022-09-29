import S3 from 'react-aws-s3'
import AWSS3UploadAsh from 'aws-s3-upload-ash'

const config = {
  bucketName: 'beta.agenvirtualx.com',
  dirName: 'assets/images/portfolio/upload' /* optional */,
  region: 'ap-southeast-1',
  accessKeyId: 'AKIAZANAVVER6IQUFCX4',
  secretAccessKey: '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',
  // s3Url: 'http://beta.agenvirtualx.com.s3-website-ap-southeast-1.amazonaws.com/' /* optional */,
  s3Url: 'https://s3.ap-southeast-1.amazonaws.com/beta.agenvirtualx.com' /* optional */,
}

const ReactS3Client = new S3(config)

export default ReactS3Client
