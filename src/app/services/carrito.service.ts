import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Users } from '../interfaces/users.inteface';
import { productos } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
    
    cart : productos[] = []

    // https://proyectomultitudinarioapi-production.up.railway.app/products
    private url:string = ' http://localhost:8080';

    constructor(private http:HttpClient) { 

    }

    httpOptions={
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    
 
    /**
     * Nos permita cargar desde el local storage el carrito a local, si este existe.
     */
    loadCart(){
      const tempCart = localStorage.getItem("cart");
      if(tempCart){
        this.cart = JSON.parse(tempCart);
      }
    }
    /**
     * Devuelve el carrito
     * @returns 
     */
    getCart(){
      this.loadCart();
      return this.cart;
    }

    /**
     * Añadimos un producto al carrito
     * @param product 
     */
    addToCart(product: productos) {
      let encontrado=false;

      let aux = this.cart.find(item => item.id === product.id);
      for(let producto of this.cart){
        if(producto.id == product.id){
          encontrado=true;
        }
      }
      if (aux) {
        aux.quantity++;
      } else if(encontrado==false) {
        this.cart.push({ id : product.id , quantity: 1 });
      }
      this.uploadCart()
    }

    
    /**
     * guardar el carrito en el local storage
     */
    uploadCart(){
      
      localStorage.setItem('cart',JSON.stringify(this.cart))
    }

    /**
     * Nos permite eliminar del carrito un producto en concreto 
     * @param id 
     */
    deleteFromCart(id: number) {
      this.loadCart();
      let itemIndex = this.cart.findIndex(item => item.id === id);
    
      if (itemIndex !== -1) {
        this.cart.splice(itemIndex, 1);
      }

      this.uploadCart()
    }

    saveCart(carti:any){
      this.cart = carti;

      console.log(carti)

      this.uploadCart();
    }

    /**
     * Vacia el carrito
     * @returns 
     */
    clearCart(){
      this.cart = []
      this.uploadCart();

      return this.cart;
    }

    /**
     * Peticion para realizar la compra
     * @param username 
     * @returns 
     */
    buy(username:string):Observable<any>{
      this.loadCart()
      console.log(this.cart)
      return this.http.post<any>(`${this.url}/buy/${username}`,{'productos': this.cart},this.httpOptions)
    }

  }