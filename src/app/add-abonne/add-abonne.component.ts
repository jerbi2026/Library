import { abonne } from './../abonne';
import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-add-abonne',
  templateUrl: './add-abonne.component.html',
  styleUrls: ['./add-abonne.component.css']
})
export class AddAbonneComponent implements OnInit{
  constructor(private PasswordsService : PasswordsService,private router:Router,private route:ActivatedRoute){}

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
      this.PasswordsService.open_loader();
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
        const hashedid = decodeURIComponent(encodedid);
        this.connected_manager.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
        this.PasswordsService.get_front_manager(this.connected_manager.adresse_mail).subscribe((data)=>{
          if(data){
            this.connected_manager = data;
            this.PasswordsService.close_loader();
            
          }
        }
        );});
      
     
  
    }
    else{
      this.PasswordsService.close_loader();
  
      this.router.navigate(['/page-bloquee']);
    }
  }
  open_abonne(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/abonnees/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }
  abonne : abonne={
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    mot_de_passe: '',
    numero: 0,
    image: 'https://res.cloudinary.com/degywbqer/image/upload/v1709828138/logo_ihec_qqymbw.jpg'
  }
  title='';
  message='';
  second_password='';

  onFileSelected(event: any) {
    const file = event.target.files[0];
   
  
    if (file) {
      let dialog=document.getElementById('dialog');
      this.PasswordsService.open_loader();
      this.PasswordsService.uploadImage(file).subscribe(
        (response: any) => {
          this.abonne.image = response.data.display_url;
          if(dialog){
            this.PasswordsService.close_loader();
            this.title='Image uploaded successfully✅';
            this.message='Your image has been uploaded successfully';
            dialog.style.display='block';
          }
          
          
        },
        (error) => {
          this.PasswordsService.close_loader();
          if(dialog){
            this.title='Error uploading image⛔';
            this.message='Your image has not been uploaded';
            dialog.style.display='block';
          }
          
        }
      );
    }
  }

  reset(){
    this.abonne.nom='';
    this.abonne.prenom='';
    this.abonne.adresse_mail='';
    this.abonne.image='https://res.cloudinary.com/degywbqer/image/upload/v1709828138/logo_ihec_qqymbw.jpg';
    this.abonne.numero=0;
    this.abonne.mot_de_passe='';
    this.abonne.adresse='';
    this.second_password='';
   

  }
  close_dialog(){
    let dialog=document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
    }
  }




  ajouter_user(){
    if(this.abonne.nom!='' && this.abonne.prenom!='' && this.abonne.mot_de_passe!='' && this.abonne.adresse!='' && this.abonne.adresse_mail!='' && this.abonne.numero!=0 && this.second_password==this.abonne.mot_de_passe && this.abonne.mot_de_passe.length>=8 ){
      this.PasswordsService.open_loader();
      this.PasswordsService.add_user(this.abonne).subscribe(
        (data)=>{
          this.PasswordsService.close_loader();
         if(data==0){
          let dialog=document.getElementById('dialog');
          this.title='Auteur added successfully✅';
          this.message='The user has been added successfully';
          setTimeout(() => {
            if(dialog){
              dialog.style.display='block';
              
             
            }
            
          }, 3000);
         

         }
         else{
          this.PasswordsService.close_loader();
          let dialog=document.getElementById('dialog');
          setTimeout(() => {
            if(dialog){
              this.title='Error adding author⛔';
              this.message='Mail existe deja';
              dialog.style.display='block';
           }
              
          }, 3000);
          
          
        }

    },
    (error)=>{
      this.PasswordsService.close_loader();
      setTimeout(() => {
        let dialog=document.getElementById('dialog');
      if(dialog){
        this.title='Error adding author⛔';
        this.message='The user has not been added';
        dialog.style.display='block';
      }
        
      }, 3000);
      

    }
    )
    }
    else{
      this.PasswordsService.close_loader();
      setTimeout(() => {
        let dialog=document.getElementById('dialog');
        if(dialog){
          this.title='Error adding author⛔';
          this.message='Please fill all the fields';
          dialog.style.display='block';
        }
        
      }, 3000);
     
    }
    this.open_abonne();

  }

}
