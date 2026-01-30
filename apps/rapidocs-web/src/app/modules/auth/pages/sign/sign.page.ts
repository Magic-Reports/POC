import { Component } from '@angular/core';
import { UserEntity } from '@rapidocs/rapidocs-lib-domain';

@Component({
    selector: 'sign',
    templateUrl: 'sign.page.html',
    styleUrl: 'sign.page.scss',
})
export class SignPage {
    public user: UserEntity;
}
