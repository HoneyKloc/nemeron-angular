import { Component, ElementRef, Injectable, ViewChild, AfterViewInit, OnInit, Input} from '@angular/core';
import { CalculosService } from '../../service/calculos.service';

interface diasestoshow{
  MU:any[],
  Month: string,
  Year:number,
  dias: number[],
};
@Component({
  selector: 'app-diamobile',
  templateUrl: './diamobile.component.html',
  styleUrl: './diamobile.component.scss'
})
export class DiamobileComponent implements OnInit{
  constructor(private CalculosService: CalculosService){ }
  @Input() birthday:string ='';
  @Input() from:number = 0;
  @Input() to:number = 0;
  @Input() show:number = 0;
  @Input() couple?:boolean =false;
  @Input() A?:any = 0;
  @Input() B?:any = 0;
  @Input() C?:any = 0;
  dias:diasestoshow[]=[];
  diasCY:diasestoshow[]=[];
  CurrentY:any[]=[];
  NextY:any[]=[];
  ngOnInit() {
    console.log('days ');
  }

  ngAfterViewInit(){
       if(this.couple){
          this.CalculosService.GetDaysCouple(this.A,this.B,this.C).then((dias:diasestoshow[])=>{
            // console.log('days ', dias);
            this.cleandays(dias,this.from,this.to,this.show);
        });
        }else{
  this.CalculosService.GetDays(this.birthday).then((dias:diasestoshow[])=>{
    // console.log('days ', dias);
    this.cleandays(dias,this.from,this.to,this.show);

});
        }
  }

  cleandays(arr:diasestoshow[],ini:number, til:number, toshow:number){
    for (let index = ini; index <= til; index++) {
      // console.log('clean ', arr[toshow][index]);
      this.diasCY.push(arr[toshow][index]);
    }
    // console.log('toshow ', this.diasCY);
  }
}
