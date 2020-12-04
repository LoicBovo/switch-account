import { LoginAccountInt } from "../config/LoginAccountInt";


export interface LoginFactoryInt {

    CreateObject(mfaSerial: string, name: string, profileName: string, accessKey: string, secretKey:string):LoginAccountInt;

}