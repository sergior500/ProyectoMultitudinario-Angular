import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;

  isValid:boolean = false;

  password:string ="";
  
  constructor(private service: UsersService, private route: Router) { }

  ngOnInit(): void {
  }

  notValid(value:string): boolean{
    return this.myForm?.controls[value]?.invalid &&
      this.myForm?.controls[value]?.touched
  }

   validatePasswordModerate() {
    
    const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
    if(!passwordRegex.test(this.password) && !this.myForm?.controls['password']?.pristine){
      this.isValid = true;
    }else{
      this.isValid = false;
    }
    return this.isValid;
}

  save() {
     
    this.service.login(this.myForm?.controls['username'].value,this.myForm?.controls['password'].value)
                        .subscribe((resp)=>{
                          if(resp){
                            Swal.fire(
                              'Good job!',
                              'You logged correctly!',
                              'success'
                            ).then(() => {
                              window.location.reload()
                             })

                            this.route.navigate(["/"]);
                              
                              
                          }else{
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Something went wrong!',
                            })
                          }
                            this.myForm.resetForm();
    
                        })
   
    
  }
}
