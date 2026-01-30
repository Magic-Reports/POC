import {
    Component,
    forwardRef,
    inject,
    Input,
    input,
    OnInit,
    output,
} from '@angular/core';
import {
    ControlContainer,
    ControlValueAccessor,
    FormControl,
    FormsModule,
    NG_VALUE_ACCESSOR,
    Validators,
} from '@angular/forms';
import { RaLoadingComponent } from '../ra-loading/ra-loading.component';

@Component({
    imports: [FormsModule, RaLoadingComponent],
    selector: 'ra-input',
    templateUrl: './ra-input.component.html',
    styleUrl: './ra-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RaInputComponent),
            multi: true,
        },
    ],
})
export class RaInputComponent implements ControlValueAccessor, OnInit {
    @Input() disabled: boolean = false;
    public showRequiredOrOptional = input<boolean>(true);
    public formControlName = input<string>('');
    public formControl = input<FormControl | null>(null);
    public id = input<string>('');
    public loading = input<boolean>(false);
    public label = input<string>('');
    public placeholder = input<string>('');
    public type = input<string>('text');
    public leftIcon = input<string>('');
    public rightIcon = input<string>('');
    public rightIconClick = output<void>();
    public enterKeyPress = output<void>();

    public value: any = '';
    public onChange: any = () => {};
    public onTouched: any = () => {};
    public control: FormControl | null = null;
    private controlContainer = inject(ControlContainer, { optional: true }); // ✅ OPCIONAL

    ngOnInit() {
        // ✅ FLEXÍVEL: aceita FormControl direto OU formControlName
        const formControl = this.formControl();
        if (formControl) {
            this.control = formControl;
            // Sincroniza o valor inicial do FormControl
            if (formControl.value !== null && formControl.value !== undefined) {
                this.value = formControl.value;
            }
            // Inscreve para mudanças no FormControl
            formControl.valueChanges.subscribe(value => (this.value = value));
        } else if (this.formControlName() !== '') {
            const container = this.controlContainer;
            if (!container) {
                throw new Error(
                    'formControlName requires a parent FormGroup. Use formControl instead.'
                );
            }
            const control = container.control?.get(
                this.formControlName()
            ) as FormControl | undefined;
            this.control = control ?? null;
            // Sincroniza o valor inicial do FormControl
            if (this.control && this.control.value != null) {
                this.value = this.control.value;
            }
            // Inscreve para mudanças no FormControl
            if (this.control) {
                this.control.valueChanges.subscribe(value => (this.value = value));
            }
        } else {
            throw new Error(
                'RaInputComponent must be used with either formControl or formControlName'
            );
        }
    }

    public writeValue = (value: any) => (this.value = value);
    public registerOnChange = (fn: any) => (this.onChange = fn);
    public registerOnTouched = (fn: any) => (this.onTouched = fn);
    public setDisabledState = (isDisabled: boolean) => (this.disabled = isDisabled);
    public hasError = () => (this.control?.invalid && this.control?.touched) || false;
    public isRequired = () => this.control?.hasValidator(Validators.required) || false;

    public limitCharacters = (): number | null => {
        if (!this.control) return null;

        // Verifica se há erro maxlength e pega o requiredLength
        const maxLengthError = this.control.errors?.['maxlength'];
        if (maxLengthError?.requiredLength && maxLengthError.requiredLength >= 3) {
            return maxLengthError.requiredLength;
        }

        // Tenta detectar o maxLength testando com um valor longo
        // Se o campo tem maxLength >= 3, um valor com mais caracteres gerará erro
        const validatorFn = this.control.validator;
        if (validatorFn) {
            const testControl = new FormControl('a'.repeat(2000)); // Valor muito longo
            const errors = validatorFn(testControl);
            const detectedMaxLength = errors?.['maxlength']?.requiredLength;
            if (detectedMaxLength && detectedMaxLength >= 3) {
                return detectedMaxLength;
            }
        }

        return null;
    };

    public onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;

        // Previne números negativos quando o tipo for 'number'
        if (this.type() === 'number' && value.startsWith('-')) {
            return;
        }

        this.value = value;

        // Atualiza o FormControl diretamente se existir
        if (this.control && this.control.value !== value) {
            this.control.setValue(value, { emitEvent: true });
        }

        // Chama o onChange do ControlValueAccessor para compatibilidade
        this.onChange(value);
    }

    public onKeyPress(event: KeyboardEvent): void {
        // Previne a digitação do sinal de menos quando o tipo for 'number'
        if (this.type() === 'number' && event.key === '-') {
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter') {
            this.enterKeyPress.emit();
        }
    }
}
