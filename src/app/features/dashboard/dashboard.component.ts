import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import { ItemListComponent } from '../../shared/components/item-list/item-list.component';
import { ItemList } from '@shared/interfaces/item-list';
import { CardComponent } from "../../shared/components/card/card.component";
import { ApiService } from '@core/services/api.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, ItemListComponent, CardComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  unsubscribeSubject = new Subject();
  private apiService = inject(ApiService);
  private toastr = inject(ToastrService);

  faCalendar = faCalendarDays;
  faClock = faClock;
  total: number = 0;

  items: ItemList[] = [];

  totalDocuments$: Observable<number> = this.apiService.totalDocuments$;

  constructor() {
    // Calculando o total acumulado
    this.total = this.items.reduce((acc, item) => acc + item.total, 0);
  }

  ngOnInit() {
    this.enableNavigationSidebar();
    this.getDocumentByCategory();
  }

  getDocumentByCategory = () => {
    this.apiService.getDocumentByCategory()
      .pipe(takeUntil(this.unsubscribeSubject)).subscribe({
        next: (dc:any) => {
          this.items = dc.data;
        },
        error: () => {
          this.toastr.error('Erro ao carregar documentos', 'Erro');
        }
      });
  };

  enableNavigationSidebar() {
    if (localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      window.location.reload();
    }
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
