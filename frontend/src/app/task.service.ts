import { Injectable } from '@angular/core';
import {RequestService} from "./request.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private requestService: RequestService) { }

  createList(title: string) {
    return this.requestService.post('lists', {title})
  }
  getLists() {
    return this.requestService.get('lists');
  }
  getTasks(listId: string) {
    return this.requestService.get(`lists/${listId}/tasks`);
  }
}
