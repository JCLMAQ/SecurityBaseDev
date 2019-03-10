import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from './services/task.service';
import { LinkService } from './services/link.service';
import { ITask } from './models/task';
import { ILink } from './models/link';

import 'dhtmlx-gantt';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css'],
  encapsulation: ViewEncapsulation.None,
	providers: [TaskService, LinkService]
})
export class GanttComponent implements OnInit {

  @ViewChild('gantt_here') ganttContainer: ElementRef;

	constructor(private taskService: TaskService, private linkService: LinkService) { }

	ngOnInit() {

		gantt.config.xml_date = '%Y-%m-%d %H:%i';

		gantt.init(this.ganttContainer.nativeElement);

		// const dp = gantt.createDataProcessor({
		// 	task: {
		// 		update: (data: ITask) => this.taskService.update(data),
		// 		create: (data: ITask) => this.taskService.insert(data),
		// 		delete: (id) => this.taskService.remove(id)
		// 	},
		// 	link: {
		// 		update: (data: ILink) => this.linkService.update(data),
		// 		create: (data: ILink) => this.linkService.insert(data),
		// 		delete: (id) => this.linkService.remove(id)
		// 	}
		// });

		Promise.all([this.taskService.get(), this.linkService.get()])
			.then(([data, links]) => {
				gantt.parse({ data, links });
			});
	}

}
