import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RaInputComponent } from '@rapidocs/rapidocs-lib-components';

@Component({
    selector: 'sign',
    templateUrl: 'sign.page.html',
    styleUrl: 'sign.page.scss',
    imports: [ReactiveFormsModule, RaInputComponent],
})
export class SignPage implements OnInit {
    public formGroup: FormGroup;

    ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }
}
