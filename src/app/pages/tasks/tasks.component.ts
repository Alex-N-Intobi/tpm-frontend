import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'devextreme/data/odata/store';
import { ToastrService } from 'ngx-toastr';
import { ProjectItem } from 'src/app/shared/models/project-item.model';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectItemsService } from 'src/app/shared/services/project-items.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { confirm } from 'devextreme/ui/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { firstValueFrom } from 'rxjs';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent implements OnInit {
  project: Project;
  projectId: number;
  items: ProjectItem[] = [];
  dataSource: any;

  priority = ['High', 'Urgent', 'Normal', 'Low'];
  status = ['Todo', 'InProgress', 'Done'];
  type = ['Task', 'Issue'];

  constructor(
    private projectService: ProjectsService,
    private projectItemService: ProjectItemsService,
    private actr: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  ngOnInit() {
    this.actr.params.subscribe((params) => {
      this.projectId = params['id'];
      this.projectService.get(this.projectId).subscribe({
        next: (data) => {
          this.project = data;
        },
      });
      this.getItems();
    });
  }

  getItems() {
    this.projectService.getItems(this.projectId).subscribe({
      next: (data) => {
        this.items = data;
      },
    });
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.push({
      location: 'after',
      template: 'create',
    });
  }

  async editItem(e: any) {
    await this.openItemModal(e.row.data.id);
  }

  async openItemModal(id: number | undefined = undefined) {
    const modalRef = this.modalService.open(EditTaskModalComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.getUsers();
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.projectId = this.projectId;
    if (id) {
      let data = await firstValueFrom(this.projectItemService.get(id));
      modalRef.componentInstance.data = data;
    }
    modalRef.result.then(
      (result) => {
        this.toastr.success(`Item successfully ${id ? 'updated' : 'created'}.`);
        this.getItems();
      },
      (reason) => {}
    );
  }

  deleteItem(e: any) {
    confirm(
      `Are you sure you want to delete this ${e.row.data.type}?`,
      'Confirm delete'
    ).then((dialogResult: boolean) => {
      if (dialogResult) {
        this.projectItemService.delete(e.row.data.id).subscribe({
          next: () => {
            this.toastr.success('Deleted successfully!');
          },
        });
      }
    });
  }
}
