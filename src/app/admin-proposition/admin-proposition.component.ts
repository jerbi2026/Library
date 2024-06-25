import { PasswordsService } from './../passwords.service';
import { proposition } from 'src/proposition';
import { Component, OnInit } from '@angular/core';
import { LivreServiceService } from '../livre-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-proposition',
  templateUrl: './admin-proposition.component.html',
  styleUrls: ['./admin-proposition.component.css']
})
export class AdminPropositionComponent implements OnInit{

  nom_livre='';
  nb_propositions=0;
  proposition:proposition={
    id_prop: 0,
    titre: '',
    genre: '',
    auteur: '',
    id_abonné: 0
  }
  title='';
  message='';
  constructor(private livreService: LivreServiceService,private PasswordsService:PasswordsService,private router:Router,private route:ActivatedRoute) {}

  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }

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
            this.get_all_proposition();
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

  close_dialog_message(){
    let dialog = document.getElementById('dialog_message');
    if(dialog){
      dialog.style.display='none';
    }
  }




  

  propositions:proposition[]=[];

  get_all_proposition(){
    this.livreService.get_all_prop().subscribe((data)=>{
      this.propositions=data;
      this.nb_propositions=this.propositions.length;
    })
  }

  find_prop(){
    if(this.nom_livre != ''){
      this.livreService.get_prop_by_titre(this.nom_livre).subscribe((data)=>{
        this.propositions=data;
        this.nb_propositions=this.propositions.length;
      },
      (error)=>{
        this.title='Erreur🔴⛔';
        this.message='Aucune proposition trouvée';
        let dialog = document.getElementById('dialog_message');
        if(dialog){
          dialog.style.display='block';
        }
      }
      )
    }
    else{
      this.get_all_proposition();
    }
  }

  open_dialog(item:proposition){
    this.proposition=item;
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='block';
    }
  }
  close_dialog(){
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
    }
    
  }

  delete_prop(){
    this.livreService.delete_prop_by_id(this.proposition.id_prop).subscribe(
      (data)=>{
      let dialog_message = document.getElementById('dialog_message');
      this.title='Proposition supprimée✅🫰👏';
      this.message='La proposition a été supprimée avec succès';
      if(dialog_message){
        dialog_message.style.display='block';
      }
      this.get_all_proposition();
      let dialog = document.getElementById('dialog');
      if(dialog){
        dialog.style.display='none';
      }
    },
    (error)=>{
      this.title='Erreur🔴⛔';
      this.message='Erreur lors de la suppression';
      let dialog = document.getElementById('dialog_message');
      if(dialog){
        dialog.style.display='block';
      }
    }
    )
  }

  view_proposition(id_prop:number){
    let hashed_id = this.PasswordsService.encryptString(id_prop.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id_prop = encodeURIComponent(hashed_id);
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
        

        this.router.navigate(['/view_proposition/' + encoded_id_prop+'/'+encodedid]);

      
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
   
  }



}
