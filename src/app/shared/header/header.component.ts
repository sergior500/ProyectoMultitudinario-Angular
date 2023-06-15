import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { token } from 'src/app/interfaces/token.inteface';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UsersService) { 
    window.addEventListener('resize', () => {
      this.isCollapsed = this.obtenerTamanoPantalla();
    });
  }
  token !:token;
  user : string = "";
  admin : string = "";
  isCollapsed = "nonCollapsed";

  ngOnInit(): void {
    const aux = localStorage.getItem('token');
    if(aux){
      this.token = jwtDecode(aux!)
    }
    if(this.token){
      this.user = this.token.sub;
      this.admin = this.token.role;
    }
  }
  
  onLogout(){
    this.userService.onlogout();
    window.location.reload()
    
    
  }
  collapse(){
    if(this.isCollapsed ==="collapse"){
    this.isCollapsed= "nonCollapsed";
  }else{
    this.isCollapsed= "collapse";
  }
}
obtenerTamanoPantalla(): string {
  const screenWidth = window.innerWidth;

  if (screenWidth < 992) {
    return 'collapse';
  }  else {
    return 'nonCollapsed';
  }
}
}
