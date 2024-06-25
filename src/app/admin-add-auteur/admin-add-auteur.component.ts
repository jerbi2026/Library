import { AuteurService } from './../auteur.service';
import { PasswordsService } from './../passwords.service';
import { auteur } from './../../auteur';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-add-auteur',
  templateUrl: './admin-add-auteur.component.html',
  styleUrls: ['./admin-add-auteur.component.css']
})
export class AdminAddAuteurComponent implements OnInit{

  constructor(private PasswordsService : PasswordsService, private AuteurService:AuteurService,private route:ActivatedRoute,private router:Router){}
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
            this.PasswordsService.close_loader();
            
          }
        }
        );});
      
     
  
    }
    else{
  
      this.router.navigate(['/page-bloquee']);
      this.PasswordsService.close_loader();
    }
  }
  auteur:auteur={
    id_auteur: 0,
    nom: '',
    prenom: '',
    nationalite: '',
    image: 'https://res.cloudinary.com/degywbqer/image/upload/v1709828138/logo_ihec_qqymbw.jpg'
  }
  title='';
  message='';



  onFileSelected(event: any) {
    const file = event.target.files[0];
   
  
    if (file) {
      let dialog=document.getElementById('dialog');
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

  reset(){
    this.auteur.nom='';
    this.auteur.prenom='';
    this.auteur.nationalite='';
    this.auteur.image='https://res.cloudinary.com/degywbqer/image/upload/v1709828138/logo_ihec_qqymbw.jpg';

  }
  close_dialog(){
    let dialog=document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
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




  ajouter_auteur(){
    if(this.auteur.nom!='' && this.auteur.prenom!='' && this.auteur.nationalite!=''){
      this.PasswordsService.open_loader();
      this.AuteurService.addd_auteur(this.auteur).subscribe(
        (data)=>{
          this.PasswordsService.close_loader();
          setTimeout(()=>{
            let dialog=document.getElementById('dialog');
            if(dialog){
              this.title='Auteur added successfully✅';
              this.message='The author has been added successfully';
              dialog.style.display='block';
            }

          },3000)
          
         
        },
        (error)=>{
          this.PasswordsService.close_loader();
          setTimeout(()=>{
            let dialog=document.getElementById('dialog');
          if(dialog){
            this.title='Error adding author⛔';
            this.message='The author has not been added';
            dialog.style.display='block';
          }

          },3000)
         

        }

      )
    }
    else{
      this.PasswordsService.close_loader();
      setTimeout(()=>{
        let dialog=document.getElementById('dialog');
      if(dialog){
        this.title='Error adding author⛔';
        this.message='Please fill all the fields';
        dialog.style.display='block';
      }

      },3000)
     
    }
    this.open_auteurs()

  }


  


}
