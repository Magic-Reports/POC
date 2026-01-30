import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { SignPage } from './app/modules/auth/pages/sign/sign.page';

bootstrapApplication(SignPage, appConfig).catch(err => console.error(err));
