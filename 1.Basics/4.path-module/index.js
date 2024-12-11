const { createDiffieHellmanGroup } = require('crypto');
const path = require('path');

console.log('Directory name:',path.dirname(__filename));

console.log("File Name :",path.basename(__filename));

console.log('file extention',path.extname(__filename));

const joinPath = path.join('/user','documents','node','projects')

console.log(joinPath);

const resolvePath = path.resolve("user","documents","documents","node","projects")
console.log("Resolve Path:", resolvePath);

const noramilizePath = path.normalize('/user/.documents/../node/project')
console.log('Normailize Path:', noramilizePath);
