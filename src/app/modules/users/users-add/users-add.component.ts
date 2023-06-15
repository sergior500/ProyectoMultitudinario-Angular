import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { token } from 'src/app/interfaces/token.inteface';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UsersService, private route:Router) { }



  myForm: FormGroup = this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    first_name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    email:['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
    password:['',Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')],
    role: ['USER', Validators.required]
  },)

  ngOnInit(): void {



  }

  notValidField(field:string){
    return this.myForm.controls[field].errors &&
    this.myForm.controls[field].touched;
    
  }


  save(){

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }else{
      this.userService.addUser(this.myForm.value)
                  .subscribe({
                    next:(resp) => {
                      Swal.fire(
                        'Good job!',
                        'You registed correctly!',
                        'success'
                      ).then((result)=>{
                        if (result.isConfirmed) {
                          this.route.navigate(["/"]);
                        }
                      })

                    },
                    error:(err) => {

                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User already exist!',
                      })
                    }
                  })
    }
  }
}
