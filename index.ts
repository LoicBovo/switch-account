#!/usr/local/bin/node

import { Configuration } from "./shared/objects/config/Configuration";
import { AssumeRole } from "./shared/api/aws/aws";
import { WriteCredentialsToFile } from "./shared/api/config/ConfigurationFile";
import readline from "readline";
import os from 'os';

let config = new Configuration("switchAccount.json", `${os.homedir()}/.aws/`);

config.Load();

if (process.argv.length > 3) {
	console.log("reading commands...");
	switch (process.argv[2]) {
		case "add-iam":
			// first arg is mfa. second arg is name
			config.AddAwsIamAccount(process.argv[3], process.argv[4], process.argv[4]);
			break;
		case "add-account":
			config
				.GetAwsIamAccount(process.argv[3])
				.AddAwsAccount(process.argv[4], process.argv[5], process.argv[6]);
			break;
		case "switch":
			let rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			rl.question("Please enter token code: ", (answer) => {

				rl.close();

				AssumeRole(
					config
						.GetAwsIamAccount(process.argv[3])
						.GetAssumeRoleRequest(process.argv[4], answer)
				).then((resp) => {
					WriteCredentialsToFile(resp, process.argv[4]);
				});
			});
			break;
	}
}
