import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './base/api.service';
import { Project } from '../models/project.model';
import { Pageable } from '../models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  getLookups(role: string): Observable<Project> {
    return this.api.get(`users/lookups/${role}`);
  }
}
