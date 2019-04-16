import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ITodo, IUser, ITodoType } from '../shared/interfaces';
import { HttpClient}  from '@angular/common/http';

// import { FileInputComponent } from '../shared/file-input/file-input.component';

import { TodoService } from '../shared/todo.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { UserService } from '../shared/user.service';
//import HttpClient from 'wakanda-client/dist/data-access/http/http-client';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  editable: boolean = false;
  currentTodo: ITodo;
  todoCols1: string[] = ['description', 'done', 'public'];
  todos1: MatTableDataSource<ITodo> = new MatTableDataSource<ITodo>([]);
  users: IUser[];
  types: ITodoType[] = [];
  selectedTypeTodo: ITodoType;

  selectedFile:File = null;

  //fileInput: File;
  files: HTMLInputElement;
  //files: any = {};
  url: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  async ngOnInit() {

    // Get all the "types todo"
    const TodoType = await this.todoService.getTypesClass();
    // const Todo = await this.todoService.getClass();
    this.types = (await TodoType.query()).entities;
    // Based on p witch is the selected Todo in the list, fetch the detail of the todo
    this.route.params.subscribe(async p => {
      const Todo = await this.todoService.getClass();
      // const todoexpanded = await Todo.find(p.id, {expand: 'users'}); // Expand does not work
      this.currentTodo = await Todo.find(p.id, { select: 'users, mainTodo, type' }); //, mainTodo, type'});
      // Affect the value for the type of todo
      if (this.currentTodo && this.currentTodo.type) {
        this.selectedTypeTodo = this.types.find(t => t._key === this.currentTodo.type._key);
      }
      // Contruct list of todos to select for add as main todo
      const todos1 = await this.todoService.getAll({
        pageSize: 20,
        start: 0
      });
      this.todos1 = new MatTableDataSource(todos1.list);

      // Contruct the list of users concerned
      this.users = this.currentTodo.users.entities;
      const result = await this.currentTodo.getUsers();
      const users = result.entities;
      const countUser = result._count;
    });

    this.route.data.subscribe(d => {
      this.editable = d.editable;
      // Let allow edition or not, withdraw the colomn 'tools' if not editable
      this.todoCols1 = this.editable ? ['description', 'done', 'public', 'tools'] : ['description', 'done', 'public'];
    });
  }

  async save(todo) {
    //     var fileInput = document.getElementById('fileInput');
    //     var file = fileInput.files[0];
    //     const files = fileInput.target.files;
    // debugger;
    //     todo.picture.upload(file).then(function () {
    //     //file is uploaded and entity is updated
    //     });

    await todo.save();
    this.editable = false;

    //this.router.navigate(["/todos"]);
  }

  async remove(todo) {
    await this.todoService.remove(todo);
    this.router.navigate(["/todos"]);
  }

  async create(todo) {
    const Todo = await this.todoService.getClass();
    this.currentTodo = Todo.create();
  }

  cancel() {
    this.editable = false;
  }

  // async affect(todoSub: ITodo, todoMain: ITodo[]){
  //   this.currentTodo.subTodos= todoMain;
  //   this.save(todoSub);
  // }

  async makeMain(t: ITodo, currentTodo: ITodo) {
    // To avoid the possibility to be its own main
    if (!currentTodo || !t || t.ID === currentTodo.ID) {
      return false;
    }
    currentTodo.mainTodo = t;
    await currentTodo.save();
  }

  async setType(currentTodo: ITodo, type: ITodoType) {
    if (!currentTodo || !type) {
      return false;
    }
    currentTodo.type = type;
    await currentTodo.save();
  }

  async onPictureSelected(file, currentTodo: ITodo) {
    this.currentTodo.picture.upload(file);
 //   await currentTodo.save();
  }

 async deletePicture(currentTodo: ITodo) {
   // Add confirmation windows here
    this.currentTodo.picture = null;
    await currentTodo.save();
  }

  async onDocSelected(file, currentTodo: ITodo) {
    this.currentTodo.doc.upload(file);
 //   await currentTodo.save();
  }
 async deleteDocument(currentTodo: ITodo) {
    // Add confirmation windows here
    this.currentTodo.doc = null;
    await currentTodo.save();
   }

   onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    debugger;
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    //this.http.post('http://localhost:8081/fileUpload', fd).subscribe(res => {console.log(res)});
    this.http.post('http://localhost:8081/handleDocument', fd).subscribe(res => {console.log(res)});
  }
  previousOfTheList() { }
  firstOfTheList() { }
  lastOfTheList() { }
  nextOfTheList() { }

}


