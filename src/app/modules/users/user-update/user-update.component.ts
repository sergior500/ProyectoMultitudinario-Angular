import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { token } from '../../../interfaces/token.inteface';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UsersService, private activatedRoute: ActivatedRoute,private route:Router) { }
  
  token !:token;
  username !: string;

  myForm: FormGroup = this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    first_name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    altura:['',[Validators.required,Validators.min(0.1)]],
    peso:['',[Validators.required,Validators.min(0.1)]],
    role: ['USER', Validators.required]
  },)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['id'];
    this.token = jwtDecode(localStorage.getItem('token')!)

    this.userService.user(this.username)
                  .subscribe({
                    next: (resp) => {
                      this.myForm.setValue({
                         username : resp.username,
                         first_name: resp.first_name,
                         peso: resp.peso,
                         altura: resp.altura,
                         role : resp.role
                      })
                    }
                  })

  }

  notValidField(field:string){
    return this.myForm.controls[field].errors &&
    this.myForm.controls[field].touched;
    
  }
  save(){
    
    this.userService.updateUser(this.myForm?.controls['username'].value,this.myForm.value)
                      .subscribe({
                        next: (resp) => {
                          Swal.fire(
                            'Great!',
                            'The user has been updated!',
                            'success'
                          ).then(() => {
                            this.route.navigate(['/user']);
                          }
                          )
                        },
                        error:(err) =>{
                          
                          
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                          })
                        }})
  }
}
