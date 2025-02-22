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
  selector: 'app-configurations-permission',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule, EmptyComponent,BackForwardComponent],
  templateUrl: './configurations-permission.component.html',
  styleUrl: './configurations-permission.component.scss'
})
export class ConfigurationsPermissionComponent {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  modal: Modal = {};
  empty: Empty = { icon: 'icon-key', title: 'Sem permissões  para apresentar', description: 'Não existe nenhuma permissão cadastrada  , adicione uma permissão.' };
  formPermission!: FormGroup;
  permissions: Permission[] = [];
  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm = () => {
    this.formPermission = this.fb.group({
      id: [''],
      permission: ['', Validators.required],
    });
  };



  openModal = () => {
    this.modal = {
      isOpen: true,
      icon: 'icon-key',
      title: 'Cadastrar permissões',
      description:
        'Cadastrar  permissões no sistema de forma simples',
      size: 'w-1/3',
      btnCancel: 'Cancelar',
      btnOK: 'Adicionar permissão',
      onOff: true
    };
  }

  closeModal = () => {
    this.modal = {};
  }

  savePemission = () => {
    console.log(this.formPermission.value);

  }
}
