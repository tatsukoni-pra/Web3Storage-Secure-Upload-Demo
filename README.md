# Set up
You need some setup steps the first time you run it.

## Install
You need Node version 18 or higher, with NPM version 7 or higher.<br>
Additionally, you need the `@web3-storage/w3cli` package and some command line tools to run gpg commands.

```shell
node --version && npm --version
npm install -g @web3-storage/w3cli
brew install gpg pinentry-mac gpg-agent # For MacOS
```

## Authentication to Web3.storage
After installation, authentication to Web3.storage is required in advance to use w3 command.<br>
Please refer to [the official documentation](https://web3.storage/docs/w3cli/#create-your-first-space) for details.

## Create .env

```shell
cp .env.example .env
```

And set each environment variable value.

# Usage
You can perform each operation through the make command.

```shell
# Upload file to Web3.Storage
make upload

# Encript and upload file to Web3.Storage
make encrypt-upload

# Download file from Web3.Storage
make download URL=<URL for the w3s.link gateway> DOWNLOAD_FILE_NAME=<arbitrary file name>

# Delete target file of web3.storage
make delete CID=<target file CID>

# Decrypt encripted file
make decrypt ENCRIPTED_FILE_NAME=<encripted file name> DECRYPTED_FILE_NAME=<arbitrary file name>

# Generate and set up gpg key to your PC
make generate-gpg-key
```

# Reference
- https://web3.storage/docs/
