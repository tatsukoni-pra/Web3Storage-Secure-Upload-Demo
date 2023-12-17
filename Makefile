# Makefile

js/node_modules: js/package.json js/package-lock.json
	cd js && npm ci

upload: js/node_modules
	node js/upload.js

encrypt-upload: js/node_modules
	node js/encrypt-upload.js

download:
	sh cmd/download.sh $(URL) $(DOWNLOAD_FILE_NAME)

decrypt:
	sh cmd/decrypt.sh $(ENCRIPTED_FILE_NAME) $(DECRYPTED_FILE_NAME)

delete:
	sh cmd/delete.sh $(CID)

generate-gpg-key: js/node_modules
	node js/generate-gpg-key.js
	sh cmd/import_gpg_key.sh
