import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
    
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetector: PlatformDetectorService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        })

        this.platformDetector.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus()

    }

    login() {
        const userName = this.loginForm.get('userName').value
        const password = this.loginForm.get('password').value

        this.authService.authenticate(userName, password).subscribe(
            () => this.router.navigate(['user', userName]),
            err => {
                console.log(err)
                this.loginForm.reset()
                this.platformDetector.isPlatformBrowser() &&
                    this.userNameInput.nativeElement.focus()
                alert('User or password is invalid!')
            }
        )

    }
}