import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ArticleService } from '../article-Services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor(private fb: FormBuilder,private service: ArticleService) { }

  myForm: FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    price:['',[Validators.required,Validators.min(0.1)]],
    stock:['',[Validators.required,Validators.min(1)]],
    description:['',Validators.required,Validators.minLength(4)],
    categoryName:['',Validators.required,Validators.minLength(2)]
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

    this.service.saveArticle(this.myForm.value)
    .subscribe({
      next:(res)=>{
        Swal.fire(
          'Good job!',
          'You have created a new product!',
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

    console.log(this.myForm.value)
    this.myForm.reset({})
  }
}

