import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Empty } from '@shared/interfaces/empty';
import { Modal } from '@shared/interfaces/modal';
import { EmptyComponent } from "../../../shared/components/empty/empty.component";
import { Permission } from '@shared/interfaces/permission';
import { BackForwardComponent } from '@shared/components/back-forward/back-forward.component';
import { CategoryService } from '@core/services/category/category.service';
import { Category_Data } from '@shared/interfaces/category';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';
import { ShowHide } from '@shared/interfaces/show-hide';
import { ModalInfoComponent } from '@shared/components/modal-info/modal-info.component';
import { Data } from '@shared/interfaces/document';

type Modo = 'new' | 'edit' | 'delete';

@Component({
  selector: 'app-configurations-category',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule,
    EmptyComponent, BackForwardComponent, ModalInfoComponent,
  ],
  templateUrl: './configurations-category.component.html',
  styleUrl: './configurations-category.component.scss'
})
export class ConfigurationsCategoryComponent {

  unsubscribeSubject = new Subject();
  private fb = inject(FormBuilder);
  private catService = inject(CategoryService);

  modal: Modal = {};
  show: ShowHide = {};
  empty: Empty = { icon: 'icon-files', title: 'Sem categorias  para apresentar', description: 'Não existe nenhuma categoria cadastrada  , adicione uma categoria.' };
  formCategory!: FormGroup;
  permissions: Permission[] = [];
  formData = new FormData();
  categories: Category_Data[] = [];
  category!: Category_Data;
  catObj = {} as Data;
  mode!: Modo;

  constructor() { }

  ngOnInit() {
    this.buildForm();
    this.getCategory();
  }

  buildForm = () => {
    this.formCategory = this.fb.group({
      id: [''],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  };

  openModal = (param: 'new' | 'edit' | 'delete', category?: Category_Data) => {
    this.mode = param;
    if (param == 'edit') {
      this.formCategory.patchValue(category!);
      this.category = category!;
    }

    if (param != 'delete') {
      this.modal = {
        isOpen: true,
        icon: 'icon-files',
        title: param == 'new' ? 'Cadastrar categoria' : 'Editar categoria',
        description: `${param == 'new' ? 'Cadastrar' : 'Editar'} categoria no sistema de forma simples`,
        size: 'w-2/5',
        btnCancel: 'Cancelar',
        btnOK: param == 'new' ? 'Adicionar categoria' : 'Salvar alterações',
        onOff: true
      };
    } else {
      this.catObj.titulo = category?.categoria!;
      this.catObj.id = category?.id!;
      this.show = { dialog: true };
    }

  }

  closeModal = () => {
    this.modal = {};
  }

  delete = (id: number) => {
    LoaderService.startLoading();
    this.catService.delete(id).pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (cat) => {
          this.getCategory();
          this.close();
          LoaderService.stopLoading();
        },
      });
  }

  close = () => {
    this.show = {};
  };

  //intregação com back-end

  saveCategory = () => {
    LoaderService.startLoading();
    this.formData.append('categoria', this.formCategory.value.categoria);
    this.formData.append('descricao', this.formCategory.value.descricao);

    if (this.mode == 'new') {
      this.catService.saveCategory(this.formData).pipe(takeUntil(this.unsubscribeSubject))
        .subscribe({
          next: (cat) => {
            this.getCategory();
            if (cat.codigo == '200') {
              this.formData = new FormData();
              this.closeModal();
              this.buildForm();
            }
            LoaderService.stopLoading();
          },
        });
    } else {
      this.formData.append('id', `${this.category.id}`);
      this.catService.editCategory(this.formData).pipe(takeUntil(this.unsubscribeSubject))
        .subscribe({
          next: (cat) => {
            this.getCategory();
            if (cat.codigo == '200') {
              this.formData = new FormData();
              this.closeModal();
              this.buildForm();
            }
            LoaderService.stopLoading();
          },
        });
    }

  }

  getCategory() {
    LoaderService.startLoading();
    this.catService
      .getCategory()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (cat) => {
          this.categories = cat.data;
          LoaderService.stopLoading();
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
