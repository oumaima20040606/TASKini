import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { initializeKeycloak } from './app/keycloak-init';

initializeKeycloak().then(() => {
  bootstrapApplication(App, appConfig).catch(err => console.error(err));
});
