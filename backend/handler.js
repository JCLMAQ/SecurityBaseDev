function handleDocument(req, res) {
	try {
			var id = generateUUID();
			var part = req.parts[0];
		//	var filename = ''+id+'_'+part.fileName;
			var filename = ''+id+'_'+part.fileName;
			debugger;
			var folder = Folder(FileSystemSync("DOCSTORAGE"));

		//var folder = Folder(ds.getModelFolder().path + '../../documents_storage/');
		    if (!folder.exists) {
		         folder.create();
		    }
		//	var file = new File(ds.getModelFolder().path + '../../documents/' + filename);
			var file = new File(folder.path + filename);
		//	var token = directory.currentSession.promoteWith('Admin');
			part.asBlob.copyTo(file, true);
		//	directory.currentSession.unPromote(token);
			return filename;
		} catch (err) {
		//	directory.currentSession.unPromote(token);
			return err.message;

		}

}

function handlePreviewDocument(req, res) {
  const { id } = req.urlQuery
    .split('&')
    .map(one => one.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  res.headers['Content-Type'] = 'application/json';

  if(!id) {
    return JSON.stringify({
      message: 'L\'ID est obligatoire',
    });
  }

  const todo = ds.Todo(id);

  if(!todo) {
    return JSON.stringify({
      message: 'Todo does not exist',
    });
  }

  res.headers['Content-Type'] = 'application/pdf';
  return todo.doc;
}
