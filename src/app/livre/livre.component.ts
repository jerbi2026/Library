import { reservation } from './../../reservation';
import { livre } from './../../livre';
import { AuteurService } from './../auteur.service';
import { auteur } from './../../auteur';
import { LivreServiceService } from './../livre-service.service';
import { Component, OnInit } from '@angular/core';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { quote } from 'src/quotes';
import { abonne_connected } from '../abonne_connected';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  constructor(private PasswordsService : PasswordsService, private route: ActivatedRoute, private router : Router,private LivreServiceService: LivreServiceService,private AuteurService:AuteurService,private ReservationService:ReservationService) {}
  title='';
  message='';
  id_livre=0;
  livre:livre = {
    id_livre: 0,
    titre: '',
    id_auteur: 0,
    genre: '',
    nb_copie: 0,
    image: '',
    description: '',
    prix: 0
  }
  quote:quote[]=[];

  auteur:auteur = {
    id_auteur: 0,
    nom: '',
    prenom: '',
    nationalite: '',
    image: ''
  };

  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }
  reservation:reservation={
    id_res: 0,
    id_livre: 0,
    id_abonné: 0,
    date_res: new Date(),
    date_retour:new Date(),
    code: '',
    statut: false
  }


  
  ngOnInit(): void {
    let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
      const hashedid = decodeURIComponent(encodedid);
      this.connected_user.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
      this.PasswordsService.open_loader();
      this.PasswordsService.get_abonne_connected(this.connected_user.adresse_mail).subscribe((data)=>{
        if(data){
          this.connected_user = data;
          this.route.params.subscribe(params => {
            const encodedid = params['id_livre'];
            const hashedid = decodeURIComponent(encodedid);
            this.id_livre = parseInt(this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key));
            this.LivreServiceService.get_livre_id(this.id_livre).subscribe((data)=>{
              if(data){
                this.livre = data;
                this.LivreServiceService.get_quotes_livre_id(this.livre.id_livre).subscribe((data)=>{
                  if(data){
                    this.quote = data;
                  }
                }
                );
                this.AuteurService.get_auteur_id(this.livre.id_auteur).subscribe(
                  (data)=>{
                    this.auteur = data;
                  }
                );
                this.PasswordsService.close_loader();
                
                
              }
            }
            );});
            this.PasswordsService.close_loader();
         
        }
      }
      );});
      this.PasswordsService.close_loader();
    
   

  }
  else{
    this.PasswordsService.close_loader();
    this.router.navigate(['/login']);
  }
  
    

  }
  AddToFavorites() {
    const userId = this.connected_user.adresse_mail;
    let favorites: { [userId: string]: livre[] } = JSON.parse(localStorage.getItem('favorites') || '{}');
  
    if (!favorites[userId]) {
      favorites[userId] = []; 
    }
  
    const existingIndex = favorites[userId].findIndex(favorite => favorite.id_livre === this.livre.id_livre);
    let dialog = document.getElementById("dialog");
    if (existingIndex === -1) {
      favorites[userId].push(this.livre);
  
      localStorage.setItem('favorites', JSON.stringify(favorites));
  
      if (dialog) {
        this.title = 'Succès✅🫰';
        this.message = 'Livre ajouté aux Favoris avec succès';
        dialog.style.display = "block";
      }
    } else {
      favorites[userId].splice(existingIndex, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
  
      if (dialog) {
        this.title = 'Operation done✅🫰';
        this.message = 'Le livre est supprimé des favoris !';
        dialog.style.display = "block";
      }
    }
}

  
  open_quote(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/quote/'+encoded_id+'/'+encoded_mail]);

  }


  close_dialog(){
    let dialog = document.getElementById("dialog");
    if(dialog){
      dialog.style.display="none";
    }
  }

  open_auteur(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/auteur/'+encoded_id+'/'+encoded_mail]);

  }

  open_genre(genre:string){
    let hashed_id = this.PasswordsService.encryptString(genre.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/genre/'+encoded_id+'/'+encoded_mail]);

  }

  add_reservation(){
    let dialog_form = document.getElementById("dialog_form");
    if(dialog_form){
      dialog_form.style.display="block";
    }
  }
  close_dialog_form(){
    let dialog_form = document.getElementById("dialog_form");
    if(dialog_form){
      dialog_form.style.display="none";
    }
  }

  confirm_reservation(){
    let dialog_form = document.getElementById("dialog_form");
      if(dialog_form){
        dialog_form.style.display="none";
      }
    if(this.reservation.date_res && this.reservation.date_retour && this.reservation.date_res < this.reservation.date_retour){
      this.reservation.id_abonné = this.connected_user.id_abonné;
      this.reservation.id_livre = this.livre.id_livre;
      this.reservation.statut = false;
      this.reservation.code = this.PasswordsService.generateRandomString(12);
      
      this.PasswordsService.open_loader();

      this.ReservationService.add_reservation(this.reservation).subscribe((data)=>{
        let dialog = document.getElementById("dialog");
          if(dialog ){
            
            this.title = 'Succès✅🫰';
            this.message = 'Réservation ajoutée avec succès et voici votre code de réservation : '+this.reservation.code;
            dialog.style.display = "block";
          }
          this.PasswordsService.close_loader();
        
      },
      (error)=>{
        let dialog = document.getElementById("dialog");
        if(dialog){
          this.title = 'Erreur❌🫰';
          this.message = 'Réservation non ajoutée';
          dialog.style.display = "block";
        }
        this.PasswordsService.close_loader();
      }
      );
    }
    else{
      let dialog = document.getElementById("dialog");
      if(dialog){
        this.title = 'Erreur❌🫰';
        this.message = 'Veuillez vérifier les dates saisies';
        dialog.style.display = "block";
      }
      this.PasswordsService.close_loader();
    }

  }



}
