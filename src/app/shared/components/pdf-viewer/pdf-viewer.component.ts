import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PdfViewerModule,
  PdfViewerComponent as Ng2PdfViewerComponent,
} from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  imports: [PdfViewerModule, NgxExtendedPdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer!: Ng2PdfViewerComponent;
  @ViewChild('docContainer', { static: true }) docContainer!: ElementRef;
  private _activateRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  zoom = 1.0;
  private _cdr = inject(ChangeDetectorRef);
  pdf: string | undefined;
  imageSrc: string | undefined;
  fileDocUrl: string | undefined;

  ngOnInit(): void {
    const id = this._activateRoute.snapshot.params['id'];
    const type = id.split('.')[1];

    if (type === 'pdf') {
      this.pdf = `http://localhost/api-zendoc/app/files/${id}`;

      this.http.get(this.pdf, { responseType: 'blob' }).subscribe(
        (blob) => {
          this.pdf = URL.createObjectURL(blob);
          console.log(this.pdf, 'pdf blob');

        },
        (error) => console.error('Erro ao carregar PDF:', error)
      );


      this._cdr.detectChanges();
    } else if (type === 'jpg' || type === 'jpeg') {
      this.imageSrc = `http://localhost/api-zendoc/app/files/${id}`;
      this._cdr.detectChanges();
    } else if (type === 'docx' || type === 'doc') {
      this.fileDocUrl = `http://localhost/api-zendoc/app/files/${id}`;
      this._cdr.detectChanges();
    }
  }
}


