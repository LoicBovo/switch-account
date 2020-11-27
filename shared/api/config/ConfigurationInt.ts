import { LoginAccountInt } from "./LoginAccountInt";
import {STS} from 'aws-sdk';
import { LoginFactoryInt } from "../factory/LoginFactoryInt";

export interface ConfigurationInt {
    LoginAccounts: LoginAccountInt[];
	FileName: string;
	FilePath: string;
    FileFullName: string;

    Load(loginFactory: LoginFactoryInt): void;
	Save(): void;
    AddLoginAccount(loginAccount : LoginAccountInt) : void;
    GetLoginAccount(name:string): LoginAccountInt;
    WriteCredentialsToFile(assumeRoleResponse: STS.AssumeRoleResponse,profileName: string) : void;
}
