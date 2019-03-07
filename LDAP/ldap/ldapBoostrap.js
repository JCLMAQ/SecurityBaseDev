/* BootStrap file
*/
// LDAP Sync
try{
    directory.sync();
}
catch(e) {
    console.log(e)
};

directory.setLoginListener( 'securityLogin', 'Internal' );