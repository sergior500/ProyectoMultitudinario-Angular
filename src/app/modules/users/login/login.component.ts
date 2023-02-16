import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;

  isValid:boolean = false;

  password:string ="";
  
  constructor() { }

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
    console.log(this.myForm);
    this.myForm.resetForm();
    Swal.fire(
      'Good job!',
      'You logged correctly!',
      'success'
    )
  }
}
