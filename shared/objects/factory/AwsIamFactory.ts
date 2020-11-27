import { LoginFactoryInt } from "../../api/factory/LoginFactoryInt";
import { AwsIamAccount } from "../config/AwsIamAccount";

export class AwsIamFactory implements LoginFactoryInt {
    CreateObject(mfaSerial:string, name:string, profileName: string) {
        return new AwsIamAccount(mfaSerial,name,profileName);
    }
}