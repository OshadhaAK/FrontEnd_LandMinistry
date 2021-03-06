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
  url = 'http://18.136.15.127:3301/projects';

  searchResults = new BehaviorSubject<Array<ProjectData>>(null);
  constructor(private http: HttpClient) { }

  createProject(projectName, division, landUser, lotId, mainProjectName, preliminaryPlan) {
    const params = {
      projectName,
      division,
      landUser,
      lotNo: lotId,
      mainProjectName,
      preliminaryPlan
    };
    return this.http.post(`${this.url}/createProject`, params);
  }

  enterPaymentData(projectId, amount) : Observable<BackendMessage> {
    const params = {
      projectId,
      amount
    };
    return this.http.post(`${this.url}/enterPayemtInfo`, params) as Observable<BackendMessage>;
  }

  getProjectInfo(projectId): Observable<BackendMessage> {
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get(`${this.url}/getProjectInfo`, {params}) as Observable<BackendMessage>;
  }

  getNextStage(projectId): Observable<BackendMessage> {
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get(`${this.url}/nextStageById`, {params}) as Observable<BackendMessage>;
  }

  getStageInfo(stage): Observable<BackendMessage> {
    let params = new HttpParams();
    params = params.append('stage', stage);
    return this.http.get(`${this.url}/stageInfo`, {params}) as Observable<BackendMessage>;
  }

  saveSearchResults(searchResults: Array<ProjectData>){
    sessionStorage.setItem('search-results', JSON.stringify(searchResults));
  }

  getSearchResults(): Array<ProjectData>{
    return JSON.parse(sessionStorage.getItem('search-results'));
  };

  search(projectName, division, landUser, lotId, state,mainProjectName): Observable<BackendMessage> {
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
    if (mainProjectName != null) {
      params = params.append('mainProjectName', mainProjectName);
    }
    return this.http.get(`${this.url}/search`, {params}) as Observable<BackendMessage>;
  }

  searchMainProject(mainProjectName){
    let params = new HttpParams();
    if (mainProjectName != null) {
      params = params.append('mainProjectName', mainProjectName);
    }
    return this.http.get(`${this.url}/searchMainProject`, {params}) as Observable<BackendMessage>;
  }

  
  
  getProjectStage(projectId): Observable<BackendMessage> {
    let params = new HttpParams();
    params = params.append('projectId', projectId);
    return this.http.get(`${this.url}/stateById`, {params}) as Observable<BackendMessage>;
  }

  sendToNextStage(projectId, nextStage): Observable<BackendMessage> {
    const params = {
      projectId,
      nextStage
    };
    return this.http.post(`${this.url}/sendToNextStage`, params) as Observable<BackendMessage>;
  }
}
