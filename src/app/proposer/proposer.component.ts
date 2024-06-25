import { proposition } from './../../proposition';
import { Component, OnInit } from '@angular/core';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreServiceService } from '../livre-service.service';
import { AuteurService } from '../auteur.service';
import { abonne_connected } from '../abonne_connected';

@Component({
  selector: 'app-proposer',
  templateUrl: './proposer.component.html',
  styleUrls: ['./proposer.component.css']
})
export class ProposerComponent implements OnInit{
  constructor(private PasswordsService : PasswordsService, private route: ActivatedRoute, private router : Router,private LivreServiceService: LivreServiceService) {}


  genres:string[]=[];
  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }
  proposition : proposition={
    id_prop: 0,
    titre: '',
    genre: '',
    auteur: '',
    id_abonné:0
  };
  title='';
  message='';
  

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
         
        
          this.LivreServiceService.get_genres().subscribe((data)=>{
            if(data){
              this.genres = data;
            }
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

  close_dialog(){
   let dialog =document.getElementById('dialog');
   if(dialog){
      dialog.style.display='none';
   } 
  }


  submit(){
    if(this.proposition.titre!='' && this.proposition.genre!='' && this.proposition.auteur!=''){
      this.proposition.id_abonné = this.connected_user.id_abonné;
      this.PasswordsService.open_loader();
      this.LivreServiceService.add_proposition(this.proposition).subscribe((data)=>{
        this.title='Proposition envoyée✅🫰👏';
        this.message='Votre proposition a été envoyée avec succès';
        this.proposition={
          id_prop: 0,
          titre: '',
          genre: '',
          auteur: '',
          id_abonné: 0
        };
        this.PasswordsService.close_loader();
        let dialog =document.getElementById('dialog');
        if(dialog){
            dialog.style.display='block';
        }
      });
    }else{
      this.title='Erreur🔴⛔🧱';
      this.message='Veuillez remplir tous les champs';
      let dialog =document.getElementById('dialog');
      this.PasswordsService.close_loader();
      if(dialog){
          dialog.style.display='block';
      }
    }
  }
}
