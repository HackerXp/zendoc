import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,

} from '@angular/forms';
import { NgIf } from '@angular/common';
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
import { DepartmentService } from '@core/services/department/department.service';
import { Subject, takeUntil } from 'rxjs';
import { Department_Data } from '@shared/interfaces/department';
import { Category_Data } from '@shared/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';
import { ApiService } from '@core/services/api.service';
import { AuthService } from '@core/services/auth.service';
import { UserToken } from '@core/interfaces/user-token';
import ControlaSessionDecorator from '@core/decorators/controla-session.decorator';

@Component({
  selector: 'app-header',
  imports: [
    FontAwesomeModule,
    ModalComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    ModalSearchComponent,
    ChipsComponent,
    TooltipDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  faCircleArrowLeft = faArrowAltCircleLeft;
  faCloud = faCloudUpload;
  faUpload = faUpload;
  documentName = '';
  isDragOver = false;
  selectedCategory = '';
  categories: Category_Data[] = [];
  titles = ['Dashboard', 'Documentos', 'Configurações'];
  modal: Modal = {};
  files: File[] = [];
  chips: string[] = [];
  formFile!: FormGroup;
  formData = new FormData();
  isSearchOpen = false;
  unsubscribeSubject = new Subject();
  private deptService = inject(DepartmentService);
  private catService = inject(CategoryService);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private shortcutService = inject(ShortcutService);
  department: Department_Data[] = [];
  userToken!: UserToken;

  constructor(
  ) {
    this.shortcutService.shortcut$.subscribe(() => this.toggleSearch());
  }

  @ControlaSessionDecorator(300000, 'http://localhost:4200')

  ngOnInit(): void {
    this.toggleMenu();
    this.buildForm();
    this.getDept();
    this.getCategory();
    this.setUser();
  }

  buildForm = () => {
    this.formFile = this.fb.group({
      id: [''],
      user: [''],
      files: ['', Validators.required],
      subject: ['', Validators.required],
      category: ['', Validators.required],
      department: ['', Validators.required],
      dateAdd: [new Date()],
    });
  };

  getDept() {
    this.deptService
      .getDepartment()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (dept) => {
          this.department = dept.data;

          this.department = this.department
            .map(dept => dept.id === this.userToken.iddepartamento ? { ...dept, descricao: "Interno" } : dept)
            .sort((a, b) => (a.id === this.userToken.iddepartamento ? -1 : b.id === this.userToken.iddepartamento ? 1 : 0));
        },
      });
  }

  getCategory() {
    this.catService
      .getCategory()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (cat) => {
          this.categories = cat.data;
        },
      });
  }

  openModal() {
    this.buildForm();
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

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  closeModal() {
    this.modal.isOpen = false;
    this.files = [];
    this.chips = [];
  }

  saveDocument() {
    if (this.files.length === 0) {
      this.toastr.warning('Selecione pelo menos um arquivo antes de enviar');
      return;
    }

    this.formData.append('idusuario', `${this.userToken?.idusuario}`);
    this.formData.append('idcategoria', this.formFile.value.category);
    this.formData.append('proveniencia', this.formFile.value.department);
    this.formData.append('iddepartamento', `${this.userToken.iddepartamento}`);
    this.formData.append('titulo', this.formFile.value.subject);
    this.formData.append('tags', `${[...this.chips]}`);

    this.categories.find((cat) => {
      if (cat.id == this.formFile.value.category) {
        this.formData.append('tipo', cat.categoria);
      }
    });

    this.formData.append('descricao', this.formFile.value.subject);
    this.files.forEach((file) => {
      this.formData.append('files[]', file);
    });

    this.apiService.saveDocument(this.formData);
    this.files = [];
    this.formData = new FormData();
    this.closeModal();
    this.buildForm();
  }

  setUser = () => {
    this.userToken = this.authService.decodeToken();
  };

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

      // const filesArray = Array.from(input.files) as File[];
      // this.files = [...this.files, ...filesArray];
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
    // this.files.splice(index, 1);
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
        _.classList.toggle('toggle');
      });

      item_menu.forEach((_, i) => {
        _.classList.toggle('toggle');
        _.setAttribute('title', this.titles[i]);
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
