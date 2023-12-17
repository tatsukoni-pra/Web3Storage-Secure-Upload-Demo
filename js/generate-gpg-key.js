import * as openpgp from 'openpgp';
import fs from 'fs';

const { privateKey, publicKey } = await openpgp.generateKey({
  type: 'ecc',
  curve: 'curve25519',
  userIDs: [{
    name: process.env.GPG_USER_NAME,
    email: process.env.GPG_USER_EMAIL
  }],
  format: 'armored'
});

console.log(privateKey);
console.log(publicKey);
fs.writeFileSync('private-key.key', privateKey);
