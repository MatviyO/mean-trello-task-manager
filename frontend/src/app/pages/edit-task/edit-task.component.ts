import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId: string;
  listId: string;
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.taskId = params.taskId
        this.listId = params.listId
      }
    )
  }
  updateTask(title: string) {
    this.taskService.updateTask(title, this.taskId, this.listId).subscribe(() => {
      this.router.navigate(['/lists', this.listId])
    })
  }

}
