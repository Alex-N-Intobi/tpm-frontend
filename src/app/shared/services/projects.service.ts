import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './base/api.service';
import { Project } from '../models/project.model';
import { Pageable } from '../models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private api: ApiService) {}

  delete(id: number): Observable<void> {
    return this.api.delete('projects', id.toString());
  }

  update(id: number, request: Project): Observable<Project> {
    return this.api.put(`projects/${id}`, request);
  }

  create(request: Project): Observable<Project> {
    return this.api.post('projects', request);
  }

  get(id: number): Observable<Project> {
    return this.api.get(`projects/${id}`);
  }

  getAll(): Observable<Pageable<Project>> {
    return this.api.get(`projects`);
  }
}
