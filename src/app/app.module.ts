import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LivreComponent } from './livre/livre.component';
import { QuoteComponent } from './quote/quote.component';
import { AuteurComponent } from './auteur/auteur.component';
import { GenreComponent } from './genre/genre.component';
import { ProposerComponent } from './proposer/proposer.component';
import { SettingsComponent } from './settings/settings.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { PageBloqueComponent } from './page-bloque/page-bloque.component';
import { AdminLivreComponent } from './admin-livre/admin-livre.component';
import { AdminAjouterLivreComponent } from './admin-ajouter-livre/admin-ajouter-livre.component';
import { AdminLivresComponent } from './admin-livres/admin-livres.component';
import { AdminAuteursComponent } from './admin-auteurs/admin-auteurs.component';
import { AdminAuteurComponent } from './admin-auteur/admin-auteur.component';
import { AdminAddAuteurComponent } from './admin-add-auteur/admin-add-auteur.component';
import { AdminAbonneComponent } from './admin-abonne/admin-abonne.component';
import { AddAbonneComponent } from './add-abonne/add-abonne.component';
import { AdminPropositionComponent } from './admin-proposition/admin-proposition.component';
import { AdminViewPropositionComponent } from './admin-view-proposition/admin-view-proposition.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import {WebcamModule} from 'ngx-webcam';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminCalendrierComponent } from './admin-calendrier/admin-calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminQuotesComponent } from './admin-quotes/admin-quotes.component';
import { AdminQuoteComponent } from './admin-quote/admin-quote.component';
import { AdminValidateReservationComponent } from './admin-validate-reservation/admin-validate-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    VerifEmailComponent,
    ForgetPasswordComponent,
    LoginComponent,
    SidebarComponent,
    UserInterfaceComponent,
    LivreComponent,
    QuoteComponent,
    AuteurComponent,
    GenreComponent,
    ProposerComponent,
    SettingsComponent,
    FavouritesComponent,
    NavbarComponent,
    ReservationsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    PageBloqueComponent,
    AdminLivreComponent,
    AdminAjouterLivreComponent,
    AdminLivresComponent,
    AdminAuteursComponent,
    AdminAuteurComponent,
    AdminAddAuteurComponent,
    AdminAbonneComponent,
    AddAbonneComponent,
    AdminPropositionComponent,
    AdminViewPropositionComponent,
    AdminReservationComponent,
    AdminSettingsComponent,
    HomePageComponent,
    AdminCalendrierComponent,
    AdminQuotesComponent,
    AdminQuoteComponent,
    AdminValidateReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxScannerQrcodeModule,
    WebcamModule,
    FullCalendarModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
