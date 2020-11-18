
export class AwsAccount {
    DefaultRegion: string;
    Name : string;
    RoleArn : string;

    constructor(name: string, defaultRegion: string, roleArn: string ){
        this.DefaultRegion = defaultRegion;
        this.Name = name;
        this.RoleArn = roleArn;
    }
}