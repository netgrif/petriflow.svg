import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {
    AuthenticationModule,
    ConfigurationService,
    MaterialModule,
    TranslateLibModule
} from '@netgrif/application-engine';
import {JoyrideModule} from 'ngx-joyride';
import {TaskContentComponentModule} from '@netgrif/components';
import {ExportService, ImportService} from '@netgrif/petriflow';
import {PetriflowCanvasModule} from '../../projects/petriflow-canvas/src/lib/petriflow-canvas.module';
import {MatIconRegistry} from '@angular/material/icon';
import {AppBuilderConfigurationService} from './app-builder-configuration.service';
import { PetriflowInfoDialogComponent } from './petriflow-info-dialog/petriflow-info-dialog.component';

const appRoutes: Routes = [
    {path: 'app', component: AppComponent},
    {path: '**', redirectTo: 'app'}
];

@NgModule({
    declarations: [
        AppComponent,
        PetriflowInfoDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        TranslateLibModule,
        AuthenticationModule,
        RouterModule.forRoot(appRoutes),
        JoyrideModule.forRoot(),
        TaskContentComponentModule,
        PetriflowCanvasModule,
        MaterialModule
    ],
    entryComponents: [PetriflowInfoDialogComponent],
    providers: [
        ImportService,
        ExportService,
        {provide: ConfigurationService, useClass: AppBuilderConfigurationService},
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIcon('data', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/data.svg`));
        matIconRegistry.addSvgIcon('cursor-default-outline', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/cursor-default-outline.svg`));
        matIconRegistry.addSvgIcon('transition', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/transition.svg`));
        matIconRegistry.addSvgIcon('place', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/place.svg`));
        matIconRegistry.addSvgIcon('marking', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/marking.svg`));
        matIconRegistry.addSvgIcon('arc', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/arc.svg`));
        matIconRegistry.addSvgIcon('arcweight', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/arcweight.svg`));
        matIconRegistry.addSvgIcon('arcdataref', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/arcdataref.svg`));
        matIconRegistry.addSvgIcon('arcplaceref', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/arcplaceref.svg`));
        matIconRegistry.addSvgIcon('resetarc', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/resetarc.svg`));
        matIconRegistry.addSvgIcon('inhibitor', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/inhibitor.svg`));
        matIconRegistry.addSvgIcon('read', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/read.svg`));
        matIconRegistry.addSvgIcon('properties', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/modeler/icons/properties.svg`));
        matIconRegistry.addSvgIcon('github', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/github.svg`));
        matIconRegistry.addSvgIcon('netgrif_logo', domSanitizer.bypassSecurityTrustResourceUrl(`../assets/netgrif_logo.svg`));
    }
}
