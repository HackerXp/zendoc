import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BaseService } from '@core/services/base.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  constructor(private ngxPermissionsService: NgxPermissionsService, private baseService: BaseService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = sessionStorage.getItem('token');
    if (token != undefined && token != null) {

      const permissionsList = sessionStorage.getItem('permissoes');
      const permissions = permissionsList?.split(',');
      if (permissions) {
        this.ngxPermissionsService.loadPermissions(permissions);
      }
      return true;
    } else {
      this.router.navigate(['/'])
      return false;
    }
  }
}
