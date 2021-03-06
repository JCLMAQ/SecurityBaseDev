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
	//return authorize(_handleDocument)(req, res);
}


function authorize(handler) {
	return function(req, res) {
		if(directory.currentSession.belongsTo('Admin')) {
			return handler(req, res);
		} else {
			res.statusCode = 401;
		}
	};
};


function _handleDocument(req, res) {
		try {
			var id = generateUUID();
			var part = req.parts[0];
			var filename = ''+ id + '_' + part.name;
			var folder = Folder(ds.getModelFolder().path + '../../documents_storage/');
		        if (!folder.exists) {
		            folder.create();
		        }
		//	var file = new File(ds.getModelFolder().path + '../../documents/' + filename);
			var file = new File(folder + filename);
			part.asBlob.copyTo(file, true);
			return filename;
		} catch (err) {
			return err.message;
		}
}
