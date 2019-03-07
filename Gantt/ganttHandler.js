// GanttHandler functions

function addTask(req, res) {
    var task = parseBody(req.body)
    var newTask = ds.GanttTask.fromArray([task])
    res.contentType = "text/xml"
    res.body = '<data><action type="inserted" sid="" tid="' + newTask.ID + '" /></data>'
}

function editTask(req, res) {
	var task = parseBody(req.body)
	var oldTask = ds.GanttTask.find("ID = :1",req.urlPath.split("/")[3])
	if(req.method == "PUT") oldTask.editT(task);
	if(req.method == "DELETE") oldTask.remove();
    res.contentType = "text/xml"
    res.body = '<data><action type="updated" sid="' + oldTask.ID + '" tid="' + oldTask.ID + '" /></data>'
}

function addLink(req, res) {
    var link = parseBody(req.body)
    var newTask = ds.GanttLink.fromArray([link])
    res.contentType = "text/xml"
    res.body = '<data><action type="inserted" sid="" tid="' + newTask.ID + '" /></data>'
}

function editLink(req, res) {
	var link = parseBody(req.body)
	var oldLink = ds.GanttLink.find("ID = :1",req.urlPath.split("/")[3])
	if(req.method == "PUT") oldLink.editL(link);
	if(req.method == "DELETE") oldLink.remove();
    res.contentType = "text/xml"
    res.body = '<data><action type="updated" sid="' + oldLink.ID + '" tid="' + oldLink.ID + '" /></data>'
}

function parseBody(data) {
	var formatter = require("formatting");
    var pairs = data.toString().split('&');
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
        if(pair[0] == "start_date") result[pair[0]] = parseDate(result[pair[0]].split(' ')[0],{ format: "dd-mm-yy" });
    });
    return result;
}