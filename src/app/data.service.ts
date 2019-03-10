import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BackendMessage } from './backend-message';
import { ProjectData } from './project-data';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:3301/projects';

  searchResults = new BehaviorSubject<Array<ProjectData>>(null);
  constructor(private http: HttpClient) { }

  createProject(projectName, division, landUser, lotId, mainProjectName) {
    const params = {
      projectName,
      division,
      landUser,
      lotNo: lotId,
      mainProjectName
    };
    return this.http.post(`${this.url}/createProject`, params);
  }

  getNextStage(projectId): Observable<BackendMessage> {
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get(`${this.url}/nextStageById`, {params}) as Observable<BackendMessage>;
  }

  saveSearchResults(searchResults: Array<ProjectData>){
    sessionStorage.setItem('search-results', JSON.stringify(searchResults));
  }

  getSearchResults(): Array<ProjectData>{
    return JSON.parse(sessionStorage.getItem('search-results'));
  };

  search(projectName, division, landUser, lotId, state): Observable<BackendMessage> {
    let params = new HttpParams();
    if (projectName != null) {
      params = params.append('projectName', projectName);
    }
    if (division != null) {
      params = params.append('division', division);
    }
    if (landUser != null) {
      params = params.append('landUser', landUser);
    }
    if (lotId != null) {
      params = params.append('lotId', lotId);
    }
    if (state != null) {
      params = params.append('state', state);
    }
    return this.http.get(`${this.url}/search`, {params}) as Observable<BackendMessage>;
  }

  getProjectStage(projectId): Observable<BackendMessage> {
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get(`${this.url}/stateById`, {params}) as Observable<BackendMessage>;
  }

  sendToNextStage(projectId, nextStage) {
    const params = {
      projectId,
      nextStage
    };
    return this.http.post(`${this.url}/sendToNextStage`, params);
  }
}
