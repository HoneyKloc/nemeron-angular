import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
doc = new jsPDF();
  constructor() { }
}
