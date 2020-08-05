import { Injectable } from '@angular/core';
import {RequestService} from "./request.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private requestService: RequestService) { }

  createList(title: string) {
    return this.requestService.post('/list', {title})
  }
}
