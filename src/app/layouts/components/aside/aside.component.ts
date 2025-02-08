import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getFirstAndLastName, getInitials } from '@core/helper/utils';
import { User } from '@core/interfaces/user';
import { UserToken } from '@core/interfaces/user-token';
import { AuthService } from '@core/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxPermissionsModule } from 'ngx-permissions';
@Component({
  selector: 'app-aside',
  imports: [FontAwesomeModule, RouterModule, NgxPermissionsModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  faSignOutAlt = faSignOutAlt;
  private authService = inject(AuthService);
  userToken!: UserToken;
  user!: User;
  permissoes: string[] = [];

  ngOnInit(): void {
    this.setUser();
    this.getPermissions();
  }


  logout = () => {
    this.authService.logout()
  }

  setUser = () => {
    this.userToken = this.authService.decodeToken();

    this.user = {
      name: getFirstAndLastName(this.userToken?.nome!),
      initials: getInitials(this.userToken?.nome!),
      email: this.userToken?.email!,
    };


  }

  getPermissions() {
    this.userToken?.permissoes?.map((modulo) => {
      this.permissoes.push(modulo.descricao?.trim()!);
    });
    sessionStorage.setItem('permissoes', String(this.permissoes));
  }
}
