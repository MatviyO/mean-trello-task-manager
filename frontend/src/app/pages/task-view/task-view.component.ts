import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {ITask} from "../../models/task.model";
import {IList} from "../../models/list.model";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: IList[];
  tasks: ITask[];

  constructor(private route: ActivatedRoute,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params.listId) {
          this.taskService.getTasks(params.listId).subscribe((tasks: ITask[]) => {
            this.tasks = tasks
          })
        } else {
          this.tasks = undefined;
        }
      }
    )
    this.taskService.getLists().subscribe((lists: IList[]) => {
      this.lists = lists;
    })
  }

  onTaskClick(task: ITask) {
    this.taskService.completed(task).subscribe(() => {
      task.completed = !task.completed
    })
  }
}
