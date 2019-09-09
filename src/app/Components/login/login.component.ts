import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LoginService } from '../../services/Login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errMsg: '';
  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['',
        [Validators.required]
      ],
      password: ['',
      [Validators.required]
    ],
    });
  }
  validateAllFormFields(formGroup: FormGroup) {         // {1}
    Object.keys(formGroup.controls).forEach(field => {  // {2}
      const control = formGroup.get(field);             // {3}
      if (control instanceof FormControl) {             // {4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        // {5}
        this.validateAllFormFields(control);            // {6}
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = new FormData();
      formData.append('username', 'superadmin@jobprogress.com');
      formData.append('password', 'dummy123');
      formData.append('client_secret', 'XraqRySfIhUTuvdfz7ATuJxXYf8aX5MY');
      formData.append('grant_type', 'password');
      formData.append('client_id', '12345');
      console.log('form submitted');
      this.loginService.login(formData)
      .subscribe(
        data => console.log('succes!', data),
        error => this.errMsg = error.statusText
      );
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

}
