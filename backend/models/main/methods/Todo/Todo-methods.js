
(model.Todo.entityMethods.removeTodoUser = function() {
	ds.TodoUser.query('todo.ID === :1', this.getKey()).remove();
  this.remove();
}).scope = 'public';

(model.Todo.entityMethods.getUsers = function() {
	return this.assignedTo.userAssigned;
}).scope = 'public';

(model.Todo.entityMethods.getDoc = function() {
	// Add your code here;
	var dataFolder = ds.getDataFolder(); 
    var myFolder = Folder(dataFolder.path+"docs/"); // gets the path for the files
    var file1 = File(myFolder, this.docName+".jpg"); //jpg or pdf files 
    var file2 = File(myFolder, this.docName+".pdf"); //warning: will not work if uppercase extensions
    if ((file1.exists) || (file2.exists))  { // we have a file
        if (file1.exists) { // we have a jpeg file        
            var file = file1;
            var mimeType = "image/jpeg";          
        }
        else { // we have a pdf file
            var file = file2;
            var mimeType = "application/pdf";
         }
        return { 
            HTTPStream: file, // triggers a binary return
            headers: {
                   'Content-Type': mimeType  //defines the content type header
            }
        }
    }
    else // no corresponding file
     {
         return null;
     }     
}).scope="public";
