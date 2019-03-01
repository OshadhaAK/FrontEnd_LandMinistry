import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  search(projectName, division, landUser, lotId, state){
    let params = new HttpParams()
    params = params.append('projectName',projectName)
    params = params.append('division',division)    
    params = params.append('landUser',landUser)    
    params = params.append('lotId',lotId)    
    params = params.append('state',state)
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
