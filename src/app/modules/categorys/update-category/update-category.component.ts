import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category-Services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder,private service: CategoryService, private route: ActivatedRoute, private router: Router) { }

  myForm: FormGroup = this.fb.group({
    name:["",[Validators.required,Validators.minLength(3)]]
  },)

  id!:number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.category(this.id)
      .subscribe({
        next: (res) => {
          this.myForm.setValue({
                name : res.name,

          })
          
        }
      })

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

    this.service.updateCategory(this.myForm.value,this.id)
    .subscribe({
      next:(res)=>{
        Swal.fire(
          'Great!',
          'The product has been updated!',
          'success'
        )
    },
      error:(err)=>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }})

    this.router.navigate(["/categorys"])
  }

}
