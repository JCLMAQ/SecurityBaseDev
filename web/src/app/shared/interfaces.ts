export interface ITodo {
  ID: string;
  description: string;
  done: boolean;
  public: boolean;
  picture: any;
  _key?: string;
  type: ITodoType;
  users?:{
    entities: IUser[];
    fetch(): Promise<IUser[]>;
  };
  subTodos? :ITodo[];
  mainTodo? : ITodo;
  save(): void;
  delete(): void;
  removeTodoUser(): void;
  getUsers(): Promise<{
    entities: IUser[];
    _count: number;
  }>;
}

export interface IUser {
  ID: string;
  email: string;
  fullName: string;
  group: string;
  _key?: string;
  save(): void;
  delete(): void;
  getTodos(): Promise<{
    entities: ITodo[];
    _count: number;
  }>;
}

export interface ITodoType {
  ID: string;
  choiceDescription: string;
  choiceCategory: string;
  _key?: string;
  todoTyped:{
    entities:ITodo[];
    fetch(): Promise<ITodo[]>;
  }
}
export interface ICaroussel {
  ID: string;
  name: string;
  detail: string;
  _key?: string;
  picture: ImageBitmap;
}
