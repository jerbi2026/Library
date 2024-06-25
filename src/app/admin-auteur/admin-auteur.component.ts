import { Component, OnInit } from '@angular/core';
import { AuteurService } from '../auteur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsService } from '../passwords.service';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-auteur',
  templateUrl: './admin-auteur.component.html',
  styleUrls: ['./admin-auteur.component.css']
})
export class AdminAuteurComponent implements OnInit{
  constructor(private AuteurService:AuteurService,private route: ActivatedRoute,private PasswordsService:PasswordsService,private router:Router){}
  
  title='';
  message='';
  
  auteur={
    id_auteur: 0,
    nom: '',
    prenom: '',
    nationalite: '',
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
            this.get_auteur();
            this.PasswordsService.close_loader();
          }
        }
        );});
        this.PasswordsService.close_loader();
      
     
  
    }
    else{
  
      this.router.navigate(['/page-bloquee']);
    }
    
  }

  get_auteur(){
    this.route.params.subscribe(params => {
      const encodedid = params['id_auteur'];
      const hashedid = decodeURIComponent(encodedid);
      this.auteur.id_auteur = parseInt(this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key));
      this.AuteurService.get_auteur_id(this.auteur.id_auteur).subscribe(
        (data)=>{
          this.auteur = data;
        }
      )
      });
  }
  close_dialog(){
    let dialog=document.getElementById('dialog_message_auteur');
    if(dialog){
      dialog.style.display='none';
    }
  }
  open_dialog_ask(){
    let dialog=document.getElementById('dialog_ask');
    if(dialog){
      dialog.style.display='block';
    }
  }

  close_dialog_ask(){
    let dialog=document.getElementById('dialog_ask');
    if(dialog){
      dialog.style.display='none';
    }
  }

  reset(){
    this.ngOnInit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
   
  
    if (file) {
      let dialog=document.getElementById('dialog_message_auteur');
      this.PasswordsService.open_loader();
      this.PasswordsService.uploadImage(file).subscribe(
        (response: any) => {
          this.auteur.image = response.data.display_url;
          if(dialog){
            this.title='Image uploaded successfully✅';
            this.message='Your image has been uploaded successfully';
            dialog.style.display='block';
          }
          this.PasswordsService.close_loader();
          
          
        },
        (error) => {
          if(dialog){
            this.title='Error uploading image⛔';
            this.message='Your image has not been uploaded';
            dialog.style.display='block';
          }
          this.PasswordsService.close_loader();
          
        }
      );
    }
  }

  submit_changes(){
    if(this.auteur.image!='' && this.auteur.nom!='' && this.auteur.prenom!='' && this.auteur.nationalite!=''){
      this.PasswordsService.open_loader();
      this.AuteurService.update_auteur(this.auteur).subscribe(
        (data)=>{
          this.title='Changes saved successfully✅';
          this.message='Your changes have been saved successfully';
          let dialog=document.getElementById('dialog_message_auteur');
          if(dialog){
            dialog.style.display='block';
          }
          this.PasswordsService.close_loader();
        }
      )
    }
    else{
      this.title='Error❌👇';
      this.message='Please fill all the fields';
      let dialog=document.getElementById('dialog_message_auteur');
      if(dialog){
        dialog.style.display='block';
      }
      this.PasswordsService.close_loader();
    }
  }
  open_auteurs(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/admin_auteurs/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }


  delete_auteur(){
    let dialog_ask = document.getElementById('dialog_ask');
    if(dialog_ask){
      dialog_ask.style.display='none';
    }
    this.PasswordsService.open_loader();
    this.AuteurService.delete_auteur(this.auteur).subscribe(
      (data)=>{
        this.PasswordsService.close_loader();
          setTimeout(() => {
            this.title='Success✅👇';
            this.message='Your book has been deleted successfully';
            let dialog = document.getElementById('dialog_message_auteur');
            if(dialog){
              dialog.style.display='block';
            }
              
          }, 3000);
        
        this.open_auteurs();
      }
    );
    this.PasswordsService.close_loader();
    
  }

  


}
