import {Injectable} from '@angular/core';
import {ITask} from '../models/task';
import { WakandaService } from '../../shared/wakanda.service';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './service-helper';

@Injectable()
export class TaskService {
    private taskUrl = "api/tasks";

    constructor(private http: HttpClient) {}

    get(): Promise<ITask[]>{
        return this.http.get(this.taskUrl)
            .toPromise()
            .catch(HandleError);
    }

    insert(task: ITask): Promise<ITask> {
        return this.http.post(this.taskUrl, task)
            .toPromise()
            .catch(HandleError);
    }


    update(task: ITask): Promise<void> {
        return this.http
            .put('${this.taskUrl}/${task.id}', task)
            .toPromise()
            .catch(HandleError);
    }

    remove(id: number): Promise<void> {
        return this.http.delete('${this.taskUrl}/${id}')
            .toPromise()
            .catch(HandleError);
    }
}
