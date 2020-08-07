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
      this.taskService.getTasks(params.listId).subscribe((tasks: ITask[]) => {
        console.log(tasks)
        this.tasks = tasks
        })
      }
    )
    this.taskService.getLists().subscribe((lists: IList[]) => {
      console.log(lists)
      this.lists = lists;
    })
  }
  onTaskClick(task: ITask) {
    this.taskService.completed(task).subscribe(() => {
    })
  }
}
