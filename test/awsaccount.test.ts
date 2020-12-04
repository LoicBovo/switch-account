import { ConfigurationInt } from "../src/shared/api/config/ConfigurationInt";
import { Configuration } from "../src/objects/config/Configuration";


const fileName = "switchAccount.json"
const filePath = `./`;

describe('Command runner', ()=>{
    let config : ConfigurationInt;
    before(()=>{
        config = new Configuration(fileName,filePath);
    });

    it('AddLoginAccount()', ()=>{

    });

});