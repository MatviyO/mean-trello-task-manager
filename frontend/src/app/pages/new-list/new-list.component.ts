import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {IList} from "../../models/list.model";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {

  }
  createNewList(title: string) {
    this.taskService.createList(title).subscribe((response: IList) => {
      this.router.navigate(['/lists', response._id])
    })
  }

}
