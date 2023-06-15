import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {

  constructor(private fb: FormBuilder,private service: ServiceService, private route: ActivatedRoute,  private router: Router) { }

  myForm: FormGroup = this.fb.group({
    name:["",[Validators.required,Validators.minLength(3)]],
    price:["",[Validators.required,Validators.min(0.1)]],
    days_duration:["",[Validators.required,Validators.min(1)]],
    description:["",[Validators.required,Validators.minLength(4)]],
    category_service:["",[Validators.required]]
  },)

  id!:number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.article(this.id)
      .subscribe({
        next: (res) => {
          this.myForm.setValue({
                name : res.name,
                price : res.price,
                days_duration : res.days_duration,
                description : res.description,
                category_service : res.category_service
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

    this.service.updateService(this.myForm.value,this.id)
    .subscribe({
      next:(res)=>{
        Swal.fire(
          'Great!',
          'The product has been updated!',
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

    this.router.navigate(["/services"])
  }
}

