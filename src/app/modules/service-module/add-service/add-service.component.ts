import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { token } from 'src/app/interfaces/token.inteface';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  constructor(private fb: FormBuilder,private service: ServiceService, private route : Router) { }

  myForm: FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    price:['',[Validators.required,Validators.min(0.1)]],
    days_duration:['',[Validators.required,Validators.min(1)]],
    description:['',[Validators.required,Validators.minLength(4)]],
    category_service:['',[Validators.required]]

  },)

  token !:token;

  ngOnInit(): void {
    
  }

  notValidField(field:string){
    return this.myForm.controls[field].errors &&
    this.myForm.controls[field].touched;
  }

async save(){
  this.service.saveService(this.myForm.value)
  .subscribe({
    next:(res)=>{
      this.route.navigate(["/services"])
      Swal.fire(
        'Good job!',
        'You have created a new category!',
        'success'
      )
        
  },
    error:(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }})
  }
}

