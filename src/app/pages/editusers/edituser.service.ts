import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class EditusersService {

  constructor (private http:HttpClient) {}

  getUsersdetails(){
    return this.http.get('http://127.0.0.1:8000/api/users/'); 
    }

    deleteuser(ID:any){
      return this.http.delete('http://127.0.0.1:8000/api/users/'+ID); 

    }
    deleteUserdata(ID: any){
      return this.http.delete('http://127.0.0.1:8000/api/users/'+ID);
    
    }
    updateusers(ID: any,data: any){
     return this.http.patch('http://127.0.0.1:8000/api/users/'+ID,data);
      
      
    }
    getuserslist(user_id: any){
      return this.http.get('http://127.0.0.1:8000/api/users/'+user_id);
    
    }
}
