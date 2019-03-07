
model.GanttLink.collectionMethods.ganttLinksSource = function() {
	var linkData = [];
	this.forEach(function(ganttL){
		linkData.push(
			{id:ganttL.ID, source:ganttL.source, target:ganttL.target, type:ganttL.type}
		);
	});
	return linkData;
};
model.GanttLink.collectionMethods.ganttLinksSource.scope = "public";

model.GanttLink.entityMethods.editL = function(ganttL) {
	debugger;
	this.source = ganttL.source
	this.target = ganttL.target
	this.type = ganttL.type
	this.save()
};