// create sample
/**/
 ds.GanttTask.remove();
 ds.GanttLink.remove();
/**/
var formatter = require("formatting"); // access to module
new ds.GanttTask(
	{id:1, text:"Project #1",start_date:parseDate("01-04-2016","dd-mm-yy"), duration:11, progress: 0.6, open: true}
).save();
new ds.GanttTask(
	{id:2, text:"Task #1",   start_date:parseDate("03-04-2016","dd-mm-yy"), duration:5,  progress: 1,   open: true, parent:1}
).save();
new ds.GanttTask(
	{id:3, text:"Task #2",   start_date:parseDate("02-04-2016","dd-mm-yy"), duration:7,  progress: 0.5, open: true, parent:1}
).save();
new ds.GanttTask(
	{id:4, text:"Task #2.1", start_date:parseDate("03-04-2016","dd-mm-yy"), duration:2,  progress: 1,   open: true, parent:3}
).save();
new ds.GanttTask(
	{id:5, text:"Task #2.2", start_date:parseDate("04-04-2016","dd-mm-yy"), duration:3,  progress: 0.8, open: true, parent:3}
).save();
new ds.GanttTask(
	{id:6, text:"Task #2.3", start_date:parseDate("05-04-2016","dd-mm-yy"), duration:4,  progress: 0.2, open: true, parent:3}
).save();
ds.GanttTask.all();


new ds.GanttLink(
		{id:1, source:1, target:2, type:"1"}
	).save();
	new ds.GanttLink(
		{id:2, source:1, target:3, type:"1"}
	).save();
	new ds.GanttLink(
		{id:3, source:3, target:4, type:"1"}
	).save();
	new ds.GanttLink(
		{id:4, source:4, target:5, type:"0"}
	).save();
	new ds.GanttLink(
		{id:5, source:5, target:6, type:"0"}
).save();
ds.GanttLink.all();
ds.GanttTask.all();