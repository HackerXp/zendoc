import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Empty } from '@shared/interfaces/empty';
import { Modal } from '@shared/interfaces/modal';
import { EmptyComponent } from "../../../shared/components/empty/empty.component";
import { Permission_Data } from '@shared/interfaces/permission';
import { BackForwardComponent } from '@shared/components/back-forward/back-forward.component';
import { LoaderService } from '@shared/services/loader.service';
import { PermissionService } from '@core/services/permission/permission.service';
import { Subject, takeUntil } from 'rxjs';
import { Data } from '@shared/interfaces/document';
import { ShowHide } from '@shared/interfaces/show-hide';
type Modo = 'new' | 'edit' | 'delete';

@Component({
  selector: 'app-configurations-permission',
  imports: [ModalComponent, FormsModule, ReactiveFormsModule, EmptyComponent, BackForwardComponent],
  templateUrl: './configurations-permission.component.html',
  styleUrl: './configurations-permission.component.scss'
})
export class ConfigurationsPermissionComponent {
  unsubscribeSubject = new Subject();
  private fb = inject(FormBuilder);
  private permService = inject(PermissionService);

  modal: Modal = {};
  empty: Empty = { icon: 'icon-key', title: 'Sem permissões  para apresentar', description: 'Não existe nenhuma permissão cadastrada  , adicione uma permissão.' };
  formPermission!: FormGroup;
  permissions: Permission_Data[] = [];
  permission!: Permission_Data;
  catObj = {} as Data;
  mode!: Modo;
  formData = new FormData();
  show: ShowHide = {};
  constructor() { }

  ngOnInit() {
    this.buildForm();
    this.getPermission();
  }

  buildForm = () => {
    this.formPermission = this.fb.group({
      id: [''],
      descricao: ['', Validators.required],
    });
  };



  openModal1 = () => {
    this.modal = {
      isOpen: true,
      icon: 'icon-key',
      title: 'Cadastrar permissões',
      description:
        'Cadastrar  permissões no sistema de forma simples',
      size: 'w-2/5',
      btnCancel: 'Cancelar',
      btnOK: 'Adicionar permissão',
      onOff: true
    };
  }

  openModal = (param: 'new' | 'edit' | 'delete', permission?: Permission_Data) => {
    this.mode = param;
    if (param == 'edit') {
      this.formPermission.patchValue(permission!);
      this.permission = permission!;
    }

    if (param != 'delete') {
      this.modal = {
        isOpen: true,
        icon: 'icon-key',
        title: param == 'new' ? 'Cadastrar permissões' : 'Editar permissões',
        description: `${param == 'new' ? 'Cadastrar' : 'Editar'} permissões no sistema de forma simples`,
        size: 'w-2/5',
        btnCancel: 'Cancelar',
        btnOK: param == 'new' ? 'Adicionar permissões' : 'Salvar alterações',
        onOff: true
      };
    } else {
      this.catObj.titulo = permission?.descricao!;
      this.catObj.id = permission?.id!;
      this.show = { dialog: true };
    }

  }

  closeModal = () => {
    this.modal = {};
  }

  savePemission = () => {
    LoaderService.startLoading();
    this.formData.append('descricao', this.formPermission.value.descricao);

    if (this.mode == 'new') {
      this.permService.savePermission(this.formData).pipe(takeUntil(this.unsubscribeSubject))
        .subscribe({
          next: (cat) => {
            this.getPermission();
            if (cat.codigo == '200') {
              this.formData = new FormData();
              this.closeModal();
              this.buildForm();
            }
            LoaderService.stopLoading();
          },
        });
    } else {
      this.formData.append('id', `${this.permission.id}`);
      this.permService.editPermission(this.formData).pipe(takeUntil(this.unsubscribeSubject))
        .subscribe({
          next: (cat) => {
            this.getPermission();
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

  getPermission() {
    LoaderService.startLoading()
    this.permService.getPermission().pipe(takeUntil(this.unsubscribeSubject)).subscribe({
      next: (res) => {
        this.permissions = res.data;
      },
      complete: () => LoaderService.stopLoading(),
    });
  }


  ngOnDestroy(): void {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }
}
