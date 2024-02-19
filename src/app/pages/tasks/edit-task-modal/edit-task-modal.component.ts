import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DxFormComponent } from 'devextreme-angular';
import { ProjectItem } from 'src/app/shared/models/project-item.model';
import { ProjectItemsService } from '../../../shared/services/project-items.service';
import { UserService } from 'src/app/shared/services/user-service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  @ViewChild(DxFormComponent) editForm: DxFormComponent;

  id: number;
  projectId: number;
  data: ProjectItem = {} as any;
  users: any = [];

  priorities = ['High', 'Urgent', 'Normal', 'Low'];
  statuses = ['Todo', 'InProgress', 'Done'];
  types = ['Task', 'Issue'];

  constructor(
    public activeModal: NgbActiveModal,
    public projectItemsService: ProjectItemsService,
    public userService: UserService
  ) {}

  getUsers() {
    this.userService.getLookups('translator').subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  save() {
    if (this.editForm.instance.validate().isValid) {
      if (this.id) {
        this.projectItemsService.update(this.id, this.data).subscribe((res) => {
          this.activeModal.close(res);
        });
      } else {
        const payload = { ...this.data, projectId: this.projectId };
        this.projectItemsService.create(payload).subscribe((res) => {
          this.activeModal.close(res);
        });
      }
    }
  }
}
