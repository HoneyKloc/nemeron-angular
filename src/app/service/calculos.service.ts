import { Injectable } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';
import moment from 'moment';

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
 E:any
}
interface Mainline{
  A:any,
  B:any,
  C:any,
  D:any,
  }
@Injectable({
  providedIn: 'root'
})
export class CalculosService {

  constructor() { }


  GetFirstLine(date:string): Promise<any> {
    // this.Centraline(date);
    let master = [99,88,77,66,55,44,33,22,11];
// console.log('bidthday ', date)
  let t = date.split('/');
  // console.log(t);
  // Dia y año estan al reves pero ya es mas facil acomodar para el maestro aqui que cambiar todas las formulas

  //   let day:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
  // let year:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
  // let month:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});
  let day:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
  let year:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
  let month:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});
  // console.log(day);
  // console.log(year);
  // console.log(month);
  let sumD = master.includes(day.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) ? day.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumM = master.includes(month.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) ? month.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumY = master.includes(year.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) ? year.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // console.log('dia ',day);
  // console.log('m ',month);
  // console.log('y ',year);
// let daysplit: string[] = day.toString().split("");
// let monthsplit: string[] = month.toString().split("");
// let yearsplit: string[] = year.toString().split("");

  // console.log('dia ',parseInt(year[0])+parseInt(year[1])+parseInt(year[2])+parseInt(year[3]));
  // console.log('m ',parseInt(day[0])+parseInt(day[1]));
  // console.log('y ',parseInt(month[0])+parseInt(month[1]));

  let DN = parseInt(year[0])+parseInt(year[1])+parseInt(year[2])+parseInt(year[3])+parseInt(day[0])+parseInt(day[1])+parseInt(month[0])+parseInt(month[1]);
// console.log('Master day ', DN);
  // let A=this.checkmaster(sumM);
  // let B=this.checkmaster(sumD);
  // let C=this.checkmaster(sumY);
  let A:any = 0;
  if(master.includes(parseInt(t[2]))){
   A = this.checkmaster(parseInt(t[2]));
  }else{
   A=this.checkmaster(sumY);
  }
  // console.log('es A M ', parseInt(t[2]));
  let C:any=0;
  if(master.includes(parseInt(t[0]))){
    C = this.checkmaster(parseInt(t[0]));
   }else{
    C =this.checkmaster(sumD);
   }
   let B:any =0;
   if(master.includes(parseInt(t[1]))){
    B = this.checkmaster(parseInt(t[1]));
   }else{
    B=this.checkmaster(sumM);
   }


  // let D0=master.includes((sumD+sumY+sumM)) ? (sumD+sumY+sumM) : (sumD+sumY+sumM).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let D0=master.includes(DN) ? (sumD+sumY+sumM) : (sumD+sumY+sumM).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  let D=this.checkmaster(DN);
  // let P1=master.includes((sumM+sumD)) ? (sumM+sumD) : (sumM+sumD).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let P1= this.sumY(sumD,sumM);
  // let P2=master.includes((sumY+sumD)) ? (sumY+sumD) : (sumY+sumD).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let P2=this.sum(sumM,sumD);
  // let P3=master.includes((P1+P2)) ? (P1+P2) : (P1+P2).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let P3=this.sumY(P1,P2);
    // console.log('error P4 ', sumD,P1,P2,P3);
    // this.cleanint(sumD)+
  let P4=master.includes((this.cleanint(P1)+this.cleanint(P2)+this.cleanint(P3))) ? (this.cleanint(P1)+this.cleanint(P2)+this.cleanint(P3)) : (this.cleanint(P1)+this.cleanint(P2)+this.cleanint(P3)).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // let top=master.includes((A+C)) ? (A+C) : (A+C).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let top=this.sum(sumD,sumY);
  // let P5 =master.includes((top+D)) ? (top+D) : (top+D).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let P5=this.sumY(top,D0);
  let N1=this.subs(sumY,sumM);
  let N2=this.subs(sumM,sumD);
  let N3=this.subs(N1,N2);
  let N4=this.sumY(this.subs(sumY,sumM),this.sumY(N2,N3));

  let bottom =this.subs(sumY,sumD);

  let result= [{
    A:B,
    B:C,
    C:A,
    D:D,
    P1:P1,
    P2:P2,
    P3:P3,
    P4:P4,
    P5:P5,
    top:top,
    N1:N1,
    N2:N2,
    N3:N3,
    N4:N4,
    bottom:bottom,
  }];
console.log('resultados calculo pina ',result);
return Promise.resolve( this.Centraline(date));
  }
  subs(s1:number,s2:number){
    switch(s1) {
      case 33: {s1=6;break;}
      case 22: {s1=4;break;}
      case 11: {s1=2;break;}
      case 13: {s1=4;break;}
      case 14: {s1=5;break;}
      case 16: {s1=7;break;}
      case 19: {s1=1;break;}
      default: {s1=s1;break;}
    }
    switch(s2) {
      case 33: {s2=6;break;}
      case 22: {s2=4;break;}
      case 11: {s2=2;break;}
      case 13: {s2=4;break;}
      case 14: {s2=5;break;}
      case 16: {s2=7;break;}
      case 19: {s2=1;break;}
      default: {s2=s2;break;}
    }
    let n1 = s1 < 0 ? s1*-1 : s1;
    let n2 = s2 < 0 ? s2*-1 : s2;
    let r = n1-n2;
    let nr = r < 0 ? r*-1:r;
   if(nr.toString().length > 1){
    let again = nr.toString().split("").map((t)=>{return parseInt(t)});
   return this.subs(again[0], again[1])
   }else{
    return nr;
   }
    }

 sum(s1:number, s2:number){
  let master = [33,22,11];
  let suma:number;

  switch(s1) {
    case 33: {s1=6;break;}
    case 22: {s1=4;break;}
    case 11: {s1=2;break;}
    case 13: {s1=4;break;}
    case 14: {s1=5;break;}
    case 16: {s1=7;break;}
    case 19: {s1=1;break;}
    default: {s1=s1;break;}
  }
  switch(s2) {
    case 33: {s2=6;break;}
    case 22: {s2=4;break;}
    case 11: {s2=2;break;}
    case 13: {s2=4;break;}
    case 14: {s2=5;break;}
    case 16: {s2=7;break;}
    case 19: {s2=1;break;}
    default: {s2=s2;break;}
  }
  suma = s1 + s2;
  let exi:string;
  switch(suma) {
    case 33: {exi=`33/6`; return exi; break;}
    case 22: {exi=`22/4`;return exi; break;}
    case 11: {exi=`11/2`;return exi; break;}
    default: {suma=suma; break;}
  }

  if(suma.toString().length > 1){
    let again = suma.toString().split("").map((t)=>{return parseInt(t)});
    console.log('suma ', s1, s2, suma);
   return this.sum(again[0], again[1])
   }else{
    return suma;
   }

}
cleanint(number:any){
  let response:number;
  switch(number) {
    case '44/8': {response=8;break;}
    case '33/6': {response=6;break;}
    case '22/4': {response=4;break;}
    case '11/2': {response=2;break;}
    default: {response=number;break;}
  }
  return response;
}
sumY(s1:number, s2:number){
  let master = [55,44,33,22,11];
  let suma:number;
let suma0:number;
suma0=s1+s2;
  switch(s1) {
    case 33: {s1=6;break;}
    case 22: {s1=4;break;}
    case 11: {s1=2;break;}
    case 13: {s1=4;break;}
    case 14: {s1=5;break;}
    case 16: {s1=7;break;}
    case 19: {s1=1;break;}
    default: {s1=s1;break;}
  }
  switch(s2) {
    case 33: {s2=6;break;}
    case 22: {s2=4;break;}
    case 11: {s2=2;break;}
    case 13: {s2=4;break;}
    case 14: {s2=5;break;}
    case 16: {s2=7;break;}
    case 19: {s2=1;break;}
    default: {s2=s2;break;}
  }
  suma = s1 + s2;
  let exi:any;
  switch(suma0) {
    case 44: {exi=44; return exi; break;}
    case 33: {exi=33; return exi; break;}
    case 22: {exi=22;return exi; break;}
    case 11: {exi=11;return exi; break;}
    default: {suma=suma; break;}
  }
  if(suma.toString().length > 1){
    try {
    let again = suma.toString().split("").map((t)=>{return parseInt(t)});
   return this.sumY(again[0], again[1])
  }catch(error){
    console.log('error en suma ', error);
  }
   }else{
    return suma;
   }

}
checkmaster(master:number){
  let res:string;
  switch(master) {
    case 99: {res=`99/9`; return res; break;}
    case 88: {res=`88/7`; return res; break;}
    case 77: {res=`77/5`; return res; break;}
    case 66: {res=`12/3`; return res; break;}
    case 55: {res=`55/1`; return res; break;}
    case 44: {res=`44/8`; return res; break;}
    case 33: {res=`33/6`; return res; break;}
    case 22: {res=`22/4`;return res; break;}
    case 11: {res=`11/2`;return res; break;}
    default: {master; return master.toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0); break;}
  }
}
GetYear(birthdate:any): Promise<any> {
// console.log('GET YEAR birthdate ', birthdate);
   let t = birthdate.split('/');
  let thisY = new Date();
  // console.log('thisY ', thisY);
  // console.log('fecha year split ', t);
  let day:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});
  let year:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
  let month:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
  let age = thisY.getFullYear() - t[2];
  let Nxage = (thisY.getFullYear() + 1) - t[2];
  // console.log('a;o year ', year);
  // console.log('a;o acutial ', age);
  // console.log('a;o next ', Nxage);

  let sumD = day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumM = month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumY = year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // console.log('dia ',sumD);
  // console.log('m ',sumM);
  // console.log('y ',sumY);
  let UniYear= thisY.getFullYear().toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // console.log('UniYear ', UniYear);
  thisY.setFullYear(thisY.getFullYear() + 1);
  let PerY= (sumD+sumM+UniYear).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextUY = thisY.getFullYear().toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextPY= (sumD+sumM+NextUY).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let Cage = age.toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let Nage = Nxage.toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let P1 = this.sumY(UniYear,PerY);
  let P2 = this.sumY(PerY,Cage);
  let P3 = this.sumY(P1,P2);
  let Pc = (P1+P3+P2).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NxP1 = this.sumY(NextUY,NextPY);
  let NxP2 = this.sumY(NextPY,Nage);
  let NxP3 = this.sumY(NxP1,NxP2);
  let NxPc = (NxP1+NxP3+NxP2).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
let NxPb = (NextUY+Nage).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
let Pb = (UniYear+Cage).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

let resultado = [{
  PerY:PerY,
  NextPY:NextPY,
  UniYear:UniYear,
  NextUY:NextUY,
  Cage:Cage,
  NxAge:Nage,
  P1:P1,
  P2:P2,
  P3:P3,
  Pc:Pc,
  Pb:Pb,
  NxP1:NxP1,
  NxP2:NxP2,
  NxP3:NxP3,
  NxPc:NxPc,
  NxPb:NxPb,
}];
return Promise.resolve(resultado);
}

GetMonth(birthdate:string):Promise<any>{
  let master = [99,88,77,66,55,44,33,22,11];
  let thisY = new Date();
  let t = birthdate.split('/');
  let resultado:any[]=[[0],[1]];
  console.log(t);
  let day:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});
  let year:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
  let month:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
  let UniYear= thisY.getFullYear().toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  let sumD = day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumM = month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumY = year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let PerY= (sumD+sumM+UniYear).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextUY = (thisY.getFullYear() + 1).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextPY= (sumD+sumM+NextUY).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// console.log('personal Y ', PerY);
  let CY = year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NY = (thisY.getFullYear() + 1);
for (let index = 0; index <= 11; index++) {
let mesindex = index +1;
  let mes='';
  switch(index) {
    case 0: {mes=`JAN/ENE`;  break;}
    case 1: {mes=`FEB`;  break;}
    case 2: {mes=`MAR`;  break;}
    case 3: {mes=`APR/ABR`;  break;}
    case 4: {mes=`MAY`;  break;}
    case 5: {mes=`JUN`;  break;}
    case 6: {mes=`JUL`;  break;}
    case 7: {mes=`AUG/AGO`;  break;}
    case 8: {mes=`SEP`;  break;}
    case 9: {mes=`OCT`;  break;}
    case 10: {mes=`NOV`;  break;}
    case 11: {mes=`DEC/DIC`;  break;}
    default: {mes = 'error.'; break;}
  }


  // let MU = (UniYear+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let MU = this.sumY(this.cleanint(UniYear),this.cleanint(mesindex));
  // console.log('PY Mes index ', PerY, mesindex);
  // console.log('NPY Mes index ', NextPY, mesindex);
  // let p10 = (NY+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log('MP ',PerY+mesindex)
  let MP = master.includes(PerY+mesindex) ? (PerY+mesindex) : (PerY+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NMP=(NextPY+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NMU = this.sumY(NextUY,mesindex);
  let p0t = this.sumY(this.cleanint(MU),this.cleanint(MP));
  let p1t = this.sumY(this.cleanint(NMU),this.cleanint(NMP));
  let p0l = this.sumY(this.cleanint(MU),this.cleanint(p0t));
  let p1l = this.sumY(this.cleanint(NMU),this.cleanint(p1t));
  let p0R = this.sumY(this.cleanint(MP),this.cleanint(p0t));
  let p1R = this.sumY(this.cleanint(NMP),this.cleanint(p1t));

  resultado[0].push({Mon: mes,Yea: thisY.getFullYear(),MU:MU, MP:MP, PT: p0t,PL: p0l,PR: p0R});
  resultado[1].push({Mon: mes,Yea: NY,MU:NMU,MP:NMP,PT: p1t,PL: p1l,PR: p1R});

  // resultado[0][index].push({Yea: CY});
  // resultado[0][index].push({P0: p00});
  // resultado[1][index].push({Mon: mes});
  // resultado[1][index].push({Yea: NY});
  // resultado[1][index].push({P0: p10});
  // resultado[0][index].push({P1: p01});
  // resultado[1][index].push({P1: p11});
  // resultado[0][index].push({PT: p0t});
  // resultado[1][index].push({PT: p1t});
  // resultado[0][index].push({PL: this.sum(p00,p0t)});
  // resultado[1][index].push({PL: this.sum(p10,p1t)});
  // resultado[0][index].push({PR: this.sum(p01,p0t)});
  // resultado[1][index].push({PR: this.sum(p11,p1t)});
}

resultado[0].splice(0, 1);
resultado[1].splice(0, 1);
console.log('meses', resultado);
  return Promise.resolve(resultado);

}

combine3(pin1:pinaculoData[], pin2:pinaculoData[]): Promise<any>{
// console.log('combine 1 ',pin1[0]);
// console.log('combine 2 ',pin2[0]);
// console.log(pin2);
let A=this.sum(this.cleanint(pin1[0].A), this.cleanint(pin2[0].A));
let B=this.sum(this.cleanint(pin1[0].B), this.cleanint(pin2[0].B));
let C=this.sum(this.cleanint(pin1[0].C), this.cleanint(pin2[0].C));
let D=this.sum(this.cleanint(pin1[0].D), this.cleanint(pin2[0].D));
let P1= this.checkmaster(this.sumY(this.cleanint(pin1[0].P1), this.cleanint(pin2[0].P1)));
let P2=this.checkmaster(this.sumY(this.cleanint(pin1[0].P2), this.cleanint(pin2[0].P2)));
let P3=this.checkmaster(this.sumY(this.cleanint(pin1[0].P3), this.cleanint(pin2[0].P3)));
let P4=this.checkmaster(this.sumY(this.cleanint(pin1[0].P4), this.cleanint(pin2[0].P4)));
let top=this.checkmaster(this.sumY(this.cleanint(pin1[0].top), this.cleanint(pin2[0].top)));
let P5=this.checkmaster(this.sumY(this.cleanint(pin1[0].P5), this.cleanint(pin2[0].P5)));
let N1=this.checkmaster(this.sumY(this.cleanint(pin1[0].N1), this.cleanint(pin2[0].N1)));
let N2=this.checkmaster(this.sumY(this.cleanint(pin1[0].N2), this.cleanint(pin2[0].N2)));
let N3=this.checkmaster(this.sumY(this.cleanint(pin1[0].N3), this.cleanint(pin2[0].N3)));
let N4=this.checkmaster(this.sumY(this.cleanint(pin1[0].N4), this.cleanint(pin2[0].N4)));
let bottom = this.checkmaster(this.sumY(pin1[0].bottom, pin2[0].bottom));

let result= [{
  A:A,
  B:B,
  C:C,
  D:D,
  P1:P1,
  P2:P2,
  P3:P3,
  P4:P4,
  P5:P5,
  top:top,
  N1:N1,
  N2:N2,
  N3:N3,
  N4:N4,
  bottom:bottom,
}];


  return Promise.resolve(result);
}
GetMonthCouple(A:any, B:any,C:any):Promise<any>{
  let thisY = new Date();
  // let t = birthdate.split('/');
  let resultado:any[]=[[0],[1]];
  // console.log(t);
  // let day:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
  // let year:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
  // let month:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});

  let sumD = parseInt(B);
let sumM = parseInt(A);
let sumY = parseInt(C);

  let UniYear= thisY.getFullYear().toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // let sumD = day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // let sumM = month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // let sumY = year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let PerY= (sumD+sumM+UniYear).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextUY = (thisY.getFullYear() + 1).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextPY= (sumD+sumM+NextUY).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// console.log('currentY ', year);
//   let CY = year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NY = (thisY.getFullYear() + 1);
for (let index = 0; index <= 11; index++) {
let mesindex = index +1;
  let mes='';
  switch(index) {
    case 0: {mes=`JAN/ENE`;  break;}
    case 1: {mes=`FEB`;  break;}
    case 2: {mes=`MAR`;  break;}
    case 3: {mes=`APR/ABR`;  break;}
    case 4: {mes=`MAY`;  break;}
    case 5: {mes=`JUN`;  break;}
    case 6: {mes=`JUL`;  break;}
    case 7: {mes=`AUG/AGO`;  break;}
    case 8: {mes=`SEP`;  break;}
    case 9: {mes=`OCT`;  break;}
    case 10: {mes=`NOV`;  break;}
    case 11: {mes=`DEC/DIC`;  break;}
    default: {mes = 'error.'; break;}
  }


  // let MU = (UniYear+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let MU = this.sumY(this.cleanint(UniYear),this.cleanint(mesindex));
  // let p10 = (NY+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let MP = (PerY+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NMP=(NextPY+mesindex).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NMU = this.sumY(NextUY,mesindex);
  let p0t = this.sumY(this.cleanint(MU),this.cleanint(MP));
  let p1t = this.sumY(this.cleanint(NMU),this.cleanint(NMP));
  let p0l = this.sumY(this.cleanint(NMU),this.cleanint(p0t));
  let p1l = this.sumY(this.cleanint(NMU),this.cleanint(p1t));
  let p0R = this.sumY(this.cleanint(MP),this.cleanint(p0t));
  let p1R = this.sumY(this.cleanint(NMP),this.cleanint(p1t));

  resultado[0].push({Mon: mes,Yea: thisY.getFullYear(),MU:MU, MP:MP, PT: p0t,PL: p0l,PR: p0R});
  resultado[1].push({Mon: mes,Yea: NY,MU:NMU,MP:NMP,PT: p1t,PL: p1l,PR: p1R});

  // resultado[0][index].push({Yea: CY});
  // resultado[0][index].push({P0: p00});
  // resultado[1][index].push({Mon: mes});
  // resultado[1][index].push({Yea: NY});
  // resultado[1][index].push({P0: p10});
  // resultado[0][index].push({P1: p01});
  // resultado[1][index].push({P1: p11});
  // resultado[0][index].push({PT: p0t});
  // resultado[1][index].push({PT: p1t});
  // resultado[0][index].push({PL: this.sum(p00,p0t)});
  // resultado[1][index].push({PL: this.sum(p10,p1t)});
  // resultado[0][index].push({PR: this.sum(p01,p0t)});
  // resultado[1][index].push({PR: this.sum(p11,p1t)});
}

resultado[0].splice(0, 1);
resultado[1].splice(0, 1);
  return Promise.resolve(resultado);

}
GetDaysCouple( A:any, B:any,C:any): Promise<any>{
//   let A=this.checkmaster(sumM);
// let B=this.checkmaster(sumD);
// let C=this.checkmaster(sumY);
// let D0=master.includes((sumD+sumY+sumM)) ? (sumD+sumY+sumM) : (sumD+sumY+sumM).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// let D=this.checkmaster(D0);

let sumD = parseInt(B);
let sumM = parseInt(A);
let sumY = parseInt(C);
  // console.log('correremos dias');
  let thisY = new Date();
  // let t = birthdate.split('/');
  let resultado:any[]=[[0],[1]];
  // console.log(t);
  // let day:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
  // let year:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
  // let month:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});
  let UniYear= thisY.getFullYear().toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // let sumD = day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // let sumM = month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // let sumY = year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let PerY= (sumD+sumM+UniYear).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextUY = (thisY.getFullYear() + 1).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextPY= (sumD+sumM+NextUY).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// console.log('universal year ', UniYear);
// console.log('Nxuniversal year ', NextUY);

  for (let index = 0; index < 12; index++) {
    let mesindex = index +1;
    let normalizomes = mesindex < 10 ? `0${mesindex}` : mesindex;
    let elmes ='';
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
       let cm = `${thisY.getFullYear()}-${normalizomes}`;
       let nm = `${(thisY.getFullYear() + 1)}-${normalizomes}`;
    const daysInMonth = moment(cm).daysInMonth();
    const daysInnxMonth = moment(nm).daysInMonth();

    // console.log('cm ', cm, 'mesindex', normalizomes, );
    // console.log('nm ', nm);
    let mes = Array.from({length: daysInMonth}, (v, k) => k + 1);
    let nxmes = Array.from({length: daysInnxMonth}, (v, k) => k + 1);
    let MU:any[]=[];
    let NXMU:any[]=[];

    mes.forEach(diames=>{
// console.log('dia mes', diames);
let chkvibra22 = 22 - (UniYear + mesindex);
let vivbra22:boolean = chkvibra22 == diames? true : false;
    MU.push({dia: diames, MU:this.sumY((UniYear+mesindex),diames),MP:this.sumY((PerY+mesindex),diames),veinti2:vivbra22});
    // MU.push({dia: diames, MU:this.sumY((UniYear+mesindex),diames),MP:this.sumY((PerY+mesindex),diames)});
    });
    if(MU.length < 31){
      let fix = 31 - MU.length;
      for (let ind = 0; ind < fix; ind++) {
        MU.push({dia: '  ', MU:'  ',MP:'  '});

      }
    }
    nxmes.forEach(diames=>{
      // console.log('dia nxmes', diames);
      NXMU.push({dia: diames, MU:this.sumY((NextUY+mesindex),diames),MP:this.sumY((NextPY+mesindex),diames)});
          });
          if(NXMU.length < 32){
            let fix = 30 -NXMU.length;
            for (let ind = 0; ind < fix; ind++) {
              NXMU.push({dia: '', MU:'',MP:''});

            }
          }
          // dias:[mes]
    resultado[0].push({Year: thisY.getFullYear(),Month: elmes, MU:MU});
    resultado[1].push({Year: (thisY.getFullYear() + 1),Month: elmes, MU:MU});

  }
  // resultado[1].push({Year: ,Month: elmes,dias:[mes]});
  resultado[0].splice(0, 1);
  resultado[1].splice(0, 1);
    return Promise.resolve(resultado);

}
GetDays(birthdate:string): Promise<any>{
  // console.log('correremos dias');
  let thisY = new Date();
  let t = birthdate.split('/');
  let resultado:any[]=[[0],[1]];
  // console.log(t);
  let day:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});
  let year:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
  let month:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
  let UniYear= thisY.getFullYear().toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumD = day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumM = month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let sumY = year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let PerY= (sumD+sumM+UniYear).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextUY = (thisY.getFullYear() + 1).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextPY= (sumD+sumM+NextUY).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// console.log('universal year ', UniYear);
// console.log('Nxuniversal year ', NextUY);

  for (let index = 0; index < 12; index++) {
    let mesindex = index +1;
    let normalizomes = mesindex < 10 ? `0${mesindex}` : mesindex;
    let elmes ='';
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
       let cm = `${thisY.getFullYear()}-${normalizomes}`;
       let nm = `${(thisY.getFullYear() + 1)}-${normalizomes}`;
    const daysInMonth = moment(cm).daysInMonth();
    const daysInnxMonth = moment(nm).daysInMonth();

    // console.log('cm ', cm, 'mesindex', normalizomes, );
    // console.log('nm ', nm);
    let mes = Array.from({length: daysInMonth}, (v, k) => k + 1);
    let nxmes = Array.from({length: daysInnxMonth}, (v, k) => k + 1);
    let MU:any[]=[];
    let NXMU:any[]=[];

    mes.forEach(diames=>{

 let chkvibra22 = 22 - (UniYear + mesindex);
let vivbra22:boolean = chkvibra22 == diames? true : false;
    MU.push({dia: diames, MU:this.sumY((UniYear+mesindex),diames),MP:this.sumY((PerY+mesindex),diames),veinti2:vivbra22});
    });
    if(MU.length < 31){
      let fix = 31 - MU.length;
      for (let ind = 0; ind < fix; ind++) {
        MU.push({dia: '  ', MU:'  ',MP:'  '});

      }
    }
    nxmes.forEach(diames=>{
      // console.log('dia nxmes', diames);
      NXMU.push({dia: diames, MU:this.sumY((NextUY+mesindex),diames),MP:this.sumY((NextPY+mesindex),diames)});
          });
          if(NXMU.length < 32){
            let fix = 30 -NXMU.length;
            for (let ind = 0; ind < fix; ind++) {
              NXMU.push({dia: '', MU:'',MP:''});

            }
          }
          // dias:[mes]
    resultado[0].push({Year: thisY.getFullYear(),Month: elmes, MU:MU});
    resultado[1].push({Year: (thisY.getFullYear() + 1),Month: elmes, MU:MU});

  }
  // resultado[1].push({Year: ,Month: elmes,dias:[mes]});
  resultado[0].splice(0, 1);
  resultado[1].splice(0, 1);
    return Promise.resolve(resultado);

}
async getTodaysMonth(): Promise<any>{
  let current =1 + moment().month();
  switch(current) {
    case 1: {return 1; break;}
    case 2: {return 1; break;}
    case 3: {return 1; break;}
    case 4: {return 1; break;}
    case 5: {return 2; break;}
    case 6: {return 2; break;}
    case 7: {return 2; break;}
    case 8: {return 2; break;}
    case 9: {return 3; break;}
    case 10: {return 3; break;}
    case 11: {return 3; break;}
    case 12: {return 3; break;}
    default: {return 99; break;}
  }
  return
}

GetSinastra(together:pinaculoData[]):Promise<any>{
  let resultado:any[]=[];
  let thisY = new Date();
  let UniYear= thisY.getFullYear().toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let NextUY = (thisY.getFullYear() + 1).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

let B = this.sumY(this.sumY(together[0].A, together[0].A), + UniYear) ;
let C = this.sumY(UniYear, B);
let D = this.sumY(UniYear, C);
let E = this.sumY(B, C);
let NB = this.sumY(this.sumY(together[0].A, together[0].A), + NextUY) ;
let NC = this.sumY(NextUY, NB);
let ND = this.sumY(NextUY, NC);
let NE = this.sumY(NB, NC);

// console.log('tog ',together)
let result= [{
  A:UniYear,
  B:B,
  C:C,
  D:D,
  E:E,
  NA:NextUY,
  NB:NB,
  NC:NC,
  ND:ND,
  NE:NE,
}];
  return Promise.resolve(result);

}
GetMainLine(date:string) {
let master = [33,22,11];
let t = date.split('/');
let day:any[] = t[2].toString().split("").map((t)=>{return parseInt(t)});
let year:any[] = t[0].toString().split("").map((t)=>{return parseInt(t)});
let month:any[] = t[1].toString().split("").map((t)=>{return parseInt(t)});
// console.log(day);
// console.log(year);
// console.log(month);
let sumD = master.includes(day.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) ? day.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : day.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
let sumM = master.includes(month.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) ? month.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : month.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
let sumY = master.includes(year.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) ? year.reduce((accumulator, currentValue) => accumulator + currentValue, 0) : year.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

let A=this.checkmaster(sumY);
let C=this.checkmaster(sumD);
let B=this.checkmaster(sumM);

// let A=this.checkmaster(sumM);
// let B=this.checkmaster(sumD);
// let C=this.checkmaster(sumY);
let D0=master.includes((sumD+sumY+sumM)) ? (sumD+sumY+sumM) : (sumD+sumY+sumM).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
let D=this.checkmaster(D0);

let result:Mainline ={
  A:A,
  B:B,
  C:C,
  D:D,
};
// console.log(result);
return result;
}
breakdown(dig0, dig1?){
  return this.sum(this.cleanint(dig0), this.cleanint(dig1));
}

Centraline(date: string){
let bd = date.split('/');
let dia = parseInt(bd[0]);
let mes = parseInt(bd[1]);
let year = parseInt(bd[2]);
let Du = this.MasterNo(dia);
let Mu = this.MasterNo(mes);
let y = year.toString().split("");
let DN0 = parseInt(y[0])+parseInt(y[1])+parseInt(y[2])+parseInt(y[3])+Du.touse+Mu.touse;
// +parseInt(dia[0])+parseInt(dia[1])+parseInt(mes[0])+parseInt(mes[1]);
let DN = this.MasterNo(DN0);
console.log(Du, Mu)


let c0 = parseInt(y[0])+parseInt(y[1])+parseInt(y[2])+parseInt(y[3]);
let c =this.MasterNo(c0);
let P1 = this.sumaMaster(Du, Mu);
console.log('p2 ', Mu, c);
let P2 = this.sumaMaster(Mu, c);
let P3 = this.sumaMaster(P1, P2);
let P4s1 = this.sumaMaster(P3, P2);
let P4 = this.sumaMaster(P4s1, P1);
let top = this.sumaMaster(Du, c);
let P5 = this.sumaMaster(top, DN);
let Np1 = this.subMaster(Du, Mu);
let Np2 = this.subMaster(Mu, c);
let Np3 = this.subMaster(Np1, Np2);
let Np4s0 = this.sumaMaster(Np1, Np3);
let Np4 = this.sumaMaster(Np4s0, Np2);
let Np5 = this.subMaster(Du, c);

let res=[{
  A:Du.toshow,
  B:Mu.toshow,
  C:c.toshow,
  D:DN.toshow,
  P1:P1.toshow,
  P2:P2.toshow,
  P3:P3.toshow,
  P4:P4.toshow,
  top:top.toshow,
  P5:P5.toshow,
  N1:Np1.toshow,
  N2:Np2.toshow,
  N3:Np3.toshow,
  N4:Np4.toshow,
  bottom:Np5.toshow,
}];
console.log('new lines', {Du, Mu, DN, c});
// console.log(y[0], y[1], y[2], y[3]);
console.log('newline ', res);
return res
}
sumaconcheck(uno:{ismaster:boolean,toshow:string,touse: number}, dos:{ismaster:boolean,toshow:string,touse: number}){
if(uno.toshow == dos.toshow){

}
}
MasterNo(master:number){
  let res:string;
  let ismaster:boolean;
  switch(master) {
    case 99: {res=`99/9`; ismaster =true;  break;}
    case 88: {res=`88/7`; ismaster =true; break;}
    case 77: {res=`77/5`; ismaster =true; break;}
    case 66: {res=`12/3`; ismaster =true; break;}
    case 55: {res=`55/1`; ismaster =true; break;}
    case 44: {res=`44/8`; ismaster =true; break;}
    case 33: {res=`33/6`; ismaster =true; break;}
    case 22: {res=`22/4`; ismaster =true;break;}
    case 11: {res=`11/2`; ismaster =true;break;}
    default: {ismaster =false; res = master.toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString();break;}
  }
  if(master.toString().length > 1){
    let r = master.toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString().split("").map((t)=>{return parseInt(t)}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return {toshow:res, touse:r, ismaster};

   }else{
    return {toshow:res, touse:master, ismaster};
  }

}
sumaMaster(num0, num1){
  let f = [];
  let s = [];
  let suma = 0;
  let res:any;
  let ismaster = false;

  console.log('recibidos suma ', num0, num1);
  if(num0.ismaster){
   let fuse = num0.toshow.split('/');
   ismaster = true;
   let fMaestro = {
    toshow:fuse[0],
    touse:parseInt(fuse[1]),
    ismaster:ismaster,
  }
   f.push({Nmaster:fuse[0],Ntouse:fMaestro});

  }else{
    f.push({Nmaster:0,Ntouse:num0})
  }
  console.log('asi sale f ', f);
  if(num1.ismaster){
    let suse = num1.toshow.split('/');
    ismaster = true;
    let sMaestro = {
      toshow:suse[0],
      touse:parseInt(suse[1]),
      ismaster:ismaster,
    }
    s.push({Nmaster:suse[0],Ntouse:sMaestro});
   }else{
     s.push({Nmaster:0,Ntouse:num1})
   }
   console.log('asi sale s ', s);

   if(num1.ismaster && num0.ismaster){
    suma = parseInt(f[0].Nmaster)+parseInt(s[0].Nmaster);
   }else{
    console.log('check ', f[0], s[0]);
    console.log('La suma F ',  f[0].Ntouse.touse, ' suma S ',s[0].Ntouse.touse );
    suma = f[0].Ntouse.touse+s[0].Ntouse.touse;
   }
   console.log('La suma check ',  suma);
   res = this.MasterNo(suma);
   return res
}
subMaster(num0, num1){
  let f = [];
  let s = [];
  let suma = 0;
  let res:any;
  let ismaster = false;
  if(num0.ismaster){
   let fuse = num0.toshow.split('/');
   ismaster = true;
   let fMaestro = {
    toshow:fuse[0],
    touse:parseInt(fuse[1]),
    ismaster:ismaster,
  }
   f.push({Nmaster:fuse[0],Ntouse:fMaestro});

  }else{
    f.push({Nmaster:0,Ntouse:num0})
  }
  if(num1.ismaster){
    let suse = num1.toshow.split('/');
    ismaster = true;
    let sMaestro = {
      toshow:suse[0],
      touse:parseInt(suse[1]),
      ismaster:ismaster,
    }
    s.push({Nmaster:suse[0],Ntouse:sMaestro});
   }else{
     s.push({Nmaster:0,Ntouse:num1})
   }
   if(num1.ismaster && num0.ismaster){
    suma = parseInt(f[0].Nmaster)-parseInt(s[0].Nmaster);
   }else{
    suma = f[0].Ntouse.touse-s[0].Ntouse.touse;
   }
   let resta = {
    toshow:Math.abs(suma),
    touse:Math.abs(suma),
    ismaster:false,
  }
   return resta
}
}


