
(model.Todo.entityMethods.removeTodo = function() {
	ds.TodoUser.query('todo.ID === :1', this.getKey()).remove();
  this.remove();
}).scope = 'public';

(model.Todo.entityMethods.getUsers = function() {
	return this.assignedTo.userAssigned;
}).scope = 'public';

model.Todo.methods.recordChanges = function() {
		return ds.changeTracking.getChanges(this);
};