import { LoginAccountInt } from "../config/LoginAccountInt";


export interface LoginFactoryInt {

    CreateObject(mfaSerial: string, name: string, profileName: string):LoginAccountInt;

}