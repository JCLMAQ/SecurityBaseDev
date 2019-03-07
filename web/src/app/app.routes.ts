import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, Provider } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
// import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import {IsTodoPageGuard, IsAdminGuard} from './shared/guard.service';

import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UsersComponent } from './users/users.component';
import { GanttComponent } from './gantt/gantt.component';

const APP_ROUTES: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'home',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'todos',
  component: TodoListComponent,
  canActivate: [IsTodoPageGuard]
}, {
  path: 'todos/:id',
  component: TodoDetailsComponent,
  data: {
    editable: true
  }
}, {
  path: 'todos/:id/view',
  component: TodoDetailsComponent
}, {
  path: 'users',
  component: UsersComponent,
  canActivate: [IsAdminGuard],
},{
  path: 'gantt',
  component: GanttComponent
  //canActivate: [IsAdminGuard],
} ];

export const APP_ROUTING_PROVIDERS: Provider[] = [
  IsTodoPageGuard,
  IsAdminGuard
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {
  useHash: true
});
