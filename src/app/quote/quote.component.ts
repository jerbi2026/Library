import { AuteurService } from './../auteur.service';
import { auteur } from './../../auteur';
import { livre } from 'src/livre';
import { quote } from './../../quotes';
import { Component } from '@angular/core';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreServiceService } from '../livre-service.service';
import { abonne_connected } from '../abonne_connected';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent {
  constructor(private PasswordsService : PasswordsService, private route: ActivatedRoute, private router : Router,private LivreServiceService: LivreServiceService,private AuteurService:AuteurService) {}
  quote:quote={
    id_quote: 0,
    quote: '',
    id_auteur: 0,
    id_livre: 0
  }
  livre:livre={
    id_livre: 0,
    titre: '',
    id_auteur: 0,
    genre: '',
    nb_copie: 0,
    image: '',
    description: '',
    prix: 0
  }
  auteur:auteur={
    id_auteur: 0,
    nom: '',
    prenom: '',
    nationalite: '',
    image: ''
  }

  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
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
          this.PasswordsService.close_loader();
          this.connected_user = data;
          this.route.params.subscribe(params => {
            const encodedid = params['id_quote'];
            const hashedid = decodeURIComponent(encodedid);
            this.quote.id_quote = parseInt(this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key));
            this.LivreServiceService.get_quote_id(this.quote.id_quote).subscribe((data)=>{
              if(data){
                this.quote = data;
                this.LivreServiceService.get_livre_id(this.quote.id_livre).subscribe((data)=>{
                  if(data){
                    this.livre = data;
                    this.AuteurService.get_auteur_id(this.livre.id_auteur).subscribe((data)=>{
                      if(data){
                        this.auteur = data;
                      }
                    }
                    );
                  }
                });
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

  

  open_livre(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);


    this.router.navigate(['/livre/'+encoded_id+'/'+encoded_mail]);

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
}
