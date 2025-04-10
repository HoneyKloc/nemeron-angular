import { Component, ElementRef, Injectable, ViewChild, AfterViewInit, OnInit, Input} from '@angular/core';
import { CalculosService } from '../../service/calculos.service';

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
    selector: 'app-mes',
    templateUrl: './mes.component.html',
    styleUrl: './mes.component.scss',
    standalone: false
})


export class MesComponent implements OnInit {
 constructor(private CalculosService: CalculosService){ }
@Input() birthday:string ='';
@Input() from:number = 0;
@Input() to:number = 0;
@Input() show:number = 0;
@Input() couple?:boolean =false;
@Input() A?:any = 0;
@Input() B?:any = 0;
@Input() C?:any = 0;
meses:mesestoshow[]=[];
CurrentY:any[]=[];
NextY:any[]=[];
  ngOnInit() {
   console.log('calnedar');
  }
  ngAfterViewInit(){
    // console.log('birthday MEs ',this.birthday);
    if(this.couple){

      this.CalculosService.GetMonthCouple(this.A,this.B,this.C).then((Months:mesestoshow[])=>{
        // console.log('GetMonth ', Months);
      this.getmesesfilter(Months,this.from,this.to,this.show);
  });
  this.CalculosService.GetDaysCouple(this.A,this.B,this.C).then((dias:mesestoshow[])=>{
    // console.log('days ', dias);
});
    }else{
      this.CalculosService.GetMonth(this.birthday).then((Months:mesestoshow[])=>{
        // console.log('GetMonth ', Months);
      this.getmesesfilter(Months,this.from,this.to,this.show);
  });
  this.CalculosService.GetDays(this.birthday).then((dias:mesestoshow[])=>{
    // console.log('days ', dias);
});


    }
  }

  getmesesfilter(arr:mesestoshow[],ini:number, til:number, toshow:number){
    for (let index = ini; index <= til; index++) {
      this.meses.push(arr[toshow][index]);
    }
    // console.log('toshow ', this.meses);

  }
}
