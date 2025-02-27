import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateUsername } from '@core/helper/utils';
import { DepartmentService } from '@core/services/department/department.service';
import { PermissionService } from '@core/services/permission/permission.service';
import { UserService } from '@core/services/user/user.service';
import { BackForwardComponent } from '@shared/components/back-forward/back-forward.component';
import { EmptyComponent } from '@shared/components/empty/empty.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Department_Data } from '@shared/interfaces/department';
import { Empty } from '@shared/interfaces/empty';
import { Modal } from '@shared/interfaces/modal';
import { Permission_Data } from '@shared/interfaces/permission';
import { PermissionUser } from '@shared/interfaces/permission-user';
import { LoaderService } from '@shared/services/loader.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-configurations-profiles',
  templateUrl: './configurations-profiles.component.html',
  styleUrls: ['./configurations-profiles.component.css'],
  imports: [ModalComponent, FormsModule, ReactiveFormsModule, EmptyComponent, BackForwardComponent],
})
export class ConfigurationsProfilesComponent implements OnInit {
  unsubscribeSubject = new Subject();
  private fb = inject(FormBuilder);
  private permService = inject(PermissionService);
  private deptService = inject(DepartmentService);
  private userService = inject(UserService);

  formData = new FormData();
  modal: Modal = {};
  chips: string[] = [];
  formUser!: FormGroup;
  profiles: any[] = [];
  permissions: Permission_Data[] = [];
  departaments: Department_Data[] = [];
  permissionUser: PermissionUser[] = [];

  empty: Empty = { icon: 'icon-user-none', title: 'Sem perfis para apresentar', description: 'Não existe nenhum perfil cadastrado  , adicione um perfil.' };
  constructor() { }

  ngOnInit() {
    this.buildForm();
    this.getPermission();
    this.getDepartment();
  }

  buildForm = () => {
    this.formUser = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['123456',],
      iddepartamento: ['', Validators.required],
      permissoes: ['', Validators.required],
    });
  };

  get form() {
    return this.formUser.controls;
  }

  setUserName = (name: string) => {
    this.form['usuario'].setValue(generateUsername(name))
  }

  closeModal = () => {
    this.modal = {};
  };

  saveUser = () => {
    LoaderService.startLoading()
    this.formData.append('nome', this.formUser.value.nome);
    this.formData.append('email', this.formUser.value.email);
    this.formData.append('usuario', this.formUser.value.usuario);
    this.formData.append('senha', this.formUser.value.senha);
    this.formData.append('iddepartamento', this.formUser.value.iddepartamento);

    this.permissionUser.forEach((perm) => {
      this.formData.append('permissoes[]', `${perm.idpermissao}`);
    });

    this.userService.saveUser(this.formData).pipe(takeUntil(this.unsubscribeSubject)).subscribe({
      next: (res) => {
        console.log(res);

      },
      complete: () => LoaderService.stopLoading(),
    });

    console.log(this.formData);
  };

  openModal = () => {
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

  getPermission() {
    LoaderService.startLoading()
    this.permService.getPermission().pipe(takeUntil(this.unsubscribeSubject)).subscribe({
      next: (res) => {
        this.permissions = res.data;
      },
      complete: () => LoaderService.stopLoading(),
    });
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


  addPermisionUser = (idpermissao: any) => {
    idpermissao = Number(idpermissao.target.value);
    // Remove todas as permissões duplicadas antes de adicionar uma nova
    this.permissionUser = this.permissionUser.filter(p => p.idpermissao != idpermissao);

    // Adiciona a nova permissão ao array
    this.permissionUser.push({ idpermissao: idpermissao });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next(null);
    this.unsubscribeSubject.complete();
  }

}
