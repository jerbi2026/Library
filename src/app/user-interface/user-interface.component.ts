import { ReservationService } from './../reservation.service';
import { PasswordsService } from './../passwords.service';
import { AuteurService } from './../auteur.service';
import { LivreServiceService } from './../livre-service.service';
import { livre } from './../../livre';
import { Component, OnInit } from '@angular/core';
import { auteur } from 'src/auteur';
import { find_auteur } from 'src/find_auteur';
import { quote } from 'src/quotes';
import { ActivatedRoute, Router } from '@angular/router';
import { abonne_connected } from '../abonne_connected';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit{

  constructor(private service_livre:LivreServiceService,private route: ActivatedRoute,private AuteurService:AuteurService,private router:Router, private PasswordsService:PasswordsService,private ReservationService:ReservationService){}
  itemsPerPage = 3;
  currentPage = 1;
  nb_favourites_book=0;
  currentPage_auteur = 1;  
  titre='';
  name_auteur='';
  genre='';
  auteurs:auteur[]=[];
  livres:livre[] = [];
  genres:string[] = [];
  quotes:quote[] = [];
  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }
  title='';
  message='';
  nb_reservation=0;
  

  get_nb_book(){
    const userId = this.connected_user.adresse_mail;
    let favorites: { [userId: string]: livre[] } = JSON.parse(localStorage.getItem('favorites') || '{}');
    this.livres = Object.values(favorites[userId] || {});
    this.nb_favourites_book=this.livres.length;
  
          
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
          this.get_livres();
          this.get_auteurs();
          this.get_genres();
          this.get_quotes();
          this.get_nb_book();
          this.ReservationService.get_nb_reservations_abonne(this.connected_user.id_abonné).subscribe((data)=>{
            this.nb_reservation = data;
          });
          this.PasswordsService.close_loader();
        }
      }
      );});
      this.PasswordsService.close_loader();
    
   

  }
  else{

    this.router.navigate(['/login']);
  }
  
   
  }

  get_auteurs(){
    this.AuteurService.get_auteurs().subscribe((data:auteur[])=>{
      this.auteurs = data;
    });
  }
 
  get_livres(){
    this.service_livre.get_livres().subscribe((data:livre[])=>{
      this.livres = data;
    });
  }
  find_livre(){
    if(this.titre != ''){
      this.service_livre.get_livres_titre(this.titre).subscribe(
        (data:livre[])=>{
        this.livres = data;
      });
    }
    else{
      this.get_livres();
    }
   
    
  

  }

  AddToFavorites(livre:livre) {
    const userId = this.connected_user.adresse_mail;
    let favorites: { [userId: string]: livre[] } = JSON.parse(localStorage.getItem('favorites') || '{}');
  
    if (!favorites[userId]) {
      favorites[userId] = []; 
    }
  
    const existingIndex = favorites[userId].findIndex(favorite => favorite.id_livre === livre.id_livre);
    let dialog = document.getElementById("dialog");
    if (existingIndex === -1) {
      favorites[userId].push(livre);
  
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
    this.ngOnInit();
}

  find_auteur_name(){
    if(this.name_auteur != ''){
      
      var nameParts = this.name_auteur.split(" ");
      var find_req: find_auteur = {
        nom: nameParts[0],
        prenom: nameParts.slice(1).join(" ")
    };
      this.AuteurService.get_auteur_name(find_req).subscribe(
        (data:auteur[])=>{
        this.auteurs = data;
      });
    }
    else{
      this.get_auteurs();
    }
   
  }

  get_genres(){
    this.service_livre.get_genres().subscribe((data:string[])=>{
      this.genres = data;
    });
  }

  find_genre(){
    if (this.genre !== '') {
      this.genres = this.genres.filter(genre => genre.toLowerCase().includes(this.genre.toLowerCase()));
      if(this.genres.length === 0){
        this.get_genres();
      }
    } else {
      this.get_genres();
    }
  }

  get_quotes(){
    this.AuteurService.get_quotes().subscribe(
      (data:quote[])=>{
      this.quotes = data;
      this.quotes.reverse();


    });
  }

  open_livre(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);


    this.router.navigate(['/livre/'+encoded_id+'/'+encoded_mail]);

  }

  open_quote(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/quote/'+encoded_id+'/'+encoded_mail]);

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

  open_favourites(){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
    
      this.router.navigate(['/favourites/'+encodedid]);
      
    });
  }

 

  close_dialog(){
    let dialog = document.getElementById("dialog");
    if(dialog){
      dialog.style.display="none";
    }
  }
  open_reservations(){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
    
      this.router.navigate(['/reservations/'+encodedid]);
      
    });
  }
}
