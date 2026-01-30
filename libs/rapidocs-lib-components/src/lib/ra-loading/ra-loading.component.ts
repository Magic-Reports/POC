
import { Component, input } from '@angular/core';

@Component({
    selector: 'ra-loading',
    imports: [],
    templateUrl: './ra-loading.component.html',
    styleUrl: './ra-loading.component.scss',
})
export class RaLoadingComponent {
    public size = input<'small' | 'medium' | 'large'>('medium');
    public message = input<string>('');
    public marginTop = input<number>(0);
}
