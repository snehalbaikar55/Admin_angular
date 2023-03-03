import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http:HttpClient) { }

  signup(data: { Name: null; email: null; password: null; password_confirmation: null; mobile_no: null; role: null; }){
    return this.http.post('http://127.0.0.1:8000/api/signup',data);
  
   }
   login(data: { email: any; password: any; }){
    return this.http.post('http://127.0.0.1:8000/api/login',data);
  
   }
}
  