import { Component, OnInit } from '@angular/core';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavBarComponent implements OnInit {

  // example: MenuItem[] = [
  //   {
  //     texto: 'Básicos',
  //     ruta: './template/basicos'
  //   },
  //   {
  //     texto: 'Dinámicos',
  //     ruta: './template/dinamicos'
  //   },
  //   {
  //     texto: 'Switches',
  //     ruta: './template/switches'
  //   }
  // ];
  

  constructor() { }

  ngOnInit(): void {
  }

}
