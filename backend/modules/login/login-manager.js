exports.login = function login(username, password, passIsKey, infos) {
// SSO login user name not null but password null
if(username!="" && password=="") {
	if("method" in infos) {
			if(infos.method=="Negotiate") {
				return {
					//userName is login@realm
					ID: username,
					name: username,
					belongsTo: ["BasicUsers"],

					login: infos.login,
					realm: infos.realm,
					method: infos.method
				};
			}
		}		
	} else {
		 ha1keyCode = "";
		  const u = ds.User.find('email === :1', username);		  
		  if (u) {
		    ha1keyCode = directory.computeHA1(u.ID, password);
		  }
		  // if (!u || u.password !== password) { // login sans Hash
		  if (!u || u.HA1Key !== ha1keyCode) {
		    return false;
		    return {
		      // Error code returned
		      error: 548,
		      // Error text returned
		      errorMessage: 'Authentication failed. Login or Password maybe wrong.'
		    };
		  }	  
			var roles = [];
		  if(u.roles === null) {
		  	roles[0] = "BasicUsers"
		  } else {
		  	roles = u.roles ? u.roles.split(',') : [];
		  }

		  return {
		    ID: u.getKey(),
		    name: u.email,
		    fullName: u.fullName,
		    belongsTo: roles,
		    storage: {
		      ID: u.getKey(),
		      group: roles,
		      username: u.username,
		      name: u.name
		    }
		  };
		}
}
	
	
 
