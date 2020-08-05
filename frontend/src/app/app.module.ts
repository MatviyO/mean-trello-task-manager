import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import {TaskService} from "./task.service";
import {RequestService} from "./request.service";
import {HttpClientModule} from "@angular/common/http";
import { NewListComponent } from './pages/new-list/new-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TaskService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
