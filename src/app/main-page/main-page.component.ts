import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { RegistrationComponent } from '../components/registration/registration.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private loginService: LoginService,
    private snackBar: MatSnackBar,
  private dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.isLoggedUser()){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(LoginComponent, dialogConfig);
    }
  }

  public isLoggedUser(){    
    return this.loginService.getLoggedUser() != null
  }

  isLoggedAdmin(): boolean {
    return this.loginService.isLoggedAdmin();
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.opacity = '0.8';

  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0px';
    document.getElementById('main').style.opacity = '1';
  }

  onClickSignOut(){
    this.loginService.signOutUser();
    this.snackBar.open("Successful sign out", "x", {
      panelClass: 'custom-css-class-success',
      duration: 3000,
    });
    this.openDialogLogin();
  }

  getLoggedUser(): User {
    return this.loginService.getLoggedUser();
  }

  openDialogLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent, dialogConfig);
  }

  openDialogReg() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(RegistrationComponent, dialogConfig);
  }
}
