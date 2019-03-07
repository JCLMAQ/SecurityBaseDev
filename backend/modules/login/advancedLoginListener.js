function securityLogin(userName, password, passIsKey, infos) //advanced login listener
{
		//Traditional login
        var theUser = directory.internalStore.User({
            name: userName
        });
        if (theUser != null) //user exists in the directory
        return false; // allow directory authentication
        else // use data from the project for login
        { //default will be to reject login
            var result = {
                error: 1024,
                errorMessage: 'Invalid Login'
            };
            var securityDs = solution.getApplicationByName("Security").ds;
            var theUser = securityDs.User({
                login: userName
            }); // search the User by login
            if (theUser != null) // if a user was found in the DB
            {
                // see of the stored hash value is correct
                var dircomp = directory.computeHA1(theUser.ID, password);
                if (theUser.HAKey === directory.computeHA1(theUser.ID, password))
                //if (theUser.validatePassword(password)) 
                {
                    var theGroups = [];
                    var putIntoStorage = {
                        myID: theUser.ID
                    };
                    switch (theUser.accessLevel) {
                    case 1:
                        theGroups = ['Admin'];
                        break;
                    case 2:
                        theGroups = ['Manager'];
                        break;
                    case 3:
                        theGroups = ['Worker'];
                        break;
                    case 4:
                        theGroups = ['Reader'];
                        break;
                    }
                    currentConnectTime = new Date();
                    result = {
                        ID: theUser.ID,
                        name: theUser.login,
                        fullName: theUser.firstName + ' ' + theUser.lastName,
                        belongsTo: theGroups,
                        //storage: putIntoStorage
                        storage: {
                            myID: theUser.ID,
                            time: currentConnectTime
                        }
                    };
                }
            }
        }
    return result; // either an error or a custom user object
};