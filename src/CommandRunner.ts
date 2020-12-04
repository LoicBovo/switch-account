import yargs from "yargs/yargs";
import readline from "readline";
import { AssumeRole } from "./shared/api/aws/aws";
import os from 'os';
import fs from 'fs';
import { ConfigurationInt } from "./shared/api/config/ConfigurationInt";
import { LoginAccountInt } from "./shared/api/config/LoginAccountInt";
import { AwsIamAccount } from "./objects/config/AwsIamAccount";
import { CommandInt } from "./shared/api/command/CommandInt";
import { ADDRCONFIG } from "dns";

let argv : CommandInt;

argv = yargs(process.argv.slice(2)).options({
    iamName: { type: "string" },
	iamProfile: { type: "string" },
	acctName: { type: "string" },
	role: { type: "string" },
	region: { type: "string" },
	iamMfa: { type: "string" },
	accessKey: { type: "string"},
	secretKey: {type: "string"}
}).argv;

export function AddLoginAccount(config: ConfigurationInt) {
	let name: string, mfa: string, profileName: string, accessKey: string, secretKey: string;
	let loginAccount : LoginAccountInt;

	if (!argv.iamName || !argv.iamMfa || !argv.iamProfile || !argv.accessKey || !argv.secretKey)
		throw `argument missing, need to following ones iamName, iamMfa, iamProfile, access key, secretkey`;

	name = argv.iamName;
	mfa = argv.iamMfa;
	profileName = argv.iamProfile;
	accessKey = argv.accessKey;
	secretKey = argv.secretKey;

	loginAccount = new AwsIamAccount(name, mfa, profileName,accessKey, secretKey);

	config.AddLoginAccount(loginAccount);
}

export function AddCloudAccount(config: ConfigurationInt) {
	let iamName:string, role:string, region:string, acctName: string;

	if (!argv.iamName || !argv.role || !argv.region || !argv.acctName)
		throw `argument missing, need to following ones !argv.iamName || !argv.role || !argv.region || !argv.acctName`;

	iamName = argv.iamName;
	role = argv.role;
	region = argv.region;
	acctName = argv.acctName;

	config.GetLoginAccount(iamName).AddAwsAccount(acctName, region, role);
}

export function Switch (config : ConfigurationInt) {
    
    let iamName: string, acctName: string;

    if(argv.iamName) iamName = argv.iamName;
    else if (process.env.defaultIam) iamName = process.env.defaultIam;
    else throw `argument missing, need to following ones !argv.iamName || !argv.acctName or default account iam`;

	if (!argv.acctName)
		throw `argument missing, need to following ones !argv.iamName || !argv.acctName`;

	// write credentials file
	config.WriteCredentialsFile(config
		.GetLoginAccount(iamName).AccessKey, config
		.GetLoginAccount(iamName).SecretKey);


	acctName = argv.acctName;
    
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("Please enter token code: ", (answer) => {
        rl.close();

        AssumeRole(
            config
                .GetLoginAccount(iamName)
                .GetAssumeRoleRequest(acctName, answer)
        ).then((resp) => {
            config.WriteConfigFile(resp, acctName);
        });
	});

}

export function SetDefault() {
    if(!argv.iamName) throw `method requires iamName`;

    fs.writeFileSync(`${os.homedir()}/.aws/.env`, `defaultIam=${argv.iamName}`);
}