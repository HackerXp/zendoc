import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import { ItemListComponent } from '../../shared/components/item-list/item-list.component';
import { ItemList } from '@shared/interfaces/item-list';
import { CardComponent } from "../../shared/components/card/card.component";
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
// import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, ItemListComponent, CardComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  faCalendar = faCalendarDays;
  faClock = faClock;
  total = 0;
  items: ItemList[] = [
    {
      title: 'Documentos',
      description: 'Total de documentos',
      icon: 'icon-doc',
      total: 200,
      type: 'Acta',
    },
    {
      title: 'Imagens',
      description: 'Total de imagens',
      icon: 'icon-doc',
      total: 100,
      type: 'Boletim Ocorrencia',
    },
  ];
  private apiService = inject(ApiService);
  totalDocuments$: Observable<number> = this.apiService.totalDocuments$;

  constructor() {
    // Calculando o total acumulado
    this.total = this.items.reduce((acc, item) => acc + item.total, 0);
  }

  ngOnInit() {
    this.enableNavigationSidebar();
  }

  goToDoc = (param: string | undefined) => {
    console.log(param);
  };

  enableNavigationSidebar() {
    if (localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      window.location.reload();
    }
  }
}
