import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Modal } from '@shared/interfaces/modal';

@Component({
  selector: 'app-configurations-profiles',
  templateUrl: './configurations-profiles.component.html',
  styleUrls: ['./configurations-profiles.component.css'],
  imports: [ModalComponent],
})
export class ConfigurationsProfilesComponent implements OnInit {
  modal: Modal = {};
  files: File[] = [];
  chips: string[] = [];
  formFile!: FormGroup;

  constructor() {}

  ngOnInit() {}

  closeModal = () => {
    this.modal = {};
  };
  saveUser = () => {};

  openModal() {
    this.modal = {
      isOpen: true,
      icon: 'icon-add-doc',
      title: 'Adicionar arquivo ',
      description:
        'Adicione qualquer tipo de arquivo de forma simples e segura',
      size: 'w-2/5',
      btnCancel: 'Cancelar',
      btnOK: 'Salvar documento',
    };
  }
}
