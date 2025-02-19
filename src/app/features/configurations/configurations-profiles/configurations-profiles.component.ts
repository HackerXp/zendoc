import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Modal } from '@shared/interfaces/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configurations-profiles',
  templateUrl: './configurations-profiles.component.html',
  styleUrls: ['./configurations-profiles.component.css'],
  imports: [ModalComponent, FormsModule, ReactiveFormsModule,],
})
export class ConfigurationsProfilesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  modal: Modal = {};
  files: File[] = [];
  chips: string[] = [];
  formUser!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm = () => {
    this.formUser = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
      department: ['', Validators.required],
      permissao: ['', Validators.required],
    });
  };



  closeModal = () => {
    this.modal = {};
  };
  saveUser = () => { };

  openModal() {
    this.modal = {
      isOpen: true,
      icon: 'icon-user',
      title: 'Cadastrar usuários',
      description:
        'Cadastrar  perfis no sistema de forma simples',
      size: 'w-2/5',
      btnCancel: 'Cancelar',
      btnOK: 'Salvar cadastro',
    };
  }
}
