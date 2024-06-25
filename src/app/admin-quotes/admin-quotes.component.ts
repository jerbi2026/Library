import { AuteurService } from './../auteur.service';
import { auteur } from 'src/auteur';
import { LivreServiceService } from './../livre-service.service';
import { Component, OnInit } from '@angular/core';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Router } from '@angular/router';
import { quote } from 'src/quotes';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-quotes',
  templateUrl: './admin-quotes.component.html',
  styleUrls: ['./admin-quotes.component.css']
})
export class AdminQuotesComponent implements OnInit {
  
  
  
 quotes:quote[]=[];
 connected_manager:Front_Manager={
  id_manager: 0,
  nom: '',
  prenom: '',
  adresse_mail: '',
  adresse: '',
  image: '',
  numero: ''
}
  quote:quote={
    id_quote: 0,
    quote: '',
    id_auteur: 0,
    id_livre: 0
  }
  title='';
  message='';

  livre_titre='';
  auteur_nom='';

  livres:string[]=[];
  authors:string[]=[];


 
  constructor(private PasswordsService:PasswordsService,private router:Router, private LivreServiceService:LivreServiceService,private route:ActivatedRoute,private AuteurService:AuteurService){}
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
            this.get_quotes();
            this.get_titre_livres();
            this.get_auteurs_titres();
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

  get_quotes(){
    this.LivreServiceService.get_all_quotes().subscribe(
      (data)=>{
        this.quotes=data;
      }
    )
  }

  open_dialog_delete(item:quote){
    this.quote = item;
    let dialog = document.getElementById('dialog_delete');
    if(dialog){
      dialog.style.display='block';
    }
  }

  close_dialog_delete(){
    let dialog = document.getElementById('dialog_delete');
    if(dialog){
      dialog.style.display='none';
    }
  }

  close_dialog_message(){
    let dialog = document.getElementById('message_dialog');
    if(dialog){
      dialog.style.display='none';
    }
  }

  
  

  delete_quote(){
    let dialog = document.getElementById('message_dialog');
    this.close_dialog_delete();
    this.PasswordsService.open_loader();
    this.LivreServiceService.delete_quote(this.quote).subscribe(
      (data)=>{
        this.ngOnInit();
        this.title='Suppression✅';
        this.message='Quote supprimé avec succés🫰';
        if(dialog){
          dialog.style.display='block';
        }
        this.PasswordsService.close_loader();

      },
      (error)=>{
        this.title='Erreur❌';
        this.message='Quote non supprimé';
        if(dialog){
          dialog.style.display='block';
        }
        this.PasswordsService.close_loader();

      }
    )
  }

  close_dialog_form(){
    this.quote={
      id_quote: 0,
      quote: '',
      id_auteur: 0,
      id_livre: 0
    }
    let dialog = document.getElementById('dialog_form');
    if(dialog){
      dialog.style.display='none';
    }
  }

  get_titre_livres(){
    this.LivreServiceService.get_titres_livres().subscribe(
      (data)=>{
        this.livres=data;

      },
      error=>{
        this.livres=[];
        let dialog = document.getElementById('message_dialog');
        this.title='Erreur❌';
        this.message='Erreur lors de la récupération des titres de livre';
        if(dialog){
          dialog.style.display='block';
        }

      }
    )
  }

  get_auteurs_titres(){
    this.AuteurService.get_liste_auteurs_nom_prenom().subscribe(
      (data)=>{
        this.authors=data;

      },
      error=>{
        this.livres=[];
        let dialog = document.getElementById('message_dialog');
        this.title='Erreur❌';
        this.message='Erreur lors de la récupération des noms des auteurs';
        if(dialog){
          dialog.style.display='block';
        }
        
      }
    )
  }

  add_quote(){
    if(this.quote.quote && this.livre_titre && this.auteur_nom){
      this.PasswordsService.open_loader();
      this.LivreServiceService.get_livres_titre(this.livre_titre).subscribe(
        (data)=>{
          this.quote.id_livre = data[0].id_livre;
          this.AuteurService.retourner_id_auteur(this.auteur_nom).subscribe(
            (data)=>{
              this.PasswordsService.close_loader();
              this.quote.id_auteur = data;
              this.LivreServiceService.add_quote(this.quote).subscribe(
                (data)=>{
                  this.ngOnInit();
                  this.close_dialog_form();
                  this.title='Ajout✅';
                  this.message='Quote ajouté avec succés🫰';
                  let dialog = document.getElementById('message_dialog');
                  if(dialog){
                    dialog.style.display='block';
                  }
                },
                error=>{
                  this.title='Erreur❌';
                  this.message='Quote non ajouté';
                  let dialog = document.getElementById('message_dialog');
                  if(dialog){
                    dialog.style.display='block';
                  }
                }
              )
            },
            error=>{
              this.PasswordsService.close_loader();
              this.title='Erreur❌';
              this.message='Auteur non trouvé';
              let dialog = document.getElementById('message_dialog');
              if(dialog){
                dialog.style.display='block';
              }
            }
          )
        },
        error=>{
          this.PasswordsService.close_loader();
          this.title='Erreur❌';
          this.message='Livre non trouvé';
          let dialog = document.getElementById('message_dialog');
          if(dialog){
            dialog.style.display='block';
          }
        }
      )
    }
  }

  oen_dialog_form(){
    let dialog = document.getElementById('dialog_form');
    if(dialog){
      dialog.style.display='block';
    }
  }

  open_quote(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_manager.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);
    this.router.navigate(['/quote_admin/'+encoded_id+'/'+encoded_mail]);

  }

  


}
