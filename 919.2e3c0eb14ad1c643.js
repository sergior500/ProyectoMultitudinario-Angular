"use strict";(self.webpackChunkvidactiva=self.webpackChunkvidactiva||[]).push([[919],{8919:(G,g,c)=>{c.r(g),c.d(g,{ServiceModuleModule:()=>V});var d=c(6895),l=c(3546),v=c(7155),_=c(9549),p=c(2778),h=c(6308),Z=c(4333),o=c(4006),u=c(5197),x=c(5861),y=c(5226),s=c.n(y),e=c(1571),f=c(58);function C(t,r){1&t&&(e.TgZ(0,"span",24),e._uU(1," Invalid Name "),e.qZA())}function A(t,r){1&t&&(e.TgZ(0,"span",24),e._uU(1," Invalid Price "),e.qZA())}function T(t,r){1&t&&(e.TgZ(0,"span",24),e._uU(1," Invalid Stock "),e.qZA())}function S(t,r){1&t&&(e.TgZ(0,"span",24),e._uU(1," Invalid Description "),e.qZA())}let U=(()=>{class t{constructor(n,i,a){this.fb=n,this.service=i,this.route=a,this.myForm=this.fb.group({name:["",[o.kI.required,o.kI.minLength(3),o.kI.maxLength(12)]],price:["",[o.kI.required,o.kI.min(.1)]],days_duration:["",[o.kI.required,o.kI.min(1)]],description:["",[o.kI.required,o.kI.minLength(4)]],category_service:["",[o.kI.required]]})}ngOnInit(){}notValidField(n){return this.myForm.controls[n].errors&&this.myForm.controls[n].touched}save(){var n=this;return(0,x.Z)(function*(){n.service.saveService(n.myForm.value).subscribe({next:i=>{n.route.navigate(["/services"]),s().fire("Good job!","You have created a new category!","success")},error:i=>{s().fire({icon:"error",title:"Oops...",text:"Something went wrong!"})}})})()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(o.qu),e.Y36(f.m),e.Y36(u.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-add-service"]],decls:43,vars:6,consts:[[1,"bg-image",2,"background-color","#111010"],[1,"mask","d-flex","align-items-center","gradient-custom-3"],[1,"container"],[1,"row","d-flex","justify-content-center","align-items-center"],[1,"col-12","col-md-9","col-lg-7","col-xl-6"],[1,"card",2,"border-radius","15px"],[1,"card-body","p-5"],[1,"text-uppercase","text-center","mb-5"],["autocomplete","off",1,"form-horizontal",3,"formGroup","ngSubmit"],[1,"form-outline","mb-4"],["for","form3Example1cg",1,"form-label"],["type","text","id","form3Example1cg","formControlName","name",1,"form-control","form-control-lg"],["class","form-text text-danger",4,"ngIf"],["type","number","id","form3Example1cg","step","0.01","formControlName","price",1,"form-control","form-control-lg"],["for","form3Example3cg",1,"form-label"],["type","number","id","form3Example3cg","formControlName","days_duration",1,"form-control","form-control-lg"],["for","form3Example4cg",1,"form-label"],["type","text","id","pass1","formControlName","description",1,"form-control","form-control-lg"],["formControlName","category_service","id","categoryName",1,"form-control","form-control-lg"],["value","mensual"],["value","trimestral"],["value","anual"],[1,"d-flex","justify-content-center"],["type","submit",1,"btn","btn-dark","btn-block","btn-lg","gradient-custom-4",3,"disabled"],[1,"form-text","text-danger"]],template:function(n,i){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"h2",7),e._uU(8,"Create a Service "),e.qZA(),e.TgZ(9,"form",8),e.NdJ("ngSubmit",function(){return i.save()}),e.TgZ(10,"div",9)(11,"label",10),e._uU(12,"Name"),e.qZA(),e._UZ(13,"input",11),e.YNc(14,C,2,0,"span",12),e.qZA(),e.TgZ(15,"div",9)(16,"label",10),e._uU(17,"Price"),e.qZA(),e._UZ(18,"input",13),e.YNc(19,A,2,0,"span",12),e.qZA(),e.TgZ(20,"label",14),e._uU(21,"Duration Days"),e.qZA(),e.TgZ(22,"div",9),e._UZ(23,"input",15),e.YNc(24,T,2,0,"span",12),e.qZA(),e.TgZ(25,"label",16),e._uU(26,"Description"),e.qZA(),e.TgZ(27,"div",9),e._UZ(28,"input",17),e.YNc(29,S,2,0,"span",12),e.qZA(),e.TgZ(30,"div",9)(31,"label",16),e._uU(32," Category"),e.qZA(),e.TgZ(33,"select",18)(34,"option",19),e._uU(35," Mensual"),e.qZA(),e.TgZ(36,"option",20),e._uU(37,"Trimestral"),e.qZA(),e.TgZ(38,"option",21),e._uU(39,"Anual"),e.qZA()()(),e.TgZ(40,"div",22)(41,"button",23),e._uU(42,"Add"),e.qZA()()()()()()()()()()),2&n&&(e.xp6(9),e.Q6J("formGroup",i.myForm),e.xp6(5),e.Q6J("ngIf",i.notValidField("name")),e.xp6(5),e.Q6J("ngIf",i.notValidField("price")),e.xp6(5),e.Q6J("ngIf",i.notValidField("days_duration")),e.xp6(5),e.Q6J("ngIf",i.notValidField("description")),e.xp6(12),e.Q6J("disabled",i.myForm.invalid))},dependencies:[d.O5,o._Y,o.YN,o.Kr,o.Fj,o.wV,o.EJ,o.JJ,o.JL,o.sg,o.u]}),t})();var I=c(1816);const q=function(t){return["/services/update",t]};function N(t,r){if(1&t){const n=e.EpF();e.TgZ(0,"p")(1,"button",8),e.NdJ("click",function(){e.CHM(n);const a=e.oxw().$implicit,m=e.oxw();return e.KtG(m.delete(a.id))}),e._uU(2," Delete "),e.qZA(),e._UZ(3,"br")(4,"br"),e.TgZ(5,"a",9)(6,"button",10),e._uU(7," Update "),e.qZA()()()}if(2&t){const n=e.oxw().$implicit;e.xp6(5),e.Q6J("routerLink",e.VKq(1,q,n.id))}}function k(t,r){if(1&t){const n=e.EpF();e.TgZ(0,"button",11),e.NdJ("click",function(){e.CHM(n);const a=e.oxw().$implicit,m=e.oxw();return e.KtG(m.contratar(a.id))}),e._uU(1," Contratar "),e.qZA()}}function F(t,r){if(1&t&&(e.TgZ(0,"mat-card",5)(1,"mat-card-header")(2,"mat-card-title"),e._uU(3),e.qZA(),e.TgZ(4,"mat-card-subtitle"),e._uU(5),e.qZA()(),e.TgZ(6,"mat-card-content")(7,"p")(8,"b"),e._uU(9,"Descripci\xf3n: "),e.qZA(),e._uU(10),e.qZA(),e.TgZ(11,"p")(12,"b"),e._uU(13,"Duration Days: "),e.qZA(),e._uU(14),e.qZA(),e.TgZ(15,"p")(16,"b"),e._uU(17,"Category: "),e.qZA(),e._uU(18),e.qZA(),e.TgZ(19,"p")(20,"b"),e._uU(21,"Price: "),e.qZA(),e._uU(22),e.qZA()(),e.TgZ(23,"mat-card-actions"),e.YNc(24,N,8,3,"p",6),e.YNc(25,k,2,0,"button",7),e._UZ(26,"br")(27,"br"),e.qZA()()),2&t){const n=r.$implicit,i=e.oxw();e.xp6(3),e.Oqu(n.name),e.xp6(2),e.Oqu(n.description),e.xp6(5),e.hij("",n.description," "),e.xp6(4),e.hij("",n.days_duration," "),e.xp6(4),e.hij("",n.category_service," "),e.xp6(4),e.hij("",n.price," \u20ac "),e.xp6(2),e.Q6J("ngIf","ADMIN"==i.admin),e.xp6(1),e.Q6J("ngIf",""!=i.admin)}}const J=function(){return["/services/add"]};function Y(t,r){1&t&&(e.TgZ(0,"a",9)(1,"button",12),e._uU(2,"Add Service"),e.qZA()()),2&t&&e.Q6J("routerLink",e.DdM(1,J))}const M=function(){return[3,5]};function O(t,r){1&t&&e._UZ(0,"mat-paginator",13),2&t&&e.Q6J("pageSizeOptions",e.DdM(1,M))}const w=function(){return[3,5,10]};function L(t,r){1&t&&e._UZ(0,"mat-paginator",13),2&t&&e.Q6J("pageSizeOptions",e.DdM(1,w))}let b=(()=>{class t{constructor(n,i){this.serviceService=n,this.changeDetectorRef=i,this.articles=[],this.error=!0,this.user="",this.admin=""}ngOnInit(){this.articleList(),this.token=(0,I.Z)(localStorage.getItem("token")),this.token&&(this.user=this.token.sub,this.admin=this.token.role)}ngOnDestroy(){this.dataSource&&this.dataSource.disconnect()}addToCart(n){s().fire("Good job!","Your item has been added!","success")}articleList(){this.serviceService.serviceList().subscribe({next:n=>{this.dataSource=new v.by(n),this.changeDetectorRef.detectChanges(),this.dataSource.paginator=this.paginator,this.obs=this.dataSource.connect(),this.error=!1}})}delete(n){const i=s().mixin({customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger"},buttonsStyling:!1});i.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel!",reverseButtons:!0}).then(a=>{a.isConfirmed?(this.serviceService.deleteService(n).subscribe({next:m=>{}}),i.fire("Deleted!","Your file has been deleted.","success").then(()=>{this.articleList()})):a.dismiss===s().DismissReason.cancel&&i.fire("Cancelled","Your file is safe :)","error")})}contratar(n){const i=s().mixin({customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger"},buttonsStyling:!1});i.fire({title:"Are you sure?",text:"You will buy a subscription and you will not be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, subscribe!",cancelButtonText:"No, cancel!",reverseButtons:!0}).then(a=>{a.isConfirmed?(this.serviceService.contratarService(n,this.user).subscribe({next:m=>{}}),i.fire("Subscribed!","You have subscribed correctly.","success").then(()=>{this.articleList()})):a.dismiss===s().DismissReason.cancel&&i.fire("Cancelled","Your file is safe :)","error")})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(f.m),e.Y36(e.sBO))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-service-list"]],viewQuery:function(n,i){if(1&n&&e.Gf(p.NW,5),2&n){let a;e.iGM(a=e.CRH())&&(i.paginator=a.first)}},decls:7,vars:6,consts:[[1,"container-fluid"],["class","example-card",4,"ngFor","ngForOf"],[1,"sticky"],[3,"routerLink",4,"ngIf"],[3,"pageSizeOptions",4,"ngIf"],[1,"example-card"],[4,"ngIf"],["class","btn btn-success",3,"click",4,"ngIf"],[1,"btn","btn-danger",3,"click"],[3,"routerLink"],[1,"btn","btn-warning"],[1,"btn","btn-success",3,"click"],["type","button",1,"btn","btn-success","boton"],[3,"pageSizeOptions"]],template:function(n,i){1&n&&(e.TgZ(0,"div",0),e.YNc(1,F,28,8,"mat-card",1),e.ALo(2,"async"),e.qZA(),e.TgZ(3,"div",2),e.YNc(4,Y,3,2,"a",3),e.YNc(5,O,1,2,"mat-paginator",4),e.YNc(6,L,1,2,"mat-paginator",4),e.qZA()),2&n&&(e.xp6(1),e.Q6J("ngForOf",e.lcZ(2,4,i.obs)),e.xp6(3),e.Q6J("ngIf","ADMIN"==i.admin),e.xp6(1),e.Q6J("ngIf","ADMIN"==i.admin),e.xp6(1),e.Q6J("ngIf","ADMIN"!=i.admin))},dependencies:[d.sg,d.O5,u.yS,l.a8,l.dk,l.dn,l.n5,l.$j,l.hq,p.NW,d.Ov],styles:[".container[_ngcontent-%COMP%]{margin-top:20px}.example-card[_ngcontent-%COMP%]{margin-bottom:20px}.example-header-image[_ngcontent-%COMP%]{width:40px;height:40px;background-color:#ccc;border-radius:50%}.image-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.sticky[_ngcontent-%COMP%]{position:sticky;bottom:0;background-color:#f9f9f9;padding:10px}.boton[_ngcontent-%COMP%]{margin-bottom:10px}@media (min-width: 992px){table[_ngcontent-%COMP%]{background-color:#fff}.container-fluid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(5,1fr)}.example-card[_ngcontent-%COMP%]{margin:25px;width:300px}.sticky[_ngcontent-%COMP%]{position:absolute;bottom:0;width:100%;display:flex;background-color:#fff;justify-content:space-between;align-items:center}.boton[_ngcontent-%COMP%]{margin-left:20px;height:10%}}@media (max-width: 992px){.col-md-4[_ngcontent-%COMP%]{flex-basis:50%;max-width:50%}}@media (max-width: 768px){.col-sm-6[_ngcontent-%COMP%]{flex-basis:50%;max-width:50%}}"]}),t})();function D(t,r){1&t&&(e.TgZ(0,"span",25),e._uU(1," Invalid Name "),e.qZA())}function Q(t,r){1&t&&(e.TgZ(0,"span",25),e._uU(1," Invalid Price "),e.qZA())}function B(t,r){1&t&&(e.TgZ(0,"span",25),e._uU(1," Invalid Stock "),e.qZA())}function j(t,r){1&t&&(e.TgZ(0,"span",25),e._uU(1," Invalid Description "),e.qZA())}const P=[{path:"add",component:U},{path:"list",component:b},{path:"",component:b},{path:":id",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-service"]],decls:2,vars:0,template:function(n,i){1&n&&(e.TgZ(0,"p"),e._uU(1,"service works!"),e.qZA())}}),t})()},{path:"update/:id",component:(()=>{class t{constructor(n,i,a,m){this.fb=n,this.service=i,this.route=a,this.router=m,this.myForm=this.fb.group({name:["",[o.kI.required,o.kI.minLength(3)]],price:["",[o.kI.required,o.kI.min(.1)]],days_duration:["",[o.kI.required,o.kI.min(1)]],description:["",[o.kI.required,o.kI.minLength(4)]],category_service:["",[o.kI.required]]})}ngOnInit(){this.id=this.route.snapshot.params.id,this.service.article(this.id).subscribe({next:n=>{this.myForm.setValue({name:n.name,price:n.price,days_duration:n.days_duration,description:n.description,category_service:n.category_service})}})}notValidField(n){return this.myForm.controls[n].errors&&this.myForm.controls[n].touched}save(){this.myForm.invalid?this.myForm.markAllAsTouched():(this.service.updateService(this.myForm.value,this.id).subscribe({next:n=>{s().fire("Great!","The product has been updated!","success")},error:n=>{s().fire({icon:"error",title:"Oops...",text:"Something went wrong!"})}}),this.router.navigate(["/services"]))}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(o.qu),e.Y36(f.m),e.Y36(u.gz),e.Y36(u.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-update-service"]],decls:43,vars:5,consts:[[1,"bg-image",2,"background-color","#111010"],[1,"mask","d-flex","align-items-center","gradient-custom-3"],[1,"container"],[1,"row","d-flex","justify-content-center","align-items-center"],[1,"col-12","col-md-9","col-lg-7","col-xl-6"],[1,"card",2,"border-radius","15px"],[1,"card-body","p-5"],[1,"text-uppercase","text-center","mb-5"],["autocomplete","off",1,"form-horizontal",3,"formGroup","ngSubmit"],[1,"form-outline","mb-4"],["for","form3Example1cg",1,"form-label"],["type","text","id","form3Example1cg","formControlName","name",1,"form-control","form-control-lg"],["class","form-text text-danger",4,"ngIf"],["type","number","id","form3Example1cg","step","0.01","formControlName","price",1,"form-control","form-control-lg"],["for","form3Example3cg",1,"form-label"],["type","number","id","form3Example3cg","formControlName","days_duration",1,"form-control","form-control-lg"],["for","form3Example4cg",1,"form-label"],["type","text","id","pass1","formControlName","description",1,"form-control","form-control-lg"],["for","form3Example5cg",1,"form-label"],["formControlName","category_service","id","categoryName",1,"form-control","form-control-lg"],["value","mensual"],["value","trimestral"],["value","anual"],[1,"d-flex","justify-content-center"],["type","submit",1,"btn","btn-dark","btn-block","btn-lg","gradient-custom-4"],[1,"form-text","text-danger"]],template:function(n,i){1&n&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"h2",7),e._uU(8,"Update Article"),e.qZA(),e.TgZ(9,"form",8),e.NdJ("ngSubmit",function(){return i.save()}),e.TgZ(10,"div",9)(11,"label",10),e._uU(12,"Name"),e.qZA(),e._UZ(13,"input",11),e.YNc(14,D,2,0,"span",12),e.qZA(),e.TgZ(15,"div",9)(16,"label",10),e._uU(17,"Price"),e.qZA(),e._UZ(18,"input",13),e.YNc(19,Q,2,0,"span",12),e.qZA(),e.TgZ(20,"label",14),e._uU(21,"Duration Days"),e.qZA(),e.TgZ(22,"div",9),e._UZ(23,"input",15),e.YNc(24,B,2,0,"span",12),e.qZA(),e.TgZ(25,"label",16),e._uU(26,"Description"),e.qZA(),e.TgZ(27,"div",9),e._UZ(28,"input",17),e.YNc(29,j,2,0,"span",12),e.qZA(),e.TgZ(30,"label",18),e._uU(31,"Category"),e.qZA(),e.TgZ(32,"div",9)(33,"select",19)(34,"option",20),e._uU(35," Mensual"),e.qZA(),e.TgZ(36,"option",21),e._uU(37,"Trimestral"),e.qZA(),e.TgZ(38,"option",22),e._uU(39,"Anual"),e.qZA()()(),e.TgZ(40,"div",23)(41,"button",24),e._uU(42,"Add"),e.qZA()()()()()()()()()()),2&n&&(e.xp6(9),e.Q6J("formGroup",i.myForm),e.xp6(5),e.Q6J("ngIf",i.notValidField("name")),e.xp6(5),e.Q6J("ngIf",i.notValidField("price")),e.xp6(5),e.Q6J("ngIf",i.notValidField("days_duration")),e.xp6(5),e.Q6J("ngIf",i.notValidField("description")))},dependencies:[d.O5,o._Y,o.YN,o.Kr,o.Fj,o.wV,o.EJ,o.JJ,o.JL,o.sg,o.u]}),t})()}];let E=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.Bz.forChild(P),u.Bz]}),t})(),V=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[d.ez,E,l.QW,v.p0,_.lN,p.TU,h.JX,Z.JX,o.u5,o.UX]}),t})()}}]);