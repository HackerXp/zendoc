import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Empty } from '@shared/interfaces/empty';
import { Modal } from '@shared/interfaces/modal';
import { EmptyComponent } from "../../../shared/components/empty/empty.component";

import { BackForwardComponent } from '@shared/components/back-forward/back-forward.component';
import { Department_Data } from '@shared/interfaces/department';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';
import { DepartmentService } from '@core/services/department/department.service';
import { Data } from '@shared/interfaces/document';
import { ShowHide } from '@shared/interfaces/show-hide';
import { ModalInfoComponent } from '@shared/components/modal-info/modal-info.component';

type Modo = 'new' | 'edit' | 'delete';

@Component({
  selector: 'app-configurations-department',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule,
    EmptyComponent, BackForwardComponent, ModalInfoComponent],
  templateUrl: './configurations-department.component.html',
  styleUrl: './configurations-department.component.scss'
})
export class ConfigurationsDepartmentComponent {
  unsubscribeSubject = new Subject();
  private fb = inject(FormBuilder);
  private deptService = inject(DepartmentService);

  modal: Modal = {};
  show: ShowHide = {};
  empty: Empty = { icon: 'icon-manage', title: 'Sem departamentos  para apresentar', description: 'Não existe nenhum departamento cadastrado  , adicione um departamento.' };
  formDepartment!: FormGroup;
  formData = new FormData();
  departaments: Department_Data[] = [];
  catObj = {} as Data;
  mode!: Modo;
  department!: Department_Data;
  constructor() { }

  ngOnInit() {
    this.buildForm();
    this.getDepartment();
  }

  buildForm = () => {
    this.formDepartment = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  };


  openModal = (param: 'new' | 'edit' | 'delete', department?: Department_Data) => {
    this.mode = param;
    if (param == 'edit') {
      this.formDepartment.patchValue(department!);
      this.department = department!;
    }

    if (param != 'delete') {
      this.modal = {
        isOpen: true,
        icon: 'icon-files',
        title: param == 'new' ? 'Cadastrar departamento' : 'Editar departamento',
        description: `${param == 'new' ? 'Cadastrar' : 'Editar'} departamento no sistema de forma simples`,
        size: 'w-2/5',
        btnCancel: 'Cancelar',
        btnOK: param == 'new' ? 'Adicionar departamento' : 'Salvar alterações',
        onOff: true
      };
    } else {
      this.catObj.titulo = department?.nome!;
      this.catObj.id = department?.id!;
      this.show = { dialog: true };
    }

  }

  closeModal = () => {
    this.modal = {};
  }

  delete = (id: number) => {
    LoaderService.startLoading();
    this.deptService.delete(id).pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (cat) => {
          this.getDepartment();
          this.close();
          LoaderService.stopLoading();
        },
      });
  }

  close = () => {
    this.show = {};
  };

  //intregação com back-end

  saveDepartment = () => {
    LoaderService.startLoading();
    this.formData.append('departamento', this.formDepartment.value.nome);
    this.formData.append('descricao', this.formDepartment.value.descricao);

    if (this.mode == 'new') {
      this.deptService.saveDepartment(this.formData).pipe(takeUntil(this.unsubscribeSubject))
        .subscribe({
          next: (cat) => {
            this.getDepartment();
            if (cat.codigo == '200') {
              this.formData = new FormData();
              this.closeModal();
              this.buildForm();
            }
            LoaderService.stopLoading();
          },
        });
    } else {
      this.formData.append('id', `${this.department.id}`);
      console.log(this.formData);
      
      this.deptService.editDepartment(this.formData).pipe(takeUntil(this.unsubscribeSubject))
        .subscribe({
          next: (cat) => {
            this.getDepartment();
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

  getDepartment() {
    LoaderService.startLoading();
    this.deptService
      .getDepartment()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (cat) => {
          this.departaments = cat.data;
          LoaderService.stopLoading();
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
