import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IList} from "../../models/list.model";
import {ITask} from "../../models/task.model";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  listId: string;
  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.listId = params.listId
      }
    )
  }
  updateList(title: string) {
    this.taskService.updateList(title, this.listId).subscribe(() => {
      this.router.navigate(['/lists', this.listId])
    })
  }

}
