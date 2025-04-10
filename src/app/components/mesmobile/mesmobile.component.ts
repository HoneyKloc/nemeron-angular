import { Component, ElementRef, Injectable, ViewChild, AfterViewInit, OnInit, Input} from '@angular/core';
import { CalculosService } from '../../service/calculos.service';
import moment from 'moment';

interface mesestoshow{
  Mon: string,
  Yea: string,
  MU:number,
  MP:number,
  PT: number,
  PL: number,
  PR: number,
};

@Component({
    selector: 'app-mesmobile',
    templateUrl: './mesmobile.component.html',
    styleUrl: './mesmobile.component.scss',
    standalone: false
})
export class MesmobileComponent implements OnInit {
 constructor(private CalculosService: CalculosService){ }
@Input() birthday:string ='';
@Input() from:number = 0;
@Input() to:number = 0;
@Input() show:number = 0;
meses:mesestoshow[]=[];
CurrentY:any[]=[];
NextY:any[]=[];
  ngOnInit() {
   console.log('calnedar');
  }
  ngAfterViewInit(){
    let estemes = moment().month();
    let esteanio = moment().year();
    console.log('mes ano', estemes, esteanio);

    if (estemes > 9){
console.log('mes ano', estemes, esteanio);
    }
    console.log('birthday ',this.birthday);
    this.CalculosService.GetMonth(this.birthday).then((Months:mesestoshow[])=>{
        console.log('GetMonth ', Months);
      // this.getmesesfilter(Months,this.from,this.to,this.show);
  });
  this.CalculosService.GetDays(this.birthday).then((dias:mesestoshow[])=>{
    console.log('days ', dias);
});
  }

  getmesesfilter(arr:mesestoshow[],ini:number, til:number, toshow:number){
    for (let index = ini; index <= til; index++) {
      this.meses.push(arr[toshow][index]);
    }
    console.log('toshow ', this.meses);

  }
}
