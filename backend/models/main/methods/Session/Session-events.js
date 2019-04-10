
model.Session.events.init = function(event) {
	const DAY = 86400000;
	this.created = new Date();
    this.expires = new Date(this.created.getTime() + DAY);
};