import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskViewComponent} from "./pages/task-view/task-view.component";
import {NewListComponent} from "./pages/new-list/new-list.component";
import {NewTaskComponent} from "./pages/new-task/new-task.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignupPageComponent} from "./pages/signup-page/signup-page.component";
import {EditListComponent} from "./pages/edit-list/edit-list.component";
import {EditTaskComponent} from "./pages/edit-task/edit-task.component";

const routes: Routes = [
  {path: '', redirectTo: '/lists', pathMatch: 'full'},
  {path: 'newlist', component: NewListComponent},
  {path: 'edit-list/:listId', component: EditListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'lists/:listId/newtask', component: NewTaskComponent},
  {path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
