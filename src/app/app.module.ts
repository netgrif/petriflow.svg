import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationModule, MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {JoyrideModule} from 'ngx-joyride';
import {TaskContentComponentModule} from '@netgrif/components';
import {ExportService, ImportService} from '@netgrif/petriflow';
import {PetriflowCanvasModule} from '../../projects/petriflow-canvas/src/lib/petriflow-canvas.module';

const appRoutes: Routes = [
    {path: 'app', component: AppComponent},
    {path: '**', redirectTo: 'app'}
];

@NgModule({
    declarations: [
        AppComponent,
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
    providers: [
        ImportService,
        ExportService,
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
}
