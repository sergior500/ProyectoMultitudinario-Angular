import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { token } from '../../../interfaces/token.inteface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  debajo: boolean = false;
  saludable:boolean = false;
  sobrepeso:boolean = false;
  obesidad1:boolean = false;
  obesidad2:boolean = false;
  obesidad3:boolean = false;
  porcent:number = 0;

  constructor(private userService: UsersService) { }
  token !:token;
  user !:User;
  ngOnInit(): void {
    this.token = jwtDecode(localStorage.getItem('token')!)

    this.userService.user(this.token.sub)
      .subscribe({
        next:(resp) => {
          this.user = resp;
          
          this.getPorcent(this.user.imc);
          this.checkImc();
        }
      })
  }

  getPorcent(imc:number){
    this.porcent = (imc/40) * 100;
    console.log(this.porcent)
  }

  checkImc(){
    if(this.user.imc < 18){
      this.debajo = true;
    }else if(this.user.imc >= 18.5 && this.user.imc < 24.9){
      this.saludable = true;
    }else if(this.user.imc >= 24.9 && this.user.imc <29.9){
      this.sobrepeso = true;
    }else if(this.user.imc >= 29.9 && this.user.imc <34.9){
      this.obesidad1 = true;
    }else if(this.user.imc >= 34.9 && this.user.imc <=40){
      this.obesidad2 = true;
    }else if(this.user.imc > 40){
      this.obesidad3 = true;
  
  }
}
}
