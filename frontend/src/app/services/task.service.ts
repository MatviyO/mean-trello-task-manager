import { Injectable } from '@angular/core';
import {RequestService} from "./request.service";
import {ITask} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private requestService: RequestService) { }

  createList(title: string) {
    return this.requestService.post('lists', {title})
  }
  updateList(title: string, listId: string,  ) {
    return this.requestService.patch(`lists/${listId}`, {title})
  }
  updateTask(title: string, taskId: string, listId: string) {
    return this.requestService.patch(`lists/${listId}/tasks/${taskId}`, { title})
  }
  deletTask(listId: string, taskId: string) {
    return this.requestService.delete(`lists/${listId}/tasks/${taskId}`)
  }
  deleteList(id: string) {
    return this.requestService.delete(`lists/${id}`)
  }
  createTask(title: string, listId: string) {
    return this.requestService.post(`lists/${listId}/tasks`, {title})
  }
  getLists() {
    return this.requestService.get('lists');
  }
  getTasks(listId: string) {
    return this.requestService.get(`lists/${listId}/tasks`);
  }
  completed(task: ITask) {
      return this.requestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
        completed: !task.completed
      })
  }

}
