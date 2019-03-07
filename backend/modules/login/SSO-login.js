function myLogin(userName, password, passIsKey, infos) {

	if(userName!="" && password=="") {

		if("method" in infos) {

			if(infos.method=="Negotiate") {

				return {

					//userName is login@realm
					ID: userName,
					name: userName,
					belongsTo: ["User"],

					login: infos.login,
					realm: infos.realm,
					method: infos.method
				};
			}
		}
	}

	return false;
}
