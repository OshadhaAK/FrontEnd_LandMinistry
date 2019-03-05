import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainProjectService {

  creatProjectEndpoint = 'http://localhost:3301/projects/createMainProject';

  constructor(private http: HttpClient) { }

  createMainProject(projectName: string): Observable<any> {
    const params = {
      projectName
    };
    return this.http.post(this.creatProjectEndpoint, params);
  }
}
