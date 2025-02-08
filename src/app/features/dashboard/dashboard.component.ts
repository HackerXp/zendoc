import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import { ItemListComponent } from '../../shared/components/item-list/item-list.component';
import { ItemList } from '@shared/interfaces/item-list';
import { CardComponent } from "../../shared/components/card/card.component";
// import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, ItemListComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  faCalendar = faCalendarDays;
  faClock = faClock;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  total: number = 0;
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
