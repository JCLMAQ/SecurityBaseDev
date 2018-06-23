import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { APP_ROUTING, APP_ROUTING_PROVIDERS } from './app.routes';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { UsersComponent } from './users/users.component';

import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';

import { SignupComponent } from './signup/signup.component';
import {CarouselComponent} from './shared/carousel/carousel.component';


import { WakandaService } from './shared/wakanda.service';
import { TodoService } from './shared/todo.service';
import { UserService } from './shared/user.service';
import { RegisterService} from './register/register.service';
import { AuthenticationService } from './shared/authentication.service';


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
    SignupComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    APP_ROUTING
  ],
  entryComponents: [ConfirmComponent],
  providers: [
    APP_ROUTING_PROVIDERS,
    WakandaService,
    TodoService,
    UserService,
    RegisterService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
