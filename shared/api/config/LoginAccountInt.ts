import { AssumeRoleRequest } from "aws-sdk/clients/sts";
import { CloudAccountInt } from "./CloudAccountInt";

export interface LoginAccountInt {
    AwsAccounts: CloudAccountInt[];
    ProfileName: string;
	MfaSerial: string;
    Name: string;

    AddAwsAccount(name: string, defaultRegion: string, roleArn : string) : CloudAccountInt;
    LoadAwsAccounts(awsAccounts:CloudAccountInt[]) : any;
    GetAwsAccount(accountName: string): CloudAccountInt;
    GetAssumeRoleRequest(accountName: string, tokenCode: string): AssumeRoleRequest;
}