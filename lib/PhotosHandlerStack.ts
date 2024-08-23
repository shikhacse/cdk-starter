import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Code, Function as lambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda'
import { Fn } from 'aws-cdk-lib';

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBucketArn : string;
}

export class PhotosHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);

  new lambdaFunction(this, 'PhotoHandler', {
    runtime : Runtime.NODEJS_16_X,
    handler : 'index.handler',
    code: Code.fromInline(`
            exports.handler = async (event) => {
              console.log("hello!zxzxc: " + process.env.TARGET_BUCKET)
            };
          `),
    environment: {
      TARGET_BUCKET : props?.targetBucketArn
    }
  })
  }

}

