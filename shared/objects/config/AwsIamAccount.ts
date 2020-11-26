import { LoginAccountInt } from "../../api/config/LoginAccountInt";
import { AssumeRoleRequest } from "../aws/AssumeRoleRequest";
import { AwsAccount } from "./AwsAccount";

export class AwsIamAccount implements LoginAccountInt {
    AwsAccounts: AwsAccount[];
    ProfileName: string;
	MfaSerial: string;
    Name: string;
    
	constructor(mfaSerial: string, name: string, profileName: string) {
		this.AwsAccounts = [];
        this.MfaSerial = mfaSerial;
        this.Name = name;
        this.ProfileName = profileName;
    }
    
    AddAwsAccount(name: string, defaultRegion: string, roleArn : string) : AwsAccount {
        this.AwsAccounts.push(new AwsAccount(name, defaultRegion,roleArn));

        return this.AwsAccounts[this.AwsAccounts.length-1];
    }

    LoadAwsAccounts(awsAccounts:AwsAccount[]) {
        awsAccounts.forEach((value: AwsAccount)=>{
            this.AwsAccounts.push(new AwsAccount(value.Name,value.DefaultRegion,value.RoleArn));
        });
    }
    GetAwsAccount(accountName: string): AwsAccount {
        
        for(let i = 0; i< this.AwsAccounts.length; i++){
            if(this.AwsAccounts[i].Name == accountName) return this.AwsAccounts[i];
        }
        
        throw `no aws account found with the name ${accountName}`
    }
    GetAssumeRoleRequest(accountName: string, tokenCode: string): AssumeRoleRequest {

        let awsAccount = this.GetAwsAccount(accountName);
        let assumeRoleRequest = new AssumeRoleRequest(awsAccount.RoleArn,this.ProfileName,this.MfaSerial,tokenCode);
        return assumeRoleRequest;
    }
}
