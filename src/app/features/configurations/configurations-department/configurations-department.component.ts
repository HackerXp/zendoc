import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Empty } from '@shared/interfaces/empty';
import { Modal } from '@shared/interfaces/modal';
import { ToastrService } from 'ngx-toastr';
import { EmptyComponent } from "../../../shared/components/empty/empty.component";
import { Permission } from '@shared/interfaces/permission';
import { BackForwardComponent } from '@shared/components/back-forward/back-forward.component';

@Component({
  selector: 'app-configurations-department',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule, EmptyComponent,BackForwardComponent],
  templateUrl: './configurations-department.component.html',
  styleUrl: './configurations-department.component.scss'
})
export class ConfigurationsDepartmentComponent {
 private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  modal: Modal = {};
  empty: Empty = { icon: 'icon-manage', title: 'Sem departamentos  para apresentar', description: 'Não existe nenhum departamento cadastrado  , adicione um departamento.' };
  formDepartment!: FormGroup;
  permissions: Permission[] = [];
  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm = () => {
    this.formDepartment = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  };



  openModal = () => {
    this.modal = {
      isOpen: true,
      icon: 'icon-manage',
      title: 'Cadastrar departamento',
      description:
        'Cadastrar departamento no sistema de forma simples',
      size: 'w-2/5',
      btnCancel: 'Cancelar',
      btnOK: 'Adicionar departamento',
      onOff: true
    };
  }

  closeModal = () => {
    this.modal = {};
  }

  saveDepartment = () => {
    console.log(this.formDepartment.value);

  }
}
