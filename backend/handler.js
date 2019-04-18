
function authorize(handler) {
	return function(req, res) {
		if(directory.currentSession.belongsTo('Admin')) {
			return handler(req, res);
		} else {
			res.statusCode = 401;
		}
	};
};

function handleDocument(req, res) {
	return authorize(_handleDocument)(req, res);
}

function _handleDocument(req, res) {
		try {
			var id = generateUUID();
			var part = req.parts[0];
			var filename = ''+ id + '_' + part.name;
			var file = new File(ds.getModelFolder().path + '../../documents/' + filename);
			part.asBlob.copyTo(file, true);
			return filename;
		} catch (err) {
			return err.message;
		}
}
