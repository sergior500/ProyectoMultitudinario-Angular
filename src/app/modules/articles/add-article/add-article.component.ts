import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormGroup } from '@angular/forms';
import { Category } from 'src/app/interfaces/category.interface';
import Swal from 'sweetalert2';
import { CategoryService } from '../../categorys/category-Services/category.service';
import { ArticleService } from '../article-Services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  categorias : Category[] = [];

  constructor(private fb: FormBuilder,private service: ArticleService, private catService: CategoryService, private route : Router) { }

  myForm: FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
    price:['',[Validators.required,Validators.min(0.1)]],
    stock:['',[Validators.required,Validators.min(1)]],
    description:['',[Validators.required,Validators.minLength(4)]],
    categoryName:['',[Validators.required]]
  },)



  ngOnInit(): void {

    this.catService.categoryList()
                    .subscribe({
                      next: (resp) => {
                        this.categorias = resp.content;
                      }
                    })

  }

  notValidField(field:string){
    return this.myForm.controls[field].errors &&
    this.myForm.controls[field].touched;
  }
async addImagen() {
    

  }
async save(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }

    const { value: file } = await Swal.fire({
      title: 'Selecciona la imagen',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })

    if (file) {
      this.service.saveArticle(this.myForm.value ,file)
        .subscribe({
          next: (resp) => {
            Swal.fire(
              'Añadido!',
              'La imagen ha sido añadida correctamente.',
              'success'
            ).then((resp) => {
              this.route.navigateByUrl('/articles')
            })
          },
          error: (error) => {
            console.log(error)
            Swal.fire(
              'Oops!',
              'Ocurrió un error inesperado.',
              'error'
            )
          }
        })
    }

    console.log(this.myForm.value)
    this.myForm.reset({})
  }
}

