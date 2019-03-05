import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:3301/projects';
  constructor(private http: HttpClient) { }

  createProject(projectName, division, landUser, lotId, mainProjectName){
    const params = {
      projectName: projectName,
      division: division,
      landUser: landUser, 
      lotNo: lotId, 
      mainProjectName: mainProjectName
    }
    return this.http.post(`${this.url}/createProject`,params);
  }

  search(projectName, division, landUser, lotId, state): Observable<any> {
    let params = new HttpParams()
    if (projectName != null) {
      params = params.append('projectName', projectName);
    }
    if (division != null) {
      params = params.append('division', division);
    }
    if (landUser != null) {
      params = params.append('landUser', landUser);
    }
    if (lotId != null){
      params = params.append('lotId', lotId);
    }
    if (state != null) {
      params = params.append('state', state);
    }
    return this.http.get(`${this.url}/search`,{params:params});
  }

  sendToNextStage(projectId, nextStage){
    const params = {
      projectId: projectId,
      nextStage: nextStage
    }
    return this.http.post(`${this.url}/sendToNextStage`,params);
  }
}
