import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectsService } from '../../shared/services/projects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectsService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getAll().subscribe({
      next: (response) => {
        this.projects = response.data;
      },
    });
  }

  onProjectRowChanged(event: any, action: 'add' | 'delete' | 'update') {
    if (action === 'add') {
      const data = {
        ...event.data,
        id: 0,
      };
      this.projectService.create(data).subscribe({
        next: () => {
          this.getProjects();
          this.toastr.success('Created successfully!');
        },
        error: (err) => {},
      });
    } else if (action === 'update') {
      const rowData = {
        ...event.oldData,
        ...event.newData,
      };
      this.projectService.update(rowData.id, rowData).subscribe({
        next: () => {
          this.getProjects();
          this.toastr.success('Updated successfully!');
        },
        error: (err) => {},
      });
    } else if (action === 'delete') {
      this.projectService.delete(event.data.id).subscribe({
        next: () => {
          this.toastr.success('Deleted successfully!');
        },
      });
    }
  }
}
