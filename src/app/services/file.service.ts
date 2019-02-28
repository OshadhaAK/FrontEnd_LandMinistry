import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = 'http://localhost:3301/files';
  constructor(private http: HttpClient) { }

  uploadFile(projectId, file){
    let params = {
      projectId: projectId,
      file: file
    }
    return this.http.post(`${this.url}/uploadFile`, params);
  }

  getProjectFiles(projectId){
    let params = new HttpParams()
    params = params.append('projectId', projectId)
    return this.http.get(`${this.url}/projectFiles`, {params:params});
  }

  getFileInfo(fileId){
    let params = new HttpParams()
    params = params.append('fileId', fileId)
    return this.http.get(`${this.url}/fileInfo`)
  }

  
}
