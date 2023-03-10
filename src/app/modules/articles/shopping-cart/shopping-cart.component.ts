import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/carrito.service';
import { productos } from '../../../interfaces/product.interface';
import { token } from 'src/app/interfaces/token.inteface';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Content } from '../../../interfaces/article.interface';
import { ArticleService } from '../article-Services/article.service';
import { shoppingCart } from '../../../interfaces/shopingCart.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private carro:CartService, private route:Router, private product:ArticleService) { }
  token !:token;
  user : string = "";
  cart : productos[] = []

  productos: shoppingCart[] = []

  ngOnInit(): void {
    this.token = jwtDecode(localStorage.getItem('token')!)
    if(this.token){
      this.user = this.token.sub;
    }
    this.cart = this.carro.getCart();

    for(let item of this.cart){
      this.product.article(item.id)
                  .subscribe({
                    next:(resp) => (
                      this.productos.push({product: resp, quantity: item.quantity})
                    )
                  })
                  
    }
    

  }
  
  deleteFromCart(id:number){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.carro.deleteFromCart(id)
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(() => {
            window.location.reload()
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }

  buy(){
    this.carro.buy(this.user)
    .subscribe({
      next: (resp) => {
        Swal.fire(
          'Comprado!',
          'Los articulos han sido comprados correctamente.',
          'success'
        ).then((resp) => {
          this.carro.clearCart();
          window.location.reload();
          this.route.navigateByUrl('/articles');
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

}
