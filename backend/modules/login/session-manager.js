exports.writeSession = (session) => {
  if (session.storage.ID) {
    const storage = session.storage;

    new ds.Session({
      ID: session.sessionID,
      meta: {
        request: session.requestInfo,
        user: storage
      }
    }).save();

    return true;
  }

  // Return true as everything is ok
  return false;

};

// Called everytime the server needs a session description
exports.readSession = (session) => {
  let $session;

  try {
    $session = ds.Session.find('ID === :1', session.sessionID);
  } catch (e) {
    return false;
  }

  if (!$session) {
    return false;
  }

  const lifeTime = parseInt(($session.expires - new Date()) / 1000);

  if (lifeTime < 0) {
    $session.remove();
    return false;
  }

  const user = $session.meta && $session.meta.user? $session.meta.user: {};
  let groups = (user.group ? user.group.split(',') : []);

  groups = groups.map(g => directory.group(g))
    .filter(Boolean)
    .map(g => g.ID);

  session.storage.ID = user.ID;
  session.userID = user.username;
  session.lifeTime = lifeTime;
  session.belongsTo = groups;
  session.userName = user.username;
  session.expiration = $session.expires;

  // Return true as everything is ok
  return true;
};

// Calles everytime the server removes a session
exports.removeSession = (session) => {
  let $session;

  try {
    $session = ds.Session.find('ID === :1', session.sessionID);
    if ($session) {
      $session.remove();
    }
  } catch (e) {
    return false;
  }

  return true;
};
