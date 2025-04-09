import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  // Dominio:string = window.location.origin;
  // logoimg:string = this.Dominio+"/assets/img/logon.webp";
  lenguaje:boolean = false;
   constructor( private ruta: Router){}
   ngOnInit() {
    console.log('menu');
   }
  home(){
    this.ruta.navigate(['/'])
  }
  redirect(){
    this.lenguaje = this.lenguaje ? false : true;
  }
}
