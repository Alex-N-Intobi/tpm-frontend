import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './base/api.service';
import { Project } from '../models/project.model';
import { Pageable } from '../models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectItemsService {
  constructor(private api: ApiService) {}

  delete(id: number): Observable<void> {
    return this.api.delete('projectItems', id.toString());
  }

  update(id: number, request: Project): Observable<Project> {
    return this.api.put(`projectItems/${id}`, request);
  }

  create(request: Project): Observable<Project> {
    return this.api.post('projectItems', request);
  }

  get(id: number): Observable<Project> {
    return this.api.get(`projectItems/${id}`);
  }

  getAll(): Observable<Pageable<Project>> {
    return this.api.get(`projectItems`);
  }
}
