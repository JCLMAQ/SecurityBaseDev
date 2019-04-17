/*
 * A BootStrap is a JavaScript file that is run when your project is loaded on the server.
 * You can use it  to initialize your application, define HTTP pattern handlers etc..
 */
//directory.setSessionManager('login/session-manager');

directory.setLoginManager("login/login-manager" , "Admin");

httpServer.addRequestHandler('^/api/document/$', './handlers/handler.js', 'handleDocument');
httpServer.addRequestHandler('^/api/document/[a-fA-F0-9]{32}/$', './handlers/handler.js', 'handleDocument');

httpServer.addRequestHandler('(?i)^/api/document/$', './handlers/handler.js', 'handleDocument');