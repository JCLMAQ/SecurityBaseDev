import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { WakandaService } from "./wakanda.service";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfirmComponent } from './confirm/confirm.component';
import { ITodo } from "./interfaces";
import { config } from '../config';

const { host, port } = config;

@Injectable()
export class TodoService {
  constructor(
    private wakanda: WakandaService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {

  }

  async getClass() {
    const ds = await this.wakanda.catalog;
    return ds.Todo;
  }

  async getTypesClass() {
    const ds = await this.wakanda.catalog;
    return ds.TodoType;
  }
  
  async getAll(opts: {
      pageSize: number;
      start: number;
      filter?: string;
      params?: (string)[];
      orderBy?: string
    } = {
      pageSize: 10,
      start: 0
    }): Promise<{
      list: ITodo[];
      count: number;
    }> {
      const Todo = await this.getClass();
      const res = await Todo.query(opts, {expand: 'users'});

      return {
        list: res.entities,
        count: res._count
      };
  }

  remove(todo): Promise<any> {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: { message: "Would you like to remove this entity?" }
    });

    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(async isYes => {
        if(isYes){
          await todo.delete();
        }

        resolve(isYes);
      });
    });
  }

  uploadFile(formData) {
    debugger;
    return this.http.post(`http://${host}:${port}/api/uploaddocument`, formData, {
      responseType: 'text'
    });

  }
}
