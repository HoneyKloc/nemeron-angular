import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Vibra';
  menu:boolean=true;
loading:boolean = true;
  constructor(){}
  ngOnInit() {
      // root.style.setProperty('--url', `url(https://picsum.photos/${window.screenX}/${window.screenY}?random=3)`)

  }
  theLoading(){
    console.log('loading', this.loading);
    if(this.loading){
    setTimeout(() => {
        this.loading = false;
    }, 1500);
    }else{
      this.loading = true;
    }
  }
  ngAfterViewInit(){
this.theLoading();
  }

}
