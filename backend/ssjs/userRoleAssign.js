

 var u = ds.User.find('email === :1', `jcl.maquinay@gmail.com`);

 u.role = "userTodos";
 u.group = "TodoPage"
  u.save();
