import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../articles/article-Services/article.service';
import { Content } from 'src/app/interfaces/article.interface';
import { forkJoin, map, switchMap } from 'rxjs';
import { MostPurchasedArticles } from 'src/app/interfaces/mostPurchasedArticles.interface';
import { productos } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private articleService: ArticleService, private cartservice: CartService) { }

  articles : Content[] = [];
  product : productos = {
    id: 0,
    quantity : 0
  };

  ngOnInit(): void {
    this.getMostPurchasedArticles();
  }

  getMostPurchasedArticles() {

    //  this.articleService.getMostByedArticles().subscribe({
    //    next: (resp) => {
    //      for(let article of resp){
    //        this.articleService.article(article.idProduct).subscribe({
    //          next: (resp) => {
    //            let articleAux = resp;
    //            if(articleAux.listImage.length == 0){
    //              articleAux.listImage.push({id:1, url:"https://res.cloudinary.com/df7eewfeo/image/upload/v1678443061/no-image-icon-15_osj7ye.png"})
    //            }
    //            this.articles.push(articleAux)
    //            console.log(resp)
    //          }
    //        })
    //      }
    //    }
    //  })

    this.articleService.getMostByedArticles().pipe(
      map((resp: MostPurchasedArticles[])  => resp.map(article  => this.articleService.article(article.idProduct)))
    ).subscribe(articleObservables => {
      forkJoin(articleObservables).subscribe(responses => {
        for (let resp of responses) {
          let articleAux = resp;
          if (articleAux.listImage.length == 0) {
            articleAux.listImage.push({ id: 1, url: "https://res.cloudinary.com/df7eewfeo/image/upload/v1678443061/no-image-icon-15_osj7ye.png" });
          }
          this.articles.push(articleAux);
          
        }
      });
    });
  }

  addToCart(id:number, quantity:number ){
    this.product.id = id;
    console.log(this.product)
    console.log(quantity)
    this.cartservice.addToCart(this.product,quantity);

    Swal.fire(
      'Good job!',
      'Your item has been added!',
      'success'
    )

  }
}
