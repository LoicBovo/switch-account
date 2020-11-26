import { CloudAccountInt } from "../../api/config/CloudAccountInt";

export class AwsAccount implements CloudAccountInt {
    DefaultRegion: string;
    Name : string;
    RoleArn : string;

    constructor(name: string, defaultRegion: string, roleArn: string ){
        this.DefaultRegion = defaultRegion;
        this.Name = name;
        this.RoleArn = roleArn;
    }
}