import { AuteurService } from './../auteur.service';
import { auteur } from './../../auteur';
import { livre } from 'src/livre';
import { quote } from './../../quotes';
import { Component } from '@angular/core';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreServiceService } from '../livre-service.service';
import { abonne_connected } from '../abonne_connected';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-quote',
  templateUrl: './admin-quote.component.html',
  styleUrls: ['./admin-quote.component.css']
})
export class AdminQuoteComponent {
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
  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }
  nb_reservation=0;
  nb_reservation_valide=0;
  nb_reservation_non_valide=0;
  ngOnInit(): void {
   let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
        const hashedid = decodeURIComponent(encodedid);
        this.connected_manager.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
        this.PasswordsService.open_loader();
        this.PasswordsService.get_front_manager(this.connected_manager.adresse_mail).subscribe((data)=>{
          if(data){
            this.connected_manager = data;
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
  
      this.router.navigate(['/page-bloquee']);
      this.PasswordsService.close_loader();
    }

   
    
  }


  /*ngOnInit(): void {
    let verify_user= localStorage.getItem('connected_user');
  if(verify_user === 'true'){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
      const hashedid = decodeURIComponent(encodedid);
      this.connected_user.id_abonné = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
      this.PasswordsService.get_abonne_connected(this.connected_user.adresse_mail).subscribe((data)=>{
        if(data){
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
        }
      }
      );});
    
   

  }
  else{
    
    this.router.navigate(['/login']);
  }
  
    

  }*/

  


}
