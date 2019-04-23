function handleDocument(req, res) {
	debugger;
    switch (req.method) {
        case 'GET':
            return downloadDocument(req, res);
        case 'POST':
            return updateDocument(req, res);
        case 'DELETE': {
            return deleteDocument(req, res);
        }
        default:
    } 
}

function updateDocument(req, res) {
	try {
		debugger;
        var old_file;
        var found = false;
        var id = generateUUID();
        var filePayload = req.parts[0];
        var ID = req.parts[1].asText;
        var filename = '' + filePayload.fileName + '_' +id  ;
        var folder = Folder(ds.getModelFolder().path + '../../documents_storage/');
        if (!folder.exists) {
            folder.create();
        }
        var file = new File('' + folder.getURL() + filename);
        filePayload.asBlob.copyTo(file, true);
        
        // Pour sauver les infos dans une table
        
        var document = ds.DocFIle(ID) || new ds.DocFile();
        if (document.docFile) {
            old_file = new File('' + folder.getURL() + document.docFile);
            if (file.exists) {
                found = true;
                old_file.remove();
            }
        }
        document.docFile = filename;
        document.fileName = filePayload.fileName;
        document.save();
        
        
        return JSON.stringify({filename: filename, found: found});
    } catch (err) {
        return err.message;
    }
}

function deleteDocument(req, res) {
	try {
        var url_parts = req.urlPath.split('/');
        var ID = url_parts[url_parts.length - 2];
        
        var document = ds.DocFile(ID);
        
        var folder = Folder(ds.getModelFolder().path + '../../documents_storage/');
        if (!folder.exists) {
            throw new Error('Invalid Path File');
        }
        var file = new File('' + folder.getURL() + document.docFile);
        if (file.exists) {
            file.remove();
            document.docFile = '';
            document.fileName = '';
            document.save();
        } else {
            throw new Error('File not found on the server');
        }
        return JSON.stringify(document);
    } catch (err) {
        return err.message;
    }
}

function downloadDocument(req, res) {
	try {
        var url_parts = req.urlPath.split('/');
        var ID = url_parts[url_parts.length - 2];
        var document = ds.DocFile(ID);
        var folder = Folder(ds.getModelFolder().path + '../../documents_storage/');
        if (!folder.exists) {
            throw new Error('Invalid Path File');
        }
        var file = File('' + folder.getURL() + document.docFile);
        if (file.exists) {
            return file.toBuffer().toBlob();
        } else {
            throw new Error('File not found on the server');
        }
    } catch (err) {
        return err.message;
    }
}