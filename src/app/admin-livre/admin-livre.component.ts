import { PasswordsService } from './../passwords.service';
import { livre } from './../../livre';
import { AuteurService } from './../auteur.service';
import { auteur } from './../../auteur';
import { LivreServiceService } from './../livre-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-livre',
  templateUrl: './admin-livre.component.html',
  styleUrls: ['./admin-livre.component.css']
})
export class AdminLivreComponent implements OnInit{

  constructor(private LivreServiceService:LivreServiceService,private AuteurService:AuteurService,private route: ActivatedRoute,private PasswordsService:PasswordsService,private router:Router){}
  auteurs:string[]=[];
  auteur:auteur={
    id_auteur: 0,
    nom: '',
    prenom: '',
    nationalite: '',
    image: ''
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

  auteur_name='';
  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }

  title='';
  message='';
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
              const encodedid = params['id_livre'];
              const hashedid = decodeURIComponent(encodedid);
              this.livre.id_livre = parseInt(this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key));
              this.LivreServiceService.get_livre_id(this.livre.id_livre).subscribe((data)=>{
                  if(data){
                    this.livre = data;
                    this.AuteurService.get_auteur_id(this.livre.id_auteur).subscribe(
                      (data)=>{
                        this.auteur = data;
                        this.auteur_name=this.auteur.nom+' '+this.auteur.prenom;
                      }
                    );
                    
                  }
                  this.get_auteurs_name();
                }
                );});

            
          }
          this.PasswordsService.close_loader();
        }
        );});
        this.PasswordsService.close_loader();
      
     
  
    }
    else{
  
      this.router.navigate(['/page-bloquee']);
      this.PasswordsService.close_loader();
    }
  
    
  }
  
  


  get_auteurs_name(){
    this.AuteurService.get_liste_auteurs_nom_prenom().subscribe(
      (data)=>{
        this.auteurs=data;
      }
    )
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.PasswordsService.open_loader();
  
    if (file) {
      let dialog=document.getElementById('dialog');
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


  submit_changes(){
    if(this.livre.titre && this.livre.genre && this.livre.nb_copie && this.livre.description && this.livre.prix){
      this.PasswordsService.open_loader();
      this.AuteurService.retourner_id_auteur(this.auteur_name).subscribe(
        (data)=>{
          this.livre.id_auteur = data;
          this.LivreServiceService.update_livre(this.livre).subscribe(
            (data)=>{
              this.title='Success✅👇';
              this.message='Your book has been updated successfully';
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
      this.PasswordsService.close_loader();
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

  Question='';

  delete_livre(){
    let dialog_ask = document.getElementById('dialog_ask');
    if(dialog_ask){
      dialog_ask.style.display='none';
    }
    this.PasswordsService.open_loader();
    this.LivreServiceService.delete(this.livre).subscribe(
      (data)=>{
        this.PasswordsService.close_loader();
        setTimeout(() => {
          this.title='Success✅👇';
          this.message='Your book has been deleted successfully';
          let dialog = document.getElementById('dialog');
          if(dialog){
            dialog.style.display='block';
          }
            
        }, 3000);
       
        this.open_livres();
      }
    );
  }

  open_dialog_ask(){
    let dialog = document.getElementById('dialog_ask');
    this.Question='Est ce que vous etes sur de vouloir supprimer ce livre?🔴'
    if(dialog){
      dialog.style.display='block';
    }
  }


  close_dialog_ask(){
    let dialog = document.getElementById('dialog_ask');
    if(dialog){
      dialog.style.display='none';
    }
  }
  

  open_livres(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/admin_livres/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }






 
  

}
