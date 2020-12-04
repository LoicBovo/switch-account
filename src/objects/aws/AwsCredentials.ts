
export class AwsCredential {

    ApiKeyId : string;
    ApiKeySecret : string;
    SessionToken : string;

    constructor(apiKeyId: string, apiKeySecret: string, sessionToken: string){
        this.ApiKeyId = apiKeyId;
        this.ApiKeySecret = apiKeySecret;
        this.SessionToken = sessionToken;
    }
}