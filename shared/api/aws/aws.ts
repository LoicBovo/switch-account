import { STS } from "aws-sdk";
import { AssumeRoleRequest } from "../../objects/aws/AssumeRoleRequest";

export function AssumeRole(
	assumeRoleRequest: AssumeRoleRequest
): Promise<STS.AssumeRoleResponse> {
	return new Promise((resolve, reject) => {
		let stsClient = new STS();
		stsClient.assumeRole(assumeRoleRequest, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}
