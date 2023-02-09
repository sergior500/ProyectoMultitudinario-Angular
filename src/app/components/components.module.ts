import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { ServicesComponent } from './services/services.component';
import { GymServiceComponent } from './gym-service/gym-service.component';
import { ActivitiesAndServicesComponent } from './activities-and-services/activities-and-services.component';



@NgModule({
  declarations: [
    ArticlesComponent,
    ServicesComponent,
    GymServiceComponent,
    ActivitiesAndServicesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
