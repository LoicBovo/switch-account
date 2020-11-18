import { AwsIamAccount } from "./AwsIamAccount";
import fs from "fs";

export class Configuration {
	AwsIamAccounts: AwsIamAccount[];
	FileName: string;
	FilePath: string;
	FileFullName: string;
	constructor(fileName: string, filePath: string) {
		this.AwsIamAccounts = [];
		this.FileName = fileName;
		this.FilePath = filePath;
		this.FileFullName = this.FilePath + this.FileName;
	}

	Load() {
        const data = fs.readFileSync(this.FileFullName);

        const awsIamAccounts = JSON.parse(data.toString());
        
        awsIamAccounts.forEach((element:AwsIamAccount) => {
            this.AwsIamAccounts.push(new AwsIamAccount(element.MfaSerial,element.Name, element.ProfileName));
            this.AwsIamAccounts[this.AwsIamAccounts.length-1].LoadAwsAccounts(element.AwsAccounts);
        });
	}
	Save() {
		fs.writeFile(
			this.FileFullName,
			JSON.stringify(this.AwsIamAccounts),
			(err) => {
				console.error(err);
				throw err;
			}
		);
    }
    
    AddAwsIamAccount(name:string, mfaSerial: string, profileName: string) : AwsIamAccount {
        
        let awsIamAccount = new AwsIamAccount(mfaSerial,name, profileName);

        this.AwsIamAccounts.push(awsIamAccount);

        return this.AwsIamAccounts[this.AwsIamAccounts.length-1]
    }
    GetAwsIamAccount(name:string): AwsIamAccount {

        for(let i = 0; i < this.AwsIamAccounts.length; i++){
            if(this.AwsIamAccounts[i].Name == name){
                return this.AwsIamAccounts[i];  
            } 
        }

        throw `account ${name} does not exist`;
	}
}
