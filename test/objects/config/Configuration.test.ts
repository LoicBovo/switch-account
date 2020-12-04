import { Configuration } from '../../../src/objects/config/Configuration';
import { expect } from 'chai';
const fileName = "switchAccount.json"
const filePath = `./`;

describe('configuration', ()=> {
    
    it('should instantiate', ()=> {
        let config = new Configuration(fileName, filePath);

        expect(config.FileName).to.be.equal(fileName);
        expect(config.FilePath).to.be.equal(filePath);
        expect(config.FileFullName).to.be.equal(filePath + fileName);

    })
});