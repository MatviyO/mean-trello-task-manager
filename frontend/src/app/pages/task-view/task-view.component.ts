import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
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
  selectedListId: string;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
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
  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists'])
    })
  }

  onTaskDeleteClick(taskId: string) {
    this.taskService.deletTask(this.selectedListId, taskId).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== taskId)
    })
  }
}
