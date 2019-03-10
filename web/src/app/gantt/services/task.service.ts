import {Injectable} from '@angular/core';
import {ITask} from '../models/task';
import { WakandaService } from '../../shared/wakanda.service';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './service-helper';

@Injectable()
export class TaskService {
	private taskUrl = 'api/tasks';

	constructor(
		private wakanda: WakandaService,
		private http: HttpClient
		) {}

	async getTaskClass() {
		const ds = await this.wakanda.catalog;
		return ds.GanttTask;
		}
	
	async getTaskAll(opts: {
		pageSize: number;
		start: number;
		filter?: string;
		params?: (string)[];
		orderBy?: string
	  } = {
		pageSize: 10,
		start: 0
	  }): Promise<
		ITask[]>  {

		const Task = await this.getTaskClass();
		const res = await Task.query(opts);
		debugger;
		return res.entities;
	}

	async get(){
		//debugger;
		// const taskds = await this.getTaskClass();
		const result = await this.getTaskAll();
		return result
		// return this.http.get(this.taskUrl)
	}

	insert(task: ITask): Promise<ITask> {
		return this.http.post(this.taskUrl, task)
			.toPromise()
			.catch(HandleError);
	}

	update(task: ITask): Promise<void> {
		return this.http
			.put(`${this.taskUrl}/${task.id}`, task)
			.toPromise()
			.catch(HandleError);
	}

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.taskUrl}/${id}`)
			.toPromise()
			.catch(HandleError);
	}
}