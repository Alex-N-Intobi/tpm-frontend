import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './base/api.service';
import { LoginRequest } from '../models/login-request.model';
import { TokenResponse } from '../models/token-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private api: ApiService) {}

  authenticate(request: LoginRequest): Observable<TokenResponse> {
    return this.api.post('authenticate/login', request);
  }

  currentUser(): Observable<User> {
    return this.api.get('authenticate/current/user');
  }
}
