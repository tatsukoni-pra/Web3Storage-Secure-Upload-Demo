import { create } from '@web3-storage/w3up-client'
import { filesFromPaths } from 'files-from-path'
import dotenv from 'dotenv';
dotenv.config();

async function upload()
{
  const client = await getClient();
  const file = await filesFromPaths(['sample_images/sample-image.png']);
  const cid = await client.uploadFile(file[0]);
  console.log('cid', cid);
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

await upload()
  .catch(console.error)
  .finally(() => process.exit())
