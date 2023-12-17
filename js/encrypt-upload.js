import { create } from '@web3-storage/w3up-client'
import { filesFromPaths } from 'files-from-path'
import openpgp from 'openpgp';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function upload()
{
  const client = await getClient();

  // encrypt file
  const encrypted = await encryptFile();
  const tempFilePath = 'tmp-sample-image.png';
  fs.writeFileSync(tempFilePath, new Uint8Array(encrypted));

  // upload encrypted file
  const encryptedFile = await filesFromPaths([tempFilePath]);
  const cid = await client.uploadFile(encryptedFile[0]);
  console.log('cid', cid);

  // clean up tmp file
  fs.unlinkSync(tempFilePath);
}

async function getClient()
{
  const client = await create();
  const account = await client.login(process.env.LOGIN_ADDRESS);
  const did = process.env.DID;
  await account.provision(did);
  await client.setCurrentSpace(did);
  return client;
}

async function encryptFile() {
  // Public keys
  const publicKeysArmored = [
    fs.readFileSync(process.env.PUBLIC_KEY1_PATH, 'utf8'),
    fs.readFileSync(process.env.PUBLIC_KEY2_PATH, 'utf8'),
  ];
  const publicKeys = await Promise.all(
    publicKeysArmored.map((armoredKey) => openpgp.readKey({ armoredKey }))
  );

  // File data
  const fileData = fs.readFileSync('sample_images/sample-image.png');
  const fileMessage = await openpgp.createMessage({ binary: fileData });

  const encrypted = await openpgp.encrypt({
    message: fileMessage,
    encryptionKeys: publicKeys,
    format: "binary",
  });

  return encrypted;
}

await upload()
  .catch(console.error)
  .finally(() => process.exit())
