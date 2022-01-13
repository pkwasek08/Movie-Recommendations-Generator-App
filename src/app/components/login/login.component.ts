import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../service/login/login.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {    
      this.user = null;      
  }

  isValid(): boolean {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      return true;
    }
    return false;
  }

  login() {
    this.doLogin();
    setTimeout(() => {
      if (this.user != null) {
        this.snackBar.open('Successed log in', 'x', {
          panelClass: 'custom-css-class-success',
          duration: 5000,
        });
        this.loginService.setUser(this.user);
        this.dialogRef.close();
      } else {
        this.snackBar.open('Incorrect email or password', 'x', {
          panelClass: 'custom-css-class-error',
          duration: 5000,
        });
      }
    },
      200);
  }

  doLogin(): void {
    this.loginService.doLogin(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe(
        (data) => {
          this.user = data;
          this.loginService.setUser(this.user);
        },
        (error) => {
          this.snackBar.open(error.status + ' error :(', 'x', {
            panelClass: 'custom-css-class-error',
            duration: 5000,
          });
        }
      );

  }
  close() {
    this.dialogRef.close();
  }

  onClickSignUp() {
    setTimeout(() => {
      this.close();
    },
      200);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(RegistrationComponent, dialogConfig);
  }

}