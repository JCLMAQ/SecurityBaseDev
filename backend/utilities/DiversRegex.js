// To test valid email format
					// regex ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$
		            //(?=.*\d)      #   must contains one digit from 0-9
		            //(?=.*[a-z])       #   must contains one lowercase characters
		            //(?=.*[A-Z])       #   must contains one uppercase characters
		            //(?=.*[@#$%])      #   must contains one special symbols in the list "@#$%"
		            // .     #     match anything with previous condition checking
		            // {6,20}  #        length at least 6 characters and maximum of 20
		            /*
					var emailRegexStr = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
					var isValid = emailRegexStr.test(this.eMail);
					if (!isValid) {
					err = {error: 401, errorMessage: "Email is invalid."};
					}
				*/


//Check if the password is at least 7 characters and one digit.
                /*
					if (changePasswObject.newPassword !== null) {
						passwordRegexStr = /^(?=.*\d)[a-zA-Z\d]{7,}$/;
						isValid = passwordRegexStr.test(changePasswObject.newPassword);
						if (!isValid) {
							return {error: 8025, errorMessage: "Invalid password. Password must be at least 7 characters."};
						}
					}