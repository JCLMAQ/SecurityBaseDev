
model.Todo.events.init = function(event) {
 this.done = false;
};

model.Todo.events.restrict = function(event) {
	return ds.Todo.query("userID == :1 or users.ID== :1 or public == :2", directory.currentUser.ID, true);
	// TODO : add the selection on the attributed user or the "public" todo
};

model.Todo.events.save = function(event) {
	debugger;
	this.userID = directory.currentUser.ID;
	// var test = ds.Todo.recordChanges();
};