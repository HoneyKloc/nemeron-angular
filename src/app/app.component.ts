import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'vibra';
  menu:boolean=true;
loading:boolean = true;
  constructor(){}
  ngOnInit() {
  }
  theLoading(){
    console.log('loading', this.loading);
    if(this.loading){
    setTimeout(() => {
        this.loading = false;
    }, 3500);
    }else{
      this.loading = true;
    }
  }
  ngAfterViewInit(){
this.theLoading();
  }

}
