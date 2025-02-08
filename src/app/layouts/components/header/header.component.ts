import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload, faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { Modal } from '@shared/interfaces/modal';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ModalSearchComponent } from "../../../shared/components/modal-search/modal-search.component";
import { ShortcutService } from '@shared/services/shortcut.service';
import { ChipsComponent } from "../../../shared/components/chips/chips.component";
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule,
    ModalComponent,
    FormsModule,
    NgFor, NgIf,
    ReactiveFormsModule,
    ModalSearchComponent, ChipsComponent, TooltipDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  faCircleArrowLeft = faArrowAltCircleLeft;
  faCloud = faCloudUpload;
  faUpload = faUpload;
  documentName = '';
  isDragOver = false;
  selectedCategory = '';
  categories = ['Categoria 1', 'Categoria 2', 'Categoria 3']; // Exemplos
  titles = ['Dashboard', 'Documentos', 'Configurações'];
  modal: Modal = {};
  files: File[] = [];
  chips: string[] = [];
  formFile!: FormGroup;
  isSearchOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private shortcutService: ShortcutService
  ) {
    this.shortcutService.shortcut$.subscribe(() => this.toggleSearch());
  }


  ngOnInit(): void {
    this.toggleMenu();
    this.buildForm();
  }



  buildForm = () => {
    this.formFile = this.fb.group({
      id: [''],
      user: ['elvio.souza'],
      files: ['', Validators.required],
      subject: ['', Validators.required],
      category: ['', Validators.required],
      dateAdd: [new Date()],
    });
  };


  openModal() {
    this.buildForm();
    this.modal = {
      isOpen: true,
      icon: 'icon-add-doc',
      title: 'Adicionar arquivo ',
      description: 'Adicione qualquer tipo de arquivo de forma simples e segura',
      size: 'w-2/5',
      btnCancel: 'Cancelar',
      btnOK: 'Salvar documento'
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  closeModal() {
    this.modal.isOpen = false;
    this.files = [];
    this.chips = [];
  }

  saveDocument() {
    this.toastr.success('Hello world!', 'Toastr fun!');
    console.log('Documento salvo:', this.formFile.value, this.chips);
  }


  // Quando arquivos são arrastados para a área
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
  }

  // Quando o mouse deixa a área de drag
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Quando arquivos são soltos na área
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  // Quando arquivos são selecionados no input
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.addFiles(input.files);
    }
  }

  // Adiciona arquivos à lista
  addFiles(fileList: FileList): void {
    Array.from(fileList).forEach((file) => {
      if (!this.files.some((f) => f.name === file.name)) {
        this.files.push(file);
      }
    });
  }

  // Remove um arquivo da lista
  removeFile(file: File): void {
    this.files = this.files.filter((f) => f !== file);
  }

  toggleMenu() {
    const header = document.querySelectorAll('.navbar')[0];
    const sidebar = document.querySelectorAll('.side-menu')[0];
    const textLogo = document.querySelectorAll('.text-logo')[0];
    const toogleBtn = document.querySelectorAll('.toogleBtn')[0];
    const user_perfil = document.querySelectorAll('.user-perfil')[0];
    const div_img = document.querySelectorAll('.div-img')[0];
    const span_menu = document.querySelectorAll('.span-menu');
    const item_menu = document.querySelectorAll('.item-menu');

    toogleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('toggle');
      header.classList.toggle('toggle');
      toogleBtn.classList.toggle('toggle');
      textLogo.classList.toggle('toggle');
      user_perfil.classList.toggle('toggle');
      div_img.classList.toggle('toggle');

      span_menu.forEach((_) => {
        _.classList.toggle('toggle')
      });

      item_menu.forEach((_, i) => {
        _.classList.toggle('toggle');
        _.setAttribute('title', this.titles[i]);
      });
    });
  }

}
