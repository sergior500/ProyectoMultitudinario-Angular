import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  myForm: FormGroup = this.fb.group({
    user:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    fName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
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
    }

    console.log(this.myForm.value)
    this.myForm.reset({})
  }
}
