
import { AssumeRoleResponse } from 'aws-sdk/clients/sts';
import fs from 'fs';
import os from 'os';

export function WriteCredentialsToFile(assumeRoleResponse: AssumeRoleResponse, profileName: string) {
    let config: string;

    config = 
    `[profile ${profileName}]
aws_access_key_id=${assumeRoleResponse.Credentials?.AccessKeyId}
aws_secret_access_key=${assumeRoleResponse.Credentials?.SecretAccessKey}
aws_session_token=${assumeRoleResponse.Credentials?.SessionToken}`;

    console.info('overwritting files in config');
    fs.writeFileSync(`${os.homedir()}/.aws/config`,config);
}