
(model.User.collectionMethods.addUsersToOneGroup = function(theSelectedRow,groupID) {
	var theGroup = ds.Group(groupID);
	var currentUserCollection = this;
	theSelectedRow.forEach(function (rowNum){
		// find the ID of the user from the row
		var userID = currentUserCollection[rowNum].ID;
		var existing = ds.UserGroup.find("group.ID == :1 && user.ID == :2", groupID, userID);
		if(!existing){
			new ds.UserGroup({user: userID, group: theGroup}).save();
			//return true;
		}
	});
}).scope="public";

(model.User.collectionMethods.removeUsersFromOneGroup = function(theSelectedRow,groupID) {
	var theGroup = ds.Group(groupID);
	var currentUserCollection = this;
	theSelectedRow.forEach(function (rowNum){
		var userID = currentUserCollection[rowNum].ID;
		var matches = ds.UserGroup.query("group.ID == :1 && user.ID == :2", groupID, userID);
		if(matches.length > 0){
			matches.remove();
			//return true;
		}	
	});
}).scope="public";

(model.User.entityMethods.removeOneUserFromOneGroup = function (groupID) {
                         var theGroup = ds.Group(groupID);
                         var matches = ds.UserGroup.query("group.ID == :1 && user.ID == :2", groupID, this.ID);
                         if(matches.length > 0 ){
                              matches.remove();
                               return true ;
                        }
	
}).scope = "public";

(model.User.entityMethods.addOneUserToOneGroup = function (groupID) {
	var theGroup = ds.Group(groupID);
	var existing = ds.UserGroup.find("group.ID == :1 && user.ID == :2", groupID, this.ID);
	if(!existing){
	   new ds.UserGroup({user: this, group: theGroup}).save();
	   return true ;
	}
}).scope = "public";


model.User.methods.addUser = function(signUpData) {
	// Add a new user account.
	var passwordRegexStr, isValid,
		newUser;

		//Check if the password is at least 7 characters and one digit.
		if (signUpData.password !== null) {
			passwordRegexStr = /[0-9a-zA-Z]{5,}/;
	//		passwordRegexStr = /^(?=.*\d)[a-zA-Z\d]{5,}$/;
			isValid = passwordRegexStr.test(signUpData.password);
			if (!isValid) {
				return {error: 8025, errorMessage: "Password must be at least 5 characters."};
			}
		}
		
		var user = ds.User({email: signUpData.email}); // Get the user
		if (user) {
			return {error: 8030, errorMessage: "Email already exists."};
		}
		
		if (!signUpData.fullName) {
			return {error: 8030, errorMessage: "Name must be provided."};
		}
		if (!signUpData.email) {
			return {error: 8030, errorMessage: "Email must be provided."};
		}
		
		//Check if password is enterd the same both times on the Sign Up form.
		if (signUpData.password !== signUpData.verifyPassword) {
			return {error: 8030, errorMessage: "Verification of password failed."};
		}
		
		newUser =  ds.User.createEntity();
       	newUser.fullName = signUpData.fullName;  
       	newUser.email = signUpData.email;    
   //    	newUser.password = signUpData.password;
        newUser.HA1Key = directory.computeHA1(newUser.ID, signUpData.password);
        
    // TODO : link with groups from the Directory    
       //	newUser.group = "todoUsers";
       	newUser.role = "BasicUsers";
       	
       	//*** Best Pratice ***
       	//Save the new User in a Try Catch block and put your validation code for the email address in the User 
       	// onValidate() method (see model.User.events.onValidate below). This is better than doing validation checks in this 
       	// function because you may create other methods in the future that save a new User.
       	
       	try {
			newUser.save(); //Save the entity.
		}
		catch(e) {
			return {error: 8099, errorMessage: e.messages[1]};
		}
};

//Class methods scope.
model.User.methods.addUser.scope ="public";


model.User.entityMethods.validatePassword = function(password) {
	var ha1 = directory.computeHA1(this.ID, password);
	return (ha1 === this.HA1Key); //true if validated, false otherwise.
};

model.User.methods.modifyPassword = function(changePasswObject) {
// Modify password class methods
    var passwordRegexStr, isValid;
    var sessionRef = directory.currentSession; // Get session.
  //  var sessionRef = directory.currentSession(); // Get session.
    var promoteToken = sessionRef.promoteWith("Internal"); //temporarily make this session Internal level.
    //Find the User entity for the current user.
    var myCurrentUser = directory.currentUser; // we get the user of the current session.
    var myUser = ds.User.find("ID = :1", myCurrentUser.ID);
    if ((myCurrentUser !== null) && (myUser !== null)) { //if a user is logged in.
        if (myUser.validatePassword(changePasswObject.oldPassword)) { // Old Password is the rigth one
            if (changePasswObject.newPassword === changePasswObject.newPasswordAgain) { // newPasswordAgain
                //Check if the password is at least 7 characters and one digit.
                
					if (changePasswObject.newPassword !== null) {
						passwordRegexStr = /[0-9a-zA-Z]{5,}/;
						// passwordRegexStr = /^(?=.*\d)[a-zA-Z\d]{5,}$/;
						isValid = passwordRegexStr.test(changePasswObject.newPassword);
						if (!isValid) {
							return {error: 8025, errorMessage: "Votre mot de passe n'est pas valide (il doit avoir au minimum 5 caractères)."};
						}
					}
				
                myUser.password = changePasswObject.newPassword;
                try {
                    myUser.save(); //Save the entity.
                    sessionRef.unPromote(promoteToken); //Put the session back to normal.
                    return {
                        error: 8040,
//                        errorMessage: "Your password has been changed."
                        errorMessage: "Votre mot de passe a été changé avec succès."
                    };
                }
                catch (e) {
                    return {
                        error: 8099,
                        errorMessage: e.messages[1]
                    };
                }
            }
            else {
                return {
                    error: 8050,
//                    errorMessage: "You did not match the new password."
                    errorMessage: "Les deux mots de passe ne correspondent pas !"
                };
            }
        }
        else {
            return {
                error: 8060,
//                errorMessage: "You did not enter the correct password."
                errorMessage: "Vous n'avez pas introduit le bon mot de passe'."
            };
        }
    }
    else {
        return {
            error: 8070,
//            errorMessage: "Could not load your user account on the server. You password was not changed."
            errorMessage: "Nous n'avons pas réussi à charger votre compte. Votre mot de passe n'a pas été changé"
        };
    }
    sessionRef.unPromote(promoteToken); //Put the session back to normal.
};
model.User.methods.modifyPassword.scope = "public";


