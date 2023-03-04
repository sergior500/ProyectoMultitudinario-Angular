import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UsersService, private route:Router) { }

  myForm: FormGroup = this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    first_name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    email:['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
    password:['',Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')],
    rpassword:[''],
    check:[false, Validators.requiredTrue]
  },)

  ngOnInit(): void {
  }

  notValidField(field:string){
    return this.myForm.controls[field].errors &&
    this.myForm.controls[field].touched;
  }

 passwordValidator(): ValidatorFn {
  return () => {
    const password:string = this.myForm.get('password')?.value;
    const repeat_password:string = this.myForm.get('repeat_password')?.value;

    if(password!==repeat_password) return {isValid:false};      
    
    return null;
  };
}
  save(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }else{
      this.userService.register(this.myForm?.controls['username'].value,this.myForm?.controls['password'].value,this.myForm?.controls['email'].value,this.myForm?.controls['first_name'].value)
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
                      this.myForm.reset({})
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User already exist!',
                      })
                    }
                  })
    }

  
    console.log(this.myForm.value)
    
  }
}
