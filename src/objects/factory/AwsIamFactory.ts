import { LoginFactoryInt } from "../../shared/api/factory/LoginFactoryInt";
import { AwsIamAccount } from "../config/AwsIamAccount";

export class AwsIamFactory implements LoginFactoryInt {
    CreateObject(mfaSerial:string, name:string, profileName: string, accessKey: string, secretKey: string) {
        return new AwsIamAccount(mfaSerial,name,profileName, accessKey, secretKey);
    }
}