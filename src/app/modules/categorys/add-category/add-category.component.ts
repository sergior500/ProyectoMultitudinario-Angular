import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from '../category-Services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder,private service: CategoryService, private router: Router) { }

  myForm: FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]]

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
    }

    this.service.saveCategory(this.myForm.value)
    .subscribe({
      next:(res)=>{
        this.router.navigate(["/categorys"])
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

    
    this.myForm.reset({})
  }
}
