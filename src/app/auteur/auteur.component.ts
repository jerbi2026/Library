import { auteur } from 'src/auteur';
import { Component, OnInit } from '@angular/core';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreServiceService } from '../livre-service.service';
import { AuteurService } from '../auteur.service';
import { livre } from 'src/livre';
import { quote } from 'src/quotes';
import { abonne_connected } from '../abonne_connected';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.css']
})
export class AuteurComponent implements OnInit{
  constructor(private PasswordsService : PasswordsService, private route: ActivatedRoute, private router : Router,private LivreServiceService: LivreServiceService,private AuteurService:AuteurService) {}
  livres:livre[]=[];
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
  quotes:quote[]=[];
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
            const encodedid = params['id_auteur'];
            const hashedid = decodeURIComponent(encodedid);
            this.auteur.id_auteur = parseInt(this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key));
            this.AuteurService.get_auteur_id(this.auteur.id_auteur).subscribe((data)=>{
              if(data){
                this.auteur = data;
                this.LivreServiceService.get_livre_id_auteur(this.auteur.id_auteur).subscribe((data)=>{
                  if(data){
                    this.livres = data;
                  }
                }
                );
                this.LivreServiceService.get_quotes_auteur_id(this.auteur.id_auteur).subscribe(
                  (data)=>{
                    this.quotes = data;
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
    
    this.router.navigate(['/login']);
    this.PasswordsService.close_loader();
  }
    

  }

  open_quote(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/quote/'+encoded_id+'/'+encoded_mail]);

  }

  open_livre(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_user.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);


    this.router.navigate(['/livre/'+encoded_id+'/'+encoded_mail]);

  }



}
