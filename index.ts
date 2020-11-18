#!/usr/local/bin/node

import { Configuration } from "./shared/objects/config/Configuration";
import os from "os";
import { AddIamAccount, AddAccount, Switch, SetDefault } from "./CommandRunner";
import * as dotenv from 'dotenv';

dotenv.config({ path: `${os.homedir()}/.aws/.env` });

let config = new Configuration("switchAccount.json", `${os.homedir()}/.aws/`);

config.Load();

switch (process.argv[2]) {
	case "add-iam":
		AddIamAccount(config);
		break;
	case "add-account":
		AddAccount(config);
		break;
	case "set-default":
		SetDefault();
		break;
	default:
		Switch(config);
		break;
}
