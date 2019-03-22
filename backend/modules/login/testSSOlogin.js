var results;

var curSession = currentSession();
var utilisateur = curSession.user;
if(curSession!=null) {
	results = curSession.user.name;
}

results;