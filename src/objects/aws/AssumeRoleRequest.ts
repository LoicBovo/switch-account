import { STS } from 'aws-sdk';

export class AssumeRoleRequest implements STS.AssumeRoleRequest {
    RoleArn: string;
    RoleSessionName: string;
    SerialNumber: string;
    TokenCode: string;

    constructor(roleArn: string, roleSessionName: string, mfaSerialNumber: string, tokenCode: string){
        this.RoleArn = roleArn;
        this.RoleSessionName = roleSessionName;
        this.SerialNumber=mfaSerialNumber
        this.TokenCode=tokenCode;
    }
}