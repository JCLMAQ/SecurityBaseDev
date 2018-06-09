import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';

import { APP_ROUTING, APP_ROUTING_PROVIDERS } from "./app.routes";

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { UsersComponent } from './users/users.component';

import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import { ConfirmComponent } from './shared/confirm/confirm.component';

import { SignupComponent } from './signup/signup.component';


import { WakandaService } from "./shared/wakanda.service";
import { TodoService } from './shared/todo.service';
import {UserService} from './shared/user.service';
import { RegisterService} from "./register/register.service";



@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailsComponent,
    UsersComponent,
    HomeComponent,
    ConfirmComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    APP_ROUTING
  ],
  entryComponents: [ConfirmComponent],
  providers: [
    APP_ROUTING_PROVIDERS,
    WakandaService,
    TodoService, 
    UserService,
    RegisterService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
