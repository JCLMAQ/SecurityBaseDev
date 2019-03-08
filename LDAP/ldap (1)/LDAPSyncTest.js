var remoteLDAP = 
{
   "url": "ldap://172.16.155.21",
   "uuidAttribute": "objectGUID",
   "userBind": "CN=SPAM,OU=NonRespOutlook,OU=NORMAUX,OU=USERS,OU=GPO,DC=issep,DC=be",
   "password": "x80JppCVSVRS40",
   "baseDN": "OU=USERS,OU=GPO,DC=issep,DC=be",
   "priority" : "remote"
};


try{
    directory.sync(remoteLDAP);
}
catch(e) {
    console.log(e)
};