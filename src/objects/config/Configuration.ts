import fs from "fs";
import os from "os";

import { AssumeRoleResponse } from "aws-sdk/clients/sts";

import { AwsIamAccount } from "./AwsIamAccount";
import { ConfigurationInt } from "../../shared/api/config/ConfigurationInt";
import { LoginAccountInt } from "../../shared/api/config/LoginAccountInt";
import { LoginFactoryInt } from "../../shared/api/factory/LoginFactoryInt";

export class Configuration implements ConfigurationInt {
	LoginAccounts: LoginAccountInt[];
	FileName: string;
	FilePath: string;
	FileFullName: string;
	constructor(fileName: string, filePath: string) {
		this.LoginAccounts = [];
		this.FileName = fileName;
		this.FilePath = filePath;
		this.FileFullName = this.FilePath + this.FileName;
	}

	Load(loginFactory: LoginFactoryInt) {
		const data = fs.readFileSync(this.FileFullName);

		const awsIamAccounts = JSON.parse(data.toString());

		awsIamAccounts.forEach((element: LoginAccountInt) => {
			this.LoginAccounts.push(
				loginFactory.CreateObject(element.MfaSerial, element.Name, element.ProfileName, element.AccessKey, element.SecretKey)
			);
			this.LoginAccounts[this.LoginAccounts.length - 1].LoadAwsAccounts(
				element.AwsAccounts
			);
		});
	}
	Save() {
		fs.writeFile(
			this.FileFullName,
			JSON.stringify(this.LoginAccounts),
			(err) => {
				console.error(err);
				throw err;
			}
		);
	}

	AddLoginAccount(
		loginAccount : LoginAccountInt
	): LoginAccountInt {
		
		this.LoginAccounts.push(loginAccount);

		return this.LoginAccounts[this.LoginAccounts.length - 1];
	}

	GetLoginAccount(name: string): LoginAccountInt {
		for (let i = 0; i < this.LoginAccounts.length; i++) {
			if (this.LoginAccounts[i].Name == name) {
				return this.LoginAccounts[i];
			}
		}

		throw `account ${name} does not exist`;
	}

	WriteCredentialsFile(accessKey:string, secretKey:string) {
		let credentials: string;
		credentials= `[default]
aws_access_key_id=${accessKey}
aws_secret_access_key=${secretKey}`;

		fs.writeFileSync(`${os.homedir()}/.aws/credentials`, credentials);
	}

	WriteConfigFile(
		assumeRoleResponse: AssumeRoleResponse,
		profileName: string
	) {
		let config: string;

		config = `[profile ${profileName}]
aws_access_key_id=${assumeRoleResponse.Credentials?.AccessKeyId}
aws_secret_access_key=${assumeRoleResponse.Credentials?.SecretAccessKey}
aws_session_token=${assumeRoleResponse.Credentials?.SessionToken}`;

		console.info("overwritting files in config");
		fs.writeFileSync(`${os.homedir()}/.aws/config`, config);
	}
}
