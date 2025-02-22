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
  selector: 'app-configurations-category',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule, EmptyComponent, BackForwardComponent],
  templateUrl: './configurations-category.component.html',
  styleUrl: './configurations-category.component.scss'
})
export class ConfigurationsCategoryComponent {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  modal: Modal = {};
  empty: Empty = { icon: 'icon-files', title: 'Sem categorias  para apresentar', description: 'Não existe nenhuma categoria cadastrada  , adicione uma categoria.' };
  formCategory!: FormGroup;
  permissions: Permission[] = [];
  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm = () => {
    this.formCategory = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  };



  openModal = () => {
    this.modal = {
      isOpen: true,
      icon: 'icon-files',
      title: 'Cadastrar categoria',
      description:
        'Cadastrar categoria no sistema de forma simples',
      size: 'w-1/3',
      btnCancel: 'Cancelar',
      btnOK: 'Adicionar categoria',
      onOff: true
    };
  }

  closeModal = () => {
    this.modal = {};
  }

  saveCategory = () => {
    console.log(this.formCategory.value);

  }
}
