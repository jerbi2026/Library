import { LivreServiceService } from './../livre-service.service';
import { AuteurService } from './../auteur.service';
import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';
import { auteur } from 'src/auteur';
import { livre } from 'src/livre';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-ajouter-livre',
  templateUrl: './admin-ajouter-livre.component.html',
  styleUrls: ['./admin-ajouter-livre.component.css']
})
export class AdminAjouterLivreComponent implements OnInit{

  constructor(private PasswordsService:PasswordsService,private AuteurService:AuteurService,private LivreServiceService:LivreServiceService,private route:ActivatedRoute,private router:Router){}
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
        const encodedid = params['id_user'];
        const hashedid = decodeURIComponent(encodedid);
        this.connected_manager.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
        this.PasswordsService.open_loader();
        this.PasswordsService.get_front_manager(this.connected_manager.adresse_mail).subscribe((data)=>{
          if(data){
            this.connected_manager = data;
            this.get_auteurs_name();
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

  auteur_name='';
  livre:livre={
    id_livre: 0,
    titre: '',
    id_auteur: 0,
    genre: '',
    nb_copie: 0,
    image: 'https://res.cloudinary.com/degywbqer/image/upload/v1709828138/logo_ihec_qqymbw.jpg',
    description: '',
    prix: 0
  }
  
  title='';
  message='';

  auteurs:string[]=[];

  onFileSelected(event: any) {
    const file = event.target.files[0];
   
  
    if (file) {
      let dialog=document.getElementById('dialog');
      this.PasswordsService.open_loader();
      this.PasswordsService.uploadImage(file).subscribe(
        (response: any) => {
          this.livre.image = response.data.display_url;
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

  close_dialog(){
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
    }
  }


  reset(){
    this.ngOnInit();
  }
  get_auteurs_name(){
    this.AuteurService.get_liste_auteurs_nom_prenom().subscribe(
      (data)=>{
        this.auteurs=data;
      }
    )
  }

  submit_changes(){
    if(this.livre.titre && this.livre.genre && this.livre.nb_copie && this.livre.description && this.livre.prix){
      this.PasswordsService.open_loader();
      this.AuteurService.retourner_id_auteur(this.auteur_name).subscribe(
        (data)=>{
          this.livre.id_auteur = data;
          this.LivreServiceService.add_livre(this.livre).subscribe(
            (data)=>{
              this.title='Success✅👇';
              this.message='Your book has been added successfully';
              let dialog = document.getElementById('dialog');
              if(dialog){
                dialog.style.display='block';
              }
              this.PasswordsService.close_loader();
              this.ngOnInit();
            }
          );
        }
      );
    }
    else{
      this.title='Error❌👇';
      this.message='Please fill all the fields';
      let dialog = document.getElementById('dialog');
      if(dialog){
        dialog.style.display='block';
      }
      this.PasswordsService.close_loader();
    
    }


  }




}
