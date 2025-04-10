import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalculosService } from '../../service/calculos.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import Swal from 'sweetalert2'
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
interface Equipo{
id:number,
nombre:string,
fecha:string,
birthdate:string,
A:any,
al?:any,
B:any,
bl?:any,
C:any,
cl?:any,
D:any,
dl?:any,
}
interface Mainline{
  A:any,
  B:any,
  C:any,
  D:any,
  }
@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrl: './team.component.scss',
    animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible <=> hidden', animate('1s ease-in-out')),
        ]),
    ],
    standalone: false
})
export class TeamComponent {
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
  title = 'Team';
    bdate!:NgbDateStruct;
    SinastraE:Equipo[]
    Equipo:Equipo[] = [{
      id:0,
      nombre:'',
      fecha:'',
      birthdate:'',
      A:'',
      B:'',
      C:'',
      D:''
    },
    {
      id:1,
      nombre:'',
      fecha:'',
      birthdate:'',
      A:'',
      B:'',
      C:'',
      D:'',
    },
    {
      id:2,
      nombre:'',
      fecha:'',
      birthdate:'',
      A:'',
      B:'',
      C:'',
      D:'',
    },
    {
      id:3,
      nombre:'',
      fecha:'',
      birthdate:'',
      A:'',
      B:'',
      C:'',
      D:'',
    },
    {
      id:4,
      nombre:'',
      fecha:'',
      birthdate:'',
      A:'',
      B:'',
      C:'',
      D:'',
    },
    {
      id:5,
      nombre:'',
      fecha:'',
      birthdate:'',
      A:'',
      B:'',
      C:'',
      D:'',
    }];
  calculo ={
      FA: 0,
      al: 18,
      FB: 0,
      bl: 18,
      FC:0,
      cl: 18,
      FD:0,
      dl: 18
    }
    isVisible = false;
    resultados = false;
    resultadosMes = false;
    smallloading = false;
    birthdate:string;
    loading:boolean = true;
Nombre:string = '';
  thisY = new Date();
Year = this.thisY.getFullYear();
NxYear = (this.thisY.getFullYear() + 1);
  menu:boolean=true;
   constructor(private CalculosService: CalculosService,private activateRoute: ActivatedRoute, private ruta: Router){}
  ngOnInit() {
  }

addTeamMemeber(){
  let currentLenght=this.Equipo.length;
  this.Equipo.push({
    id:currentLenght,
    nombre:'',
    fecha:'',
    birthdate:'',
    A:'',
    B:'',
    C:'',
    D:'',
  });
}
delTeamMemeber(){
  if(this.Equipo.length <= 3){
    return;
  }
  this.Equipo.pop();
}

  theLoading(loadingtime?:number): Promise<boolean>{
    if(loadingtime == undefined){
      loadingtime = 3500;
    }
    console.log('loading', this.loading);
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
      console.log('loadingnginit', res)
      this.isVisible = true;
    });

  }
  reload(){

    this.activateRoute.url.subscribe((event) => {
      // console.log(event); // It's an array remember [0]
      // console.log(event[0].path); // e.g. /products
      // console.log(event[0].parameters); // e.g. { id: 'x8klP0' }
      if(event[0].path == 'team'){
        this.ruta.navigate(['/reloadt']).then(()=>{console.log('corrio')});
      }else{
        this.ruta.navigate(['/team']).then(()=>{console.log('corrio')});

      }
    });

  }
tamanoletra(val:any){
  let leng = val.toString();
  let v = leng.length;
  console.log('tamano ', v);
  if(v > 1){
    return 8;
  }
  return 18;
}
  subm(){
    this.isVisible = this.isVisible ? false : true;
    console.log('visible ',this.isVisible);
this.loading = true;
let tempTeam:Equipo[] = [];
for (let i = 0; i < this.Equipo.length; i++) {
console.log('box ',`Name_${i}` );
let name = (<HTMLInputElement>document.getElementById(`Name_${i}`)).value;
let fecha = (<HTMLInputElement>document.getElementById(`Birthdate_${i}`)).value.toString();
console.log('val ', name);
if(name.length > 0 && fecha.length > 0 ){
 let ca:Mainline= this.CalculosService.GetMainLine(fecha);
  tempTeam.push({
    id:i,
    nombre:name,
    fecha:fecha,
    birthdate:moment(fecha).format('MMM Do YYYY').toString(),
    A:ca.A,
    al:this.tamanoletra(ca.A),
    B:ca.B,
    bl:this.tamanoletra(ca.B),
    C:ca.C,
    cl:this.tamanoletra(ca.C),
    D:ca.D,
    dl:this.tamanoletra(ca.D),
  });
}
}
this.Equipo=[];
this.SinastraE =tempTeam;
console.log(this.SinastraE);

this.calculo ={
  FA: 0,
  al: 18,
  FB: 0,
  bl: 18,
  FC:0,
  cl: 18,
  FD:0,
  dl: 18
}
this.SinastraE.forEach((items)=>{
  this.calculo.FA += this.CalculosService.cleanint(items.A);
  this.calculo.FB += this.CalculosService.cleanint(items.B);
  this.calculo.FC += this.CalculosService.cleanint(items.C);
  this.calculo.FD += this.CalculosService.cleanint(items.D);
});

this.calculo.FA = this.CalculosService.breakdown(this.calculo.FA,0);
this.calculo.FB = this.CalculosService.breakdown(this.calculo.FB,0);
this.calculo.FC = this.CalculosService.breakdown(this.calculo.FC,0);
this.calculo.FD = this.CalculosService.breakdown(this.calculo.FD,0);
console.log(this.calculo);

this.theLoading(2000).then(()=>{
  this.resultados = this.resultados ? false : true;
  console.log('visible ',this.resultados);
});

  }
  checkmissingdata(name, cimple){
    if(name.length <= 1 || cimple  == undefined){
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
  }
}
