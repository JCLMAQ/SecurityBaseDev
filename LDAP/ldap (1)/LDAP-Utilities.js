//LDAP Utilities by JCM

// LDAP module activation
var ldap = require('waf-ldap'); //Activer le module LDAP de WAF
// Parameters for the LDAP connexion
ldapSelect = ds.ServerParam.query("typeServer == LDAP");
if (ldapSelect.length==1) {
	var dnSuffix = ldapSelect.dnSuffix;
	var ldapIPAdress = ldapSelect.ipServer;
	var ldapPortNumber = ldapSelect.portNumber;
	var ldapsslPortNumber = ldapSelect.sslPortNumber;
	var ldapCNUserName = ldapSelect.userName;
	var ldapCNPassWord = ldapSelect.userPassword;
	var ldapssl = false;
	if (ldapsslPortNumber !=null) {
		ldapPortNumber = ldapsslPortNumber;
		ldapssl = true;
	}	
	
// Create the LDAP client for the LDAP server
var ldapClient = ldap.createClient({
       hostname: ldapIPAdress,
       port: ldapPortNumber,
       ssl: ldapssl,
       uuidAttribute: "entryUUID"
    });
       
// Binding a admin user to LDAP
var dn = 'CN='+ ldapCNUserName + ' ,'+dnSuffix;  
ldapClient.bind(dn, ldapCNPassWord);

// Search construct for user data
//var searchDn = 'OU=USERS,OU=GPO,DC=issep,DC=be' ;
//var searchDn ='OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be';
var searchDn = ldapSelect.dnSuffix;
var result = ldapClient.search(searchDn, {filter : "(objectClass=*)", scope : "sub" , attributes : ["cn", "name", "initials" , "department", "title", "sAMAccountName" , "userPrincipalName", "sn", "givenName" , "mail", "employeeID" ,"employeeNumber", "mailNickname" ]});
//result;

// Delete all past entry
toDelete = ds.LDapUser.allEntities();
toDelete.remove();
// Save ldap users to Datastore classes
newEntities = ds.LDapUser.fromArray(result);
//newEntities;
//Cleaning useless entries
badCollection = ds.LDapUser.query("sAMAccountName=null"); // and department=null");
badCollection.remove();
//Cleaning Useless entries (with no title)
titlenull = ds.LDapUser.query("title=null");
titlenull.remove();
matriculnull = ds.LDapUser.query("employeeID=null");
matriculnull.remove();

results = ds.LDapUser.allEntities();
results;
} else {
	// Error to handle
	// No LDAp data available

}

