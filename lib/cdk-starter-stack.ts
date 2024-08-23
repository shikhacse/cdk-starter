import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
    constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, "L3Bucket", {
      lifecycleRules :[{
        expiration: cdk.Duration.days(expiration)
      }]
    })
}
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an s3 bucket 3 ways: 
   new CfnBucket(this, 'L1Bucket', {
     lifecycleConfiguration : {
      rules : [{
        expirationInDays : 1,
        status: 'Enabled'
      }]
     }
    })

      const duration = new cdk.CfnParameter(this, 'duration', {
        default: 6,
        minValue:1,
        maxValue:10,
        type:"Number"
       })
       
   const MyL2Bucket =  new Bucket(this, 'L2Bucket', {
      lifecycleRules:[{
        expiration: cdk.Duration.days(duration.valueAsNumber)
      }]
    })

       new L3Bucket(this, 'L3Bucket', 3)

       new cdk.CfnOutput(this, 'L3Bucket', {
        value : MyL2Bucket.bucketName
       })

     
  }
}
