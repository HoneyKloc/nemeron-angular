import { Component, ElementRef, Injectable, ViewChild, AfterViewInit, OnInit, HostListener} from '@angular/core';
import { NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDatepickerModule,
	NgbDateStruct,} from '@ng-bootstrap/ng-bootstrap';
import '@angular/localize/init'
import Swal from 'sweetalert2'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CalculosService } from '../../service/calculos.service';
import { ActivatedRoute,  Router } from '@angular/router'
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import moment from 'moment';
import {MaskitoOptions} from '@maskito/core';

interface pinaculoData{
  A:any,
  B:any,
  C:any,
  D:any,
  P1:any,
  P2:any,
  P3:any,
  P4:any,
  P5:any,
  top:any,
  N1:any,
  N2:any,
  N3:any,
  N4:any,
  bottom:any,
}
interface sinastra{
  A:any,
  B:any,
  C:any,
  D:any,
 E:any,
 NA:any,
 NB:any,
 NC:any,
 ND:any,
 NE:any
}
interface IPinYear{
  Cage:any,
  NextPY:any,
  NextUY:any,
  NxAge:any,
  NxP1:any,
  NxP2:any,
  NxP3:any,
  NxPb:any,
  NxPc:any,
  P1:any,
  P2:any,
  P3:any,
  Pb:any,
  Pc:any,
  PerY:any,
  UniYear:any,
}
@Component({
    selector: 'app-couple',
    templateUrl: './couple.component.html',
    styleUrl: './couple.component.scss',
    animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible <=> hidden', animate('1s ease-in-out')),
        ]),
    ],
    standalone: false
})
export class CoupleComponent  implements OnInit {
  public getScreenWidth: boolean = true;
    readonly maskitoOptions: MaskitoOptions = {
  mask: [
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ],
    };
thisY = new Date();
Year = this.thisY.getFullYear();
NxYear = (this.thisY.getFullYear() + 1);
ListMobileM:any[]=[];
[x: string]: any;
  bdate!:NgbDateStruct;
  isVisible = false;
  resultados = false;
  resultadosMes = false;
  smallloading = false;

  Rpinaculo:pinaculoData[]=[];
  Rpinaculo2:pinaculoData[]=[];
  Rpinaculo3:pinaculoData[]=[];
  PinYear:IPinYear[]=[]
  PinYear2:IPinYear[]=[]
  sinastra:sinastra[]=[];
  mobilMesSelect ={
    year:0,
    Month:0,
  }
@ViewChild('birth')birth!: ElementRef;
@ViewChild('birth2')birth2!: ElementRef;
@ViewChild('content') content: ElementRef;
@ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
@ViewChild('swiperano') swiperano!: ElementRef<SwiperContainer>;
@ViewChild('swipersina') swipersina!: ElementRef<SwiperContainer>;

@ViewChild('target', { static: false }) private myScrollContainer: ElementRef;


@ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;

// swiper movil
@ViewChild('swipermb') swipermb!: ElementRef<SwiperContainer>;
index = 0;
indexmobil = 0;
indexsina = 0;
  // Swiper
  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
  }
  swiperConfigsina: SwiperOptions = {
    spaceBetween: 5,
    navigation: true,
  }
MontsVisble={
  CYQ1: false,
  CYQ2: false,
  CYQ3: false,
  NYQ: false,
}
  constructor(private CalculosService: CalculosService,private activateRoute: ActivatedRoute, private ruta: Router){
    }
  title = 'Single';
  menu:boolean=true;
loading:boolean = true;
Nombre:string = '';
Nombre2:string = '';
birthdate:string;
birthdate2:string;
birthdateShow:string;
birthdateShow2:string;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth > 600 ? true: false;
    console.log('screen ngo ', this.getScreenWidth );
    const id = this.activateRoute.queryParams
    .subscribe(params => {
      console.log(params['id']);
      if(params['id']!=undefined){

        this.menu = params['id'] == 'false' ? false : true;
      }

    }
  );
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth > 600 ? true: false;
    // console.log('creen hot',  this.getScreenWidth);

  }
  theLoading(loadingtime?:number): Promise<boolean>{
    if(loadingtime == undefined){
      loadingtime = 3500;
    }
    // console.log('loading', this.loading);
    return new Promise ((resolve) =>{
      if(this.loading){
        setTimeout(() => {
            this.loading = false;
            return resolve(true);
        }, loadingtime);
        }else{
          this.loading = true;
          return resolve(true);

        }
    });


  }
  ngAfterViewInit(){
this.theLoading(1500).then((res)=>{
  // console.log('loadingnginit', res)
  this.isVisible = true;
});
if(this.getScreenWidth){
  this.swiper.nativeElement.swiper.activeIndex = this.index;
  this.swipersina.nativeElement.swiper.activeIndex = this.indexsina;
}else{
  this.swipermb.nativeElement.swiper.activeIndex = this.indexmobil;
}

this.CalculosService.getTodaysMonth().then((meshoy) =>{
// console.log('crrent month ', meshoy);
if(meshoy == 1){
  this.MontsVisble.CYQ1 = true;
  this.MontsVisble.CYQ2 = true;
  this.MontsVisble.CYQ3 = true;
}else if(meshoy == 2){
  this.MontsVisble.CYQ1 = true;
  this.MontsVisble.CYQ2 = true;
  this.MontsVisble.CYQ3 = true;
}else if(meshoy == 3){
  this.MontsVisble.CYQ1 = false;
  this.MontsVisble.CYQ2 = false;
  this.MontsVisble.CYQ3 = true;
  this.MontsVisble.NYQ = true;
}
});
}
cale(){
  this.birth.nativeElement.showPicker();
}
subm(){
console.log('nombre', this.Nombre);
console.log('birthdate', this.birthdate);
console.log('nombre2', this.Nombre2)
console.log('birthdate2', this.birthdate2)
let fixDate = this.birthdate.split('/');
let fixDate2 = this.birthdate2.split('/');
console.log('new fecha ', `${fixDate[1]}-${fixDate[0]}-${fixDate[2]}`);
console.log('new fecha2 ', `${fixDate2[1]}-${fixDate2[0]}-${fixDate2[2]}`);


if(fixDate.length < 3 ||  fixDate2.length < 3){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate length.<br>Verifica la fecha completa.",
    showConfirmButton: false,
    timer: 2500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
if(parseInt(fixDate[0]) < 1 || parseInt(fixDate[0]) > 31 || parseInt(fixDate2[0]) < 1 || parseInt(fixDate2[0]) > 31 ){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate day.<br>Verifica el día de la fecha .",
    showConfirmButton: false,
    timer: 2500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
if(parseInt(fixDate[1]) < 1 || parseInt(fixDate[1]) > 12 || parseInt(fixDate2[1]) < 1 || parseInt(fixDate2[1]) > 12 ){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate month.<br>Verifica el mes de la fecha .",
    showConfirmButton: false,
    timer: 2500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
if(parseInt(fixDate[2]) < 1 || parseInt(fixDate2[2]) < 1 ){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate year.<br>Verifica el mes del año .",
    showConfirmButton: false,
    timer: 2500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
this.loading = true;
this.isVisible = this.isVisible ? false : true;
if(this.Nombre.length <= 1 || this.birthdate == undefined || this.Nombre2.length <= 1 || this.birthdate2 == undefined){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Name and birthdate can't be empty.<br>Nombre y cumpleaños no pueden estar vacios.",
    showConfirmButton: false,
    timer: 3500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;
  });

  return;
}
this.birthdate = `${fixDate[1]}/${fixDate[0]}/${fixDate[2]}`;
this.birthdate2 = `${fixDate2[1]}/${fixDate2[0]}/${fixDate2[2]}`;
setTimeout(() => {
  this.ListMonths();
this.CalculosService.GetFirstLine(this.birthdate).then((pinaculo:pinaculoData[])=>{
  this.Rpinaculo = pinaculo;
  this.CalculosService.GetYear(this.birthdate).then((UnY:any[])=>{
    this.PinYear=UnY;
    console.log('PinYear', this.PinYear);

// Persona dos
this.CalculosService.GetFirstLine(this.birthdate2).then((pinaculo2:pinaculoData[])=>{
  this.CalculosService.GetYear(this.birthdate2).then((UnY:any[])=>{
    this.PinYear2=UnY;
    console.log('PinYear2 ', this.PinYear2);
    this.Rpinaculo2 = pinaculo2;
this.CalculosService.combine3(this.Rpinaculo, this.Rpinaculo2).then((third:pinaculoData[])=>{
  this.Rpinaculo3 = third;
  this.CalculosService.GetSinastra(this.Rpinaculo3).then((sinastra:sinastra[])=>{
    this.sinastra = sinastra;
    console.log('sinastra ', this.sinastra);
  })
  setTimeout(() => {
    this.loading = false;
  }, 1000);
  this.resultados = this.resultados ? false : true;

})

  });
  // this.scrollToBottom();

});
  });

  console.log('resulto ', this.Rpinaculo);
  console.log('resulto ', this.Rpinaculo[0].A);
  this.birthdateShow = moment(this.birthdate).format('MMM Do YY').toString();
  this.birthdateShow2 = moment(this.birthdate).format('MMM Do YY').toString();
});
}, 1500);
}
scrollToBottom = () => {
  // const selRef = this.content.nativeElement.querySelector('.option.selected') as HTMLElement;
  // this.viewRef.nativeElement.scrollTo(0, selRef.offsetTop - 100);
  console.log('top ', this.content.nativeElement.scrollHeight);
  try {
    this.content.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  } catch (err) {}
}
slideChange(swiper: any) {
  this.index = swiper.detail[0].activeIndex;
}
slideChangeMobil(swiper: any) {
  this.indexmobil = swiper.detail[0].activeIndex;
}
slideChange2(swipersina: any) {
  this.indexsina = swipersina.detail[0].activeIndex;
  console.log('anio ', this.indexsina);
}
reload(){

  this.activateRoute.url.subscribe((event) => {
    // console.log(event); // It's an array remember [0]
    // console.log(event[0].path); // e.g. /products
    // console.log(event[0].parameters); // e.g. { id: 'x8klP0' }
    if(event[0].path == 'couple'){
      this.ruta.navigate(['/reloadc']).then(()=>{console.log('corrio')});
    }else{
      this.ruta.navigate(['/couple']).then(()=>{console.log('corrio')});

    }
  });

}

ListMonths(){
  let thisY = moment().year();
  let NhisY = moment().year() + 1;
  let thisM = moment().month();
  this.ListMobileM = [];
  console.log('this y and month ', thisY, thisM);
  this.ListMobileM.push({Mon:99, Month:0,Year:0, concat:`Month/Mes`});

  if(thisM > 9){
    let elmes:string;
    for (let index = thisM; index < 12; index++) {
      switch(index) {
        case 0: {elmes=`JAN/ENE`;  break;}
        case 1: {elmes=`FEB`;  break;}
        case 2: {elmes=`MAR`;  break;}
        case 3: {elmes=`APR/ABR`;  break;}
        case 4: {elmes=`MAY`;  break;}
        case 5: {elmes=`JUN`;  break;}
        case 6: {elmes=`JUL`;  break;}
        case 7: {elmes=`AUG/AGO`;  break;}
        case 8: {elmes=`SEP`;  break;}
        case 9: {elmes=`OCT`;  break;}
        case 10: {elmes=`NOV`;  break;}
        case 11: {elmes=`DEC/DIC`;  break;}
        default: {elmes = 'error.'; break;}
      }
        this.ListMobileM.push({Mon:index, Month:elmes,Year:0, concat:`${elmes}, ${thisY}`});
    }
    for (let index = 0; index < 12; index++) {
      switch(index) {
        case 0: {elmes=`JAN/ENE`;  break;}
        case 1: {elmes=`FEB`;  break;}
        case 2: {elmes=`MAR`;  break;}
        case 3: {elmes=`APR/ABR`;  break;}
        case 4: {elmes=`MAY`;  break;}
        case 5: {elmes=`JUN`;  break;}
        case 6: {elmes=`JUL`;  break;}
        case 7: {elmes=`AUG/AGO`;  break;}
        case 8: {elmes=`SEP`;  break;}
        case 9: {elmes=`OCT`;  break;}
        case 10: {elmes=`NOV`;  break;}
        case 11: {elmes=`DEC/DIC`;  break;}
        default: {elmes = 'error.'; break;}
      }
    this.ListMobileM.push({Mon:index, Month:elmes,Year:1,NhisY:`${elmes}, ${NhisY}`});
    }
  }else{
    for (let index = thisM; index < 12; index++) {
      let elmes:string;
      switch(index) {
        case 0: {elmes=`JAN/ENE`;  break;}
        case 1: {elmes=`FEB`;  break;}
        case 2: {elmes=`MAR`;  break;}
        case 3: {elmes=`APR/ABR`;  break;}
        case 4: {elmes=`MAY`;  break;}
        case 5: {elmes=`JUN`;  break;}
        case 6: {elmes=`JUL`;  break;}
        case 7: {elmes=`AUG/AGO`;  break;}
        case 8: {elmes=`SEP`;  break;}
        case 9: {elmes=`OCT`;  break;}
        case 10: {elmes=`NOV`;  break;}
        case 11: {elmes=`DEC/DIC`;  break;}
        default: {elmes = 'error.'; break;}
      }
        this.ListMobileM.push({Mon:index, Month:elmes,Year:0, concat:`${elmes}, ${thisY}`});
    }
  }
  console.log('mes to list ',   this.ListMobileM);
}
callMesMobil(event:any){
  // this.mobilMesSelect.year
  console.log(event);
  this.resultadosMes = false;
  this.smallloading = true;
  this.myScrollContainer.nativeElement.scroll({
    top: this.myScrollContainer.nativeElement.scrollHeight + 400,
    left: 0,
    behavior: 'smooth'

  });
  setTimeout(() => {
    let val = JSON.parse(event.target.value);
  console.log(val);
  this.mobilMesSelect.year = val?.Year;
  this.mobilMesSelect.Month = val?.Mon;
  this.smallloading = false;
  this.resultadosMes = this.resultadosMes ? false : true;
  setTimeout(() => {
    this.myScrollContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, 600);
  }, 1500);

}
}
