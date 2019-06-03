export interface IChoice {
  _key?: number;
  ID: number;
  choiceCategory: string;
  choiceDescription: string;
  save(): Promise<IChoice>;
  recompute(): Promise<IChoice>;
  fetch(options?: any): Promise<IChoice>;
  delete(): Promise<void>;
}
export interface IDocFile {
  _key?: string;
  ID: string;
  docFile: string;
  fileName: string;
  save(): Promise<IDocFile>;
  recompute(): Promise<IDocFile>;
  fetch(options?: any): Promise<IDocFile>;
  delete(): Promise<void>;
}
export interface IGanttLink {
  _key?: number;
  ID: number;
  source: number;
  target: number;
  type: string;
  save(): Promise<IGanttLink>;
  recompute(): Promise<IGanttLink>;
  fetch(options?: any): Promise<IGanttLink>;
  delete(): Promise<void>;
}
export interface IGanttTask {
  _key?: number;
  ID: number;
  start_date: string;
  text: string;
  duration: number;
  progress: number;
  parent: number;
  open: boolean;
  sortOrder: number;
  save(): Promise<IGanttTask>;
  recompute(): Promise<IGanttTask>;
  fetch(options?: any): Promise<IGanttTask>;
  delete(): Promise<void>;
}
export interface IGroup {
  _key?: string;
  ID: string;
  name: string;
  userGroupCollection: IUserGroup[];
  save(): Promise<IGroup>;
  recompute(): Promise<IGroup>;
  fetch(options?: any): Promise<IGroup>;
  delete(): Promise<void>;
}
export interface IPicture {
  _key?: string;
  ID: string;
  code: string;
  name: string;
  detail: string;
  save(): Promise<IPicture>;
  recompute(): Promise<IPicture>;
  fetch(options?: any): Promise<IPicture>;
  delete(): Promise<void>;
}
export interface ITodo {
  _key?: string;
  ID: string;
  description: string;
  done: boolean;
  mainTodo: ITodo;
  SubTodos: ITodo[];
  assignedTo: ITodoUser[];
  users: IUserTodoAssign[];
  type: ITodoType;
  userID: string;
  public: boolean;
  save(): Promise<ITodo>;
  recompute(): Promise<ITodo>;
  fetch(options?: any): Promise<ITodo>;
  delete(): Promise<void>;
  getUsers(): void;
  removeTodoUser(): void;
}
export interface ITodoType {
  _key?: number;
  ID: number;
  choiceCategory: string;
  choiceDescription: string;
  todosTyped: ITodo[];
  save(): Promise<ITodoType>;
  recompute(): Promise<ITodoType>;
  fetch(options?: any): Promise<ITodoType>;
  delete(): Promise<void>;
}
export interface ITodoUser {
  _key?: string;
  ID: string;
  assignOpen: string;
  assignDue: string;
  assignDone: string;
  comments: string;
  todoAssigned: ITodo;
  roleOfUser: string;
  userAssigned: IUserTodoAssign;
  todoUserRoles: ITodoUserRole[];
  save(): Promise<ITodoUser>;
  recompute(): Promise<ITodoUser>;
  fetch(options?: any): Promise<ITodoUser>;
  delete(): Promise<void>;
}
export interface ITodoUserRole {
  _key?: number;
  ID: number;
  choiceCategory: string;
  choiceDescription: string;
  todoUsers: ITodoUser;
  save(): Promise<ITodoUserRole>;
  recompute(): Promise<ITodoUserRole>;
  fetch(options?: any): Promise<ITodoUserRole>;
  delete(): Promise<void>;
}
export interface IUser {
  _key?: string;
  ID: string;
  email: string;
  password: string;
  roles: string;
  fullName: string;
  userGroupCollection: IUserGroup[];
  save(): Promise<IUser>;
  recompute(): Promise<IUser>;
  fetch(options?: any): Promise<IUser>;
  delete(): Promise<void>;
  addOneUserToOneGroup(): void;
  removeOneUserFromOneGroup(): void;
}
export interface IUserGroup {
  _key?: string;
  ID: string;
  user: IUser;
  group: IGroup;
  save(): Promise<IUserGroup>;
  recompute(): Promise<IUserGroup>;
  fetch(options?: any): Promise<IUserGroup>;
  delete(): Promise<void>;
}
export interface IUserTodoAssign {
  _key?: string;
  ID: string;
  email: string;
  password: string;
  roles: string;
  fullName: string;
  userGroupCollection: IUserGroup[];
  assignedTodos: ITodoUser[];
  todos: ITodo[];
  save(): Promise<IUserTodoAssign>;
  recompute(): Promise<IUserTodoAssign>;
  fetch(options?: any): Promise<IUserTodoAssign>;
  delete(): Promise<void>;
  addOneUserToOneGroup(): void;
  getTodos(): void;
  removeOneUserFromOneGroup(): void;
}


