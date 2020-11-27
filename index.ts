#!/usr/local/bin/node

import os from "os";
import * as dotenv from 'dotenv';

import { Configuration } from "./shared/objects/config/Configuration";
import { AddLoginAccount, AddCloudAccount, Switch, SetDefault } from "./CommandRunner";
import { ConfigurationInt } from "./shared/api/config/ConfigurationInt";
import { AwsIamFactory } from "./shared/objects/factory/AwsIamFactory";

dotenv.config({ path: `${os.homedir()}/.aws/.env` });
const fileName = "switchAccount.json"
const filePath = `${os.homedir()}/.aws/`;
let config : ConfigurationInt;

// create aws configuration type
config = new Configuration(fileName, filePath);

// load existing configuration if any
config.Load(new AwsIamFactory());

switch (process.argv[2]) {
	case "add-iam":
		AddLoginAccount(config);
		break;
	case "add-account":
		AddCloudAccount(config);
		break;
	case "set-default":
		SetDefault();
		break;
	default:
		Switch(config);
		break;
}
