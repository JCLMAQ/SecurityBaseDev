/*
 * A BootStrap is a JavaScript file that is run when your project is loaded on the server.
 * You can use it  to initialize your application, define HTTP pattern handlers etc..
 */
//directory.setSessionManager('login/session-manager');

httpServer.addRequestHandler('(?i)^/api/docupload', './backend/handler.js', 'handleDocument');


directory.setLoginManager("login/login-manager" , "Admin");

// httpServer.addRequestHandler('^/api/docupload/$', './handlers/handler.js', 'handleDocument');
// httpServer.addRequestHandler('^/api/docupload/[a-fA-F0-9]{32}/$', './handlers/handler.js', 'handleDocument');

// httpServer.addRequestHandler('(?i)^/api/docupload/$', './handler.js', 'handleDocument');


//httpServer.addRequestHandler('(?i)^/api/docupload/[a-fA-F0-9]{32}/$', './handler.js', 'handleDocument');

httpServer.addRequestHandler('(?i)^/api/docupload', './backend/handler.js', 'handleDocument');