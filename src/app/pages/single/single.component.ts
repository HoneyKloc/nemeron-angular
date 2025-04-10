import { Component, ElementRef, Injectable, ViewChild, AfterViewInit, OnInit, HostListener} from '@angular/core';
import { NgbDateStruct,} from '@ng-bootstrap/ng-bootstrap';
import '@angular/localize/init'
import Swal from 'sweetalert2'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CalculosService } from '../../service/calculos.service';
import { ActivatedRoute,  Router } from '@angular/router'
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import moment from 'moment';
import {MaskitoOptions, } from '@maskito/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { HttpClient } from '@angular/common/http';
// then
//
// @ts-ignore
// import * as html2pdf from 'html2pdf.js'

// declare var html2pdf:any;


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
    selector: 'app-single',
    templateUrl: './single.component.html',
    styleUrl: './single.component.scss',
    animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible <=> hidden', animate('1s ease-in-out')),
        ]),
    ],
    standalone: false
})



export class SingleComponent implements OnInit {
  // ^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$
  // mask: /^\d+$/,

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
  print:boolean = true;
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
  PinYear:IPinYear[]=[]
  mobilMesSelect ={
    year:0,
    Month:0,
  }
@ViewChild('birth')birth!: ElementRef;
@ViewChild('content') content: ElementRef;
@ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
@ViewChild('swiperano') swiperano!: ElementRef<SwiperContainer>;
@ViewChild('target', { static: false }) private myScrollContainer: ElementRef;


@ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;
index = 0;
indexano = 0;
  // Swiper
  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
  }
  swiperConfigano: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
  }
MontsVisble={
  CYQ1: false,
  CYQ2: false,
  CYQ3: false,
  NYQ: false,
}
  constructor(private CalculosService: CalculosService,private activateRoute: ActivatedRoute, private ruta: Router, private httpClient: HttpClient){
    }
    declare html2pdf: any;
  title = 'Single';
  menu:boolean=true;
loading:boolean = true;
Nombre:string = '';
birthdate:string;
birthdateShow:string;
  ngOnInit() {
    this.getScreenWidth = window.innerWidth > 600 ? true: false;
    console.log('creen ',  this.getScreenWidth);
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
    console.log('creen hot',  this.getScreenWidth);

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
    this.loadScript();
    console.log('width ', this.getScreenWidth);
this.theLoading(1500).then((res)=>{
  console.log('loadingnginit', res)
  this.isVisible = true;
});

this.swiper.nativeElement.swiper.activeIndex = this.index;
this.CalculosService.getTodaysMonth().then((meshoy) =>{
console.log('crrent month ', meshoy);
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
// console.log('nombre', this.Nombre);
// console.log('birthdate', this.birthdate);
let fixDate = this.birthdate.split('/');
// console.log('new fecha ', `${fixDate[1]}-${fixDate[0]}-${fixDate[2]}`);
// console.log('fixDate', fixDate);
this.loading = true;
this.isVisible = this.isVisible ? false : true;
if(this.Nombre.length <= 1 || this.birthdate  == undefined){
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
// console.log('fecha ', fixDate.length, parseInt(fixDate[0]),parseInt(fixDate[1]), parseInt(fixDate[2]))

if(fixDate.length < 3 ){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate length.<br>Verifica la fecha completa.",
    showConfirmButton: false,
    timer: 3500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
if(parseInt(fixDate[0]) < 1 || parseInt(fixDate[0]) > 31 ){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate day.<br>Verifica el día de la fecha .",
    showConfirmButton: false,
    timer: 3500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
if(parseInt(fixDate[1]) < 1 || parseInt(fixDate[1]) > 12 ){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate month.<br>Verifica el mes de la fecha .",
    showConfirmButton: false,
    timer: 3500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
if(parseInt(fixDate[2]) < 1 ){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error",
    html:"Check birthdate year.<br>Verifica el mes del año .",
    showConfirmButton: false,
    timer: 3500
  }).then(()=>{
    this.isVisible = this.isVisible ? false : true;
    this.loading = false;

  });
  return
}
this.birthdate = `${fixDate[1]}/${fixDate[0]}/${fixDate[2]}`;
// console.log('culeaños ', this.birthdate);
setTimeout(() => {
  this.ListMonths();
this.CalculosService.GetFirstLine(this.birthdate).then((pinaculo:pinaculoData[])=>{
  this.CalculosService.GetYear(this.birthdate).then((UnY:any[])=>{
    this.PinYear=UnY;
    // console.log('PinYear', this.PinYear);
setTimeout(() => {
  this.loading = false;
}, 1000);
  });
  this.resultados = this.resultados ? false : true;
  // this.scrollToBottom();
  this.Rpinaculo = pinaculo;
  console.log('resulto ', this.Rpinaculo);
  // console.log('resulto ', this.Rpinaculo[0].A);
  this.birthdateShow = moment(this.birthdate).format('MMM Do YYYY').toString();
});
}, 1500);
}
scrollToBottom = () => {
  // const selRef = this.content.nativeElement.querySelector('.option.selected') as HTMLElement;
  // this.viewRef.nativeElement.scrollTo(0, selRef.offsetTop - 100);
  // console.log('top ', this.content.nativeElement.scrollHeight);
  try {
    this.content.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  } catch (err) {}
}
slideChange(swiper: any) {
  this.index = swiper.detail[0].activeIndex;
}
slideChangeano(swiperano: any) {
  this.indexano = swiperano.detail[0].activeIndex;
  // console.log('anio ', this.indexano);
}
reload(){

  this.activateRoute.url.subscribe((event) => {
    // console.log(event); // It's an array remember [0]
    // console.log(event[0].path); // e.g. /products
    // console.log(event[0].parameters); // e.g. { id: 'x8klP0' }
    if(event[0].path == 'single'){
      this.ruta.navigate(['/reload']).then(()=>{console.log('corrio')});
    }else{
      this.ruta.navigate(['/single']).then(()=>{console.log('corrio')});

    }
  });

}

ListMonths(){
  let thisY = moment().year();
  let NhisY = moment().year() + 1;
  let thisM = moment().month();
  this.ListMobileM = [];
  // console.log('this y and month ', thisY, thisM);
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
  // console.log('mes to list ',   this.ListMobileM);
}
callMesMobil(event:any){
  // this.mobilMesSelect.year
  // console.log(event);
  this.resultadosMes = false;
  this.smallloading = true;
  this.myScrollContainer.nativeElement.scroll({
    top: this.myScrollContainer.nativeElement.scrollHeight + 400,
    left: 0,
    behavior: 'smooth'

  });
  setTimeout(() => {
    let val = JSON.parse(event.target.value);
  // console.log(val);
  this.mobilMesSelect.year = val?.Year;
  this.mobilMesSelect.Month = val?.Mon;
  this.smallloading = false;
  this.resultadosMes = this.resultadosMes ? false : true;
  setTimeout(() => {
    this.myScrollContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, 600);
  }, 1500);

}
generarPDFORG1() {

// document.getElementById('containerBox').style.display = 'none';
// this.print = false;

  let div = document.getElementById('content');
  // console.log(div);

  let opt = {
    callback: function (jsPdf) {
        jsPdf.save("Pinaculo.pdf");
    },
    margin: [5, 10, 5, 10],
    // autoPaging: true,
    pagesplit: true,
    backgroundColor:"#ffffff",
    html2canvas: {
        allowTaint: true,
        letterRendering: true,
        logging: false,
        scale: .5
    }
};
  html2canvas(div, opt).then((canvas) => {

    let img = canvas.toDataURL("image/PNG");
    let doc = new jsPDF('l', 'mm', 'a4', false);

    // Add image Canvas to PDF
    let bufferX = 5;
    let bufferY = 5;
    let imgProps = (<any>doc).getImageProperties(img);
    let pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

    return doc;
  }).then((doc) => {
    doc.save('postres.pdf');
  });
}
generarPDFORG() {
  let jsPdf = new jsPDF("portrait","pt", 'a4', false);
  let htmlElement = document.getElementById('content');

  // you need to load html2canvas (and dompurify if you pass a string to html)
            // to open the generated PDF in browser window en callback
          // window.open(jsPdf.output('bloburl'));
          // margin: [left, top, right ,bottom]
  let opt = {
      callback: function (jsPdf) {
          jsPdf.save("Pinaculo.pdf");
      },
      margin: [5, 10, 5, 10],
      autoPaging: true,
      backgroundColor:"#ffffff",
      html2canvas: {
          allowTaint: true,
          letterRendering: true,
          logging: false,
          scale: .5
      }
  };

  jsPdf.html(htmlElement, opt);
}
generarPDF() {

  // document.getElementById('containerBox').style.display = 'none';
  // this.print = false;

    let div = document.getElementById('content');
    // console.log(div);

    let opt = {
      callback: function (jsPdf) {
          jsPdf.save("Pinaculo.pdf");
      },
      margin: [5, 10, 5, 10],
      autoPaging: true,
      pagesplit: true,
      backgroundColor:"#ffff",
      html2canvas: {
          allowTaint: true,
          letterRendering: true,
          logging: false,
          scale: .5
      }
  };
    html2canvas(div, opt).then((canvas) => {

      let img = canvas.toDataURL("image/PNG");
      let doc = new jsPDF('p', 'mm', 'a4', false);
      let position = 0;

      // Add image Canvas to PDF 210, h 295
      let imgWidth = 205;
      let pageHeight = 280;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      // console.log('largo canvas',canvas.height)
      // let bufferX = 5;
      // let bufferY = 5;
      let imgProps = (<any>doc).getImageProperties(img);
      // console.log('largo pagina',imgProps.height )
      // console.log('width pagina',imgProps.width )
      // let pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
// let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Pinaculo.pdf');

      return doc;
    });
  }
  downloadPdf() {
    let opt = {
      callback: function (jsPdf) {
          jsPdf.save("Pinaculo.pdf");
      },
      margin: [5, 10, 5, 10],
      autoPaging: true,
      pagesplit: true,
      backgroundColor:"#ffff",
      html2canvas: {
          allowTaint: true,
          letterRendering: true,
          logging: false,
          scale: .5
      }
  };
  this.getScreenWidth = true;
  // console.log('screenWidth ',this.getScreenWidth);
    let data = document.getElementById('content');

    // console.log('data ',data)

    html2canvas(data, opt) // useCORS is optional if your images are externally hosted somewhere like s3
    .then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      // let doc = new jsPDF('p', 'mm', 'a4', false);
      let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
      var pdfWidth = pdf.internal.pageSize.getWidth();
      var pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      //  pdf.save('new-file.pdf');
      this.getScreenWidth = false;
      console.log('screenWidth ',this.getScreenWidth)
      window.open(pdf.output("bloburl"), '_blank');
    });

  }

downloadPdfOO() {
    // alert('Workingon download, coming soon');
  let pinaculo = document.getElementById('content').outerHTML;
  let styles = "";
  let stylesall = "";

  this.httpClient.get('assets/style/prints.css', { responseType: 'text' })
      .subscribe((data) => {
        styles = data;
        console.log(data);
        this.httpClient.get('styles.css', { responseType: 'text' })
.subscribe((data) => {
  stylesall = data;
  console.log('style all',data);
  let printPreview = window.open('about:blank', 'print_preview');
  let printDocument = printPreview.document;
printDocument.open();
printDocument.write(`<!DOCTYPE html><html><head><link rel='stylesheet' href='styles.css'><style>${styles} .HebertTEst{color:red;} ${stylesall}
 </style><script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js" integrity="sha512-MpDFIChbcXl2QgipQrt1VcPHMldRILetapBl5MPCA9Y8r7qvlwx1/Mc9hNTzY+kS5kX6PdoDq41ws1HiVNLdZA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script></head><body>
${pinaculo} <script>
    function generatePDF() {
        const element = document.getElementById('content');
        html2pdf()
            .from(element)
            .save();

    }
 $( document ).ready(function() {
 console.log( "ready pinrt!" );
 window.print();
setTimeout(() => window.close(), 1000);

});
</script> </body></html>`);
printDocument.close();
});
});

// @media print {body {zoom: 80%;}}
  // window.open(data, '_blank');${styles} ${stylesall}
  // <link rel='stylesheet' href='assets/style/prints.css'><link rel='stylesheet' href='styles.css'>


}

async exportToPDF() {
  let pinaculo = document.getElementById('content').outerHTML;

  let styles = '';
  this.httpClient.get('assets/style/prints.css', { responseType: 'text' }).subscribe((data) => {
        console.log('corrio style ', data);
        styles = data;

    this.httpClient.get('styles.css', { responseType: 'text' }).subscribe((data) => {
  console.log('style all',data);
  let stylesall = data;

  let htm:any = `
  <!DOCTYPE html><html><head><link rel='stylesheet' href='styles.css'><style>${styles} .HebertTEst{color:red;} ${stylesall}
 </style><script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script></head><body>
${pinaculo} <script></body></html>`;

  html2pdf(pinaculo, {
  filename: 'myFilename.pdf',
});
});
});
}

public loadScript() {
  console.log('preparing to load...')
  let node = document.createElement('script');
  node.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
  node.type = 'text/javascript';
  node.async = true;
  document.getElementsByTagName('head')[0].appendChild(node);
}
}
