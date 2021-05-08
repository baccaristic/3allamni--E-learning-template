import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-testview',
  templateUrl: './testview.component.html',
  styleUrls: ['./testview.component.css']
})
export class TestviewComponent implements OnInit {
  @ViewChild(PdfViewerComponent) private pdfComponent!: PdfViewerComponent;
  page = 1
  renderText = true;
  originalSize = true;
  fitToPage = false;
  showAll = true;
  showBorders = true;
  renderTextModes = [0, 1, 2];
  renderTextMode = 1;
  rotation = 0;
  zoom = 1;
  zoomScale = 'page-width';
  zoomScales = ['page-width', 'page-fit', 'page-height'];
  pdfQuery = '';
  totalPages!: number;
  
  zoomIn() {
    this.zoom += 0.05;
  }

  zoomOut() {
    if (this.zoom > 0.05)
      this.zoom -= 0.05;
  }

  rotateDoc() {
    this.rotation += 90;
  }

  // Event for search operation
  searchQueryChanged(event:any) {
    if ((<HTMLInputElement>event.target).value !== this.pdfQuery) {
      this.pdfQuery = (<HTMLInputElement>event.target).value;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true
      });
    }
  }
  scrollToPage(page: number) {
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: page
    });
  }
  DoScroll(){
    let page = (<HTMLInputElement>document.getElementById("page")).value  
  this.scrollToPage(Number(page))}
download(){
  const linkSource = this.url;
  const downloadLink = document.createElement("a");
  const fileName = "course.pdf";

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
  // Event handler when new PDF file is selected

  callBackFn(event:any) {
    console.log('callBackFn', event);
    // Setting total number of pages
    this.totalPages = event._pdfInfo.numPages
  }
  pageRendered(event:any) {
    console.log('pageRendered', event);
  }
  textLayerRendered(event:any) {
    console.log('textLayerRendered', event);
  }
  onError(event:any) {
    console.error('onError', event);
  }
  onProgress(event:any) {
    console.log('onProgress', event);
  }
  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
 
     
  });
   }
url!:string;
pdf!: any;
id:any;
base64ToArrayBuffer(base64:string) {
  let binary_string =  window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}
  async ngOnInit(){
    const rep = await fetch(`http://127.0.0.1:8000/getcourse?id=${this.id}`)
    if (rep.ok){
      rep.json().then(data =>{
        this.url = data[0].course_link
        this.pdf = this.base64ToArrayBuffer(this.url.split(",")[1]);
      })
    }
  }

}
