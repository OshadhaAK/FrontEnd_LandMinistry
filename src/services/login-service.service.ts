import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  url = 'http://localhost:3301';

  constructor(private http: HttpClient) { }

  /* POST FUNCTIONS */
  login(email : string, password : string){
    const params ={
      email : email,
      password : password
    };
    return this.http.post(`${this.url}/login`,params);
  }

  getUser(uid : string){
    const params ={
      uid : uid
    };
    return this.http.post(`${this.url}/getUser`,params);
  }
  
  createUser(email : string ,telephone : number ,name :string ,password: string ,category:string,user_type:string){
    const params ={
      email:email,
      telephone : telephone,
      name:name,
      password:password,
      category : category,
      user_type : user_type
    };
    return this.http.post(`${this.url}/user/createUser`,params);
  }

  approveUser(uid : string){
    const params ={
      uid : uid
    };
    return this.http.post(`${this.url}/approveUser`,params);
  }

  rejectUser(uid : string){
    const params ={
      uid : uid
    };
    return this.http.post(`${this.url}/rejectUser`,params);
  }

  deleteUser(uid : string){
      const params ={
        uid : uid
      };
      return this.http.post(`${this.url}/deleteUser`,params);
  }

  verifyUser(token : string){
    const params ={
      token : token
    };
    return this.http.post(`${this.url}/verify`,params);
  }

  changePassword(uid:string,email:string,oldPassword:string,newPassword : string){
    const params ={
      uid : uid,
      email : email,
      oldPassword : oldPassword,
      newPassword : newPassword
    };
    return this.http.post(`${this.url}/login/changePassword`,params);
  }

  forgotPassword(email : string){
    const params ={
      email : email
    };
    return this.http.post(`${this.url}/reset/forgotPassword`,params);
  }

  resetPassword(token:string,newPassword:string,verifyPassword:string){
    const params ={
      token : token,
      newPassword : newPassword,
      verifyPassword : verifyPassword
    };
    return this.http.post(`${this.url}/reset/resetPassword`,params);
  }

  /* GET FUNCTIONS */

  getAllUsers(){
    return this.http.get(`${this.url}/allUsers`);
  }

  getApprovedUsers(){
    return this.http.get(`${this.url}/approvedUsers`);
  }

  getRejectedUsers(){
    return this.http.get(`${this.url}/rejectedUsers`);
  }

  getPendingUsers(){
    return this.http.get(`${this.url}/user/pendingUsers`);
  }
  


}
