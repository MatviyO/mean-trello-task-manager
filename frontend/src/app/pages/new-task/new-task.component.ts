import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ITask} from "../../models/task.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {


  listId: string
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.listId = params['listId'];
        console.log(this.listId)
      }

    )
  }
  createNewTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe((response: ITask) => {
      this.router.navigate(['../'], {relativeTo: this.route});
    })
  }

}
