
// Test de login
	//vresult = myLogin('MAQUINAY Jean-Claude', '38LBrdd##S')
	//vresult = myLogin('jcl.maquinay', '38LBrdd##S')
	//vresult = myLogin('SPAM', 'x80JppCVSVRS40')
	//vresult = ldapLogin('SPAM', 'x80JppCVSVRS40')
	//vresult = ldapScan();
	
// Connexion to LDAP
client = ldap.createClient({
        hostname: '172.16.155.21',
        port: 389 //,
        //uuidAttribute: 'objectGUID'
   });
   
// Connexion d'un User (administrateur ou équivalent)
var dn = 'CN=SPAM,OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be';
var password = 'x80JppCVSVRS40';
var user = client.bind(dn, password);

// Search construct for user data
var searchDn = 'OU=USERS,OU=GPO,DC=issep,DC=be';//'OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be';
var result = client.search(searchDn, {filter : "(objectClass=*)", scope : "sub", attributes : ["cn", "name", "initial", "department", "title", "sAMAccountName", "userPrincipalName", "sn", "givenName", "mail", "employeeID","employeeNumber", "mailNickname"]});
result;


//var searchDn = 'OU=USERS,OU=GPO,DC=issep,DC=be';
//var searchFilter = "(objectClass=*)";
//var searchScope ="sub";  // "base";
//var attributes = ["cn", "mail", "employeeID"];
//var result = client.search(searchDn, searchFilter, searchScope, attributes);
//result;
