//var ldap, dnSuffix;

//ldap = require('waf-ldap');

//dnSuffix = ',OU=Users,DC=issep,DC=be';

//function myLogin(userName, password) {
//    var client, dn, currentTime, user;

//    client = ldap.createClient({
//        hostname: '172.16.155.21',
//        port: 389
//    });

//    dn = 'CN=' + userName + dnSuffix;
//    client.bind(dn, password);
//    user = client.getUser(dn);
//    if (user != null) {
//        currentTime = new Date();
//        return {
//            ID: user.getUUID(),
//            name: userName,
//            fullName: "User " + userName,
//            belongsTo: user.getGroups(),
//            storage: {
//                time: currentTime,
//                access: "Guest access"
//            }
//        }
//    } else {
//        return {
//            error: 1024,
//            errorMessage: "invalid login to the LDAP server!"
//        }
//    }
//}


// To place within the required file ...

ldap = require('waf-ldap');
// dnSuffix = ',CN=Users,DC=LDAPTest,DC=local';
//dnSuffix = ',OU=Users,OU=GPO,DC=issep,DC=be';
// dnSuffix = ',OU=USERS,OU=GPO,DC=issep,DC=be';
function ldapScan(){
   var userName = 'SPAM';
   var password = 'x80JppCVSVRS40';
   var ldap, dnSuffix;
   client = ldap.createClient({
        hostname: '172.16.155.21',
        port: 389,
        uuidAttribute: 'objectGUID'
   });
   dnSuffix = 'OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be';
   var client, dn, currentTime, user;
   
   dn = 'CN=' + userName + ','+ dnSuffix;
   try{
       client.bind(dn, password);
      	var searchDN = 'OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be';
		var searchFilter =""; //"(objectClass=*)";
		var searchScope = "sub";
		var attributes = ["cn", "mail", "objectClass"];
		users = client.search(searchDN, searchFilter, searchScope, attributes);
//var result = ldapCNUserName.search(searchDN);
//result = ldapClient.search(searchDN, searchFilter, searchScope, attributes);
       
       
//       user = client.getUser(dn);
//       currentTime = new Date();
       return {
//           ID: user.getUUID(),
//           name: userName,
//           fullName: "User " + userName,
//           belongsTo: user.getGroups(),
//           storage: {
//               time: currentTime,
//               access: "LDAP access"
//           }
       }
   }
   catch(e)
   {
    return {
             error: 1024,
             errorMessage: "Invalid login to the LDAP server!"
       }
   }	
	
}

function ldapLogin(userName, password) {
   var ldap, dnSuffix;
   ldap = require('waf-ldap');
   dnSuffix = 'OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be';
   var client, dn, currentTime, user;
   client = ldap.createClient({
        hostname: '172.16.155.21',
        port: 389,
        uuidAttribute: 'objectGUID'
   });
   dn = 'CN=' + userName + ','+ dnSuffix;
   try{
       client.bind(dn, password);
       user = client.getUser(dn);
       currentTime = new Date();
       return {
           ID: user.getUUID(),
           name: userName,
           fullName: "User " + userName,
           belongsTo: user.getGroups(),
           storage: {
               time: currentTime,
               access: "LDAP access"
           }
       }
   }
   catch(e)
   {
    return {
             error: 1024,
             errorMessage: "Invalid login to the LDAP server!"
       }
   }
   }


//function myLogin(userName, password) {
//    var ldap, dnSuffix;
//	ldap = require('waf-ldap');
//	dnSuffix = 'OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be';
//	var client, dn, currentTime, user, password;
//    client = ldap.createClient({
//       hostname: '172.16.155.21',
//        port: 389
//    });
//    dn = 'CN='+ userName + ','+dnSuffix;
//    client.bind(dn, password);
//   // dn = 'CN='+ userName + dnSuffix;
//    user = client.getUser(dn);
//    if (user != null) {
//        currentTime = new Date();
//        return {
//            ID: user.getUUID(),
//            name: userName,
//            fullName: "User " + userName,
//            belongsTo: user.getGroups(),
//            storage: {
//                time: currentTime,
//                access: "Guest access"
//            }
//        }
//    } else {
//        return {
//            error: 1024,
//            errorMessage: "invalid login to the LDAP server!"
//        }
//    }
//}
