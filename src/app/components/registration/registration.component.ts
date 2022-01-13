import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  status: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastnameFormControl = new FormControl('', [
    Validators.required
  ]);
  loginFormControl = new FormControl('', [
    Validators.required
  ]);
  securityCodeFormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern('[1-9]*'),
    Validators.maxLength(8)
  ]);
  constructor(
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private dialog: MatDialog,
    private loginService: LoginService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login() {
    this.user = new User(null, this.loginFormControl.value, this.nameFormControl.value, this.lastnameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value);
    this.doRegistration();
    this.dialogRef.close();
  }

  doRegistration(): void {
    this.loginService.doRegistration(this.user)
      .subscribe(
        (response) => {
          this.snackBar.open("Successed registration", "x", {
            panelClass: 'custom-css-class-success',
            duration: 5000,
          });
          this.loginService.setUser(response)
        },
        (error) => {
          this.snackBar.open(error.status + " error :(", "x", {
            panelClass: 'custom-css-class-error',
            duration: 5000,
          });
        }
      )
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  back() {
    this.dialogRef.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent, dialogConfig);
  }

  isValid(): boolean {
    if (this.emailFormControl.valid && this.passwordFormControl.valid && this.loginFormControl.valid
      && this.nameFormControl.valid && this.lastnameFormControl.valid) {
      return true;
    }
    return false;
  }


}
