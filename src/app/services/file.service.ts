import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendMessage } from '../backend-message';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = 'http://localhost:3301/files';
  constructor(private http: HttpClient) { }

  uploadFile(projectId, file): Observable<BackendMessage> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('projectId', projectId);
    return this.http.post(`${this.url}/uploadFile`, formData) as Observable<BackendMessage>;
  }

  getProjectFiles(projectId): Observable<BackendMessage> {
    let params = new HttpParams()
    params = params.append('projectId', projectId)
    return this.http.get(`${this.url}/projectFiles`, {params}) as Observable<BackendMessage>;
  }

  getFileInfo(fileId): Observable<BackendMessage> {
    let params = new HttpParams()
    params = params.append('fileId', fileId);
    return this.http.get(`${this.url}/fileInfo`, {params}) as Observable<BackendMessage>;
  }

  
}
