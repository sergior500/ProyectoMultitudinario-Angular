import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
    
    constructor(private http:HttpClient) { 

    }

    private url:string = 'http://localhost:8086'

    httpOptions={
        headers: new HttpHeaders({'Content-Type':'application/json'})
      }
     
      admin=false;
      loggedIn = false;
    
    
       isAuthenticated(){
        return this.http.get<any>(`http://localhost:8000/jwt`)
        .pipe(switchMap(resp=>{
            return of(true)
        }),catchError(error=>{
          return of(false)
        }))
      }
      // isAuthenticated() {
      //   return localStorage.getItem('loggin')==='true'
      // }
      
      login(user:string,password:string): Observable<boolean> {
        return this.http.post<any>(`${this.url}/signin`,{'username':user,'password':password}, this.httpOptions)
        .pipe(switchMap(resp=>{
          
            localStorage.setItem('token', resp.token);
            localStorage.setItem('loggin',"true");
            return of(true);
    
          }),catchError(error=>{
            console.log(error)
            localStorage.setItem('loggin',"false");
            localStorage.removeItem("token");
            return of(false);
          }))
    
       
        
      }
      onlogout(){
        localStorage.setItem('loggin','false');
        localStorage.removeItem("token");
      }
    }