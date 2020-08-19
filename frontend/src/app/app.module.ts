import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import {TaskService} from "./services/task.service";
import {RequestService} from "./services/request.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginComponent } from './pages/login/login.component';
import {AuthService} from "./services/auth.service";
import {WebinterceptorService} from "./services/webinterceptor.service";
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginComponent,
    SignupPageComponent,
    EditListComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebinterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
