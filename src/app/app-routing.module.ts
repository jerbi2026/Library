import { AdminQuoteComponent } from './admin-quote/admin-quote.component';
import { AddAbonneComponent } from './add-abonne/add-abonne.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { LoginComponent } from './login/login.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { LivreComponent } from './livre/livre.component';
import { QuoteComponent } from './quote/quote.component';
import { AuteurComponent } from './auteur/auteur.component';
import { GenreComponent } from './genre/genre.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProposerComponent } from './proposer/proposer.component';
import { SettingsComponent } from './settings/settings.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PageBloqueComponent } from './page-bloque/page-bloque.component';
import { AdminLivreComponent } from './admin-livre/admin-livre.component';
import { AdminAjouterLivreComponent } from './admin-ajouter-livre/admin-ajouter-livre.component';
import { AdminLivresComponent } from './admin-livres/admin-livres.component';
import { AdminAuteursComponent } from './admin-auteurs/admin-auteurs.component';
import { AdminAuteurComponent } from './admin-auteur/admin-auteur.component';
import { AdminAddAuteurComponent } from './admin-add-auteur/admin-add-auteur.component';
import { AdminAbonneComponent } from './admin-abonne/admin-abonne.component';
import { AdminPropositionComponent } from './admin-proposition/admin-proposition.component';
import { AdminViewPropositionComponent } from './admin-view-proposition/admin-view-proposition.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminCalendrierComponent } from './admin-calendrier/admin-calendrier.component';
import { AdminQuotesComponent } from './admin-quotes/admin-quotes.component';
import { AdminValidateReservationComponent } from './admin-validate-reservation/admin-validate-reservation.component';

const routes: Routes = [
  {path:'reset_password/:email',component:ForgetPasswordComponent},
  {path:'verif_email',component:VerifEmailComponent},
  {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'interface_user/:id',component:UserInterfaceComponent},
  {path:'livre/:id_livre/:id',component:LivreComponent},
  {path:'quote/:id_quote/:id',component:QuoteComponent},
  {path:'auteur/:id_auteur/:id',component:AuteurComponent},
  {path:'genre/:genre/:id',component:GenreComponent},
  {path:'favourites/:id',component:FavouritesComponent},
  {path:'proposition/:id',component:ProposerComponent},
  {path:'settings/:id',component:SettingsComponent},
  {path:'reservations/:id',component:ReservationsComponent},
  {path:'admin_login',component:AdminLoginComponent},
  {path:'admin_dashboard/:id',component:AdminDashboardComponent},
  {path:'admin_livres/:id',component:AdminLivresComponent},
  {path:'page-bloquee',component:PageBloqueComponent},
  {path:'book_details/:id_livre/:id',component:AdminLivreComponent},
  {path:'ajouter_livre/:id_user',component:AdminAjouterLivreComponent},
  {path:'admin_auteurs/:id',component:AdminAuteursComponent},
  {path:'admin_auteur/:id_auteur/:id',component:AdminAuteurComponent},
  {path:'ajouter_auteur/:id',component:AdminAddAuteurComponent},
  {path:'abonnees/:id',component:AdminAbonneComponent},
  {path:'ajouter_abonne/:id',component:AddAbonneComponent},
  {path:'get_proposition/:id',component:AdminPropositionComponent},
  {path:'view_proposition/:id_prop/:id',component:AdminViewPropositionComponent},
  {path:'get_reservation/:id',component:AdminReservationComponent},
  {path:'admin_settings/:id',component:AdminSettingsComponent},
  {path:'get_quotes/:id',component:AdminQuotesComponent},
  {path:'validate_res/manager/:id_res',component:AdminValidateReservationComponent},

  {path:'quote_admin/:id_quote/:id',component:AdminQuoteComponent},
  

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageBloqueComponent }, 
  
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
