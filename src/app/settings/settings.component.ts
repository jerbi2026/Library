import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';
import { abonne_connected } from '../abonne_connected';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }
  title='';
  message='';
  selectedFile: File | null = null;
  constructor(private router : Router, private route: ActivatedRoute, private PasswordsService : PasswordsService) {}

  ngOnInit(): void {

    let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.PasswordsService.open_loader();
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
        const hashedid = decodeURIComponent(encodedid);
        this.connected_user.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
        this.PasswordsService.get_abonne_connected(this.connected_user.adresse_mail).subscribe((data)=>{
          if(data){
            this.connected_user = data;
            
          }
          this.PasswordsService.close_loader();
        }
        );});
        this.PasswordsService.close_loader();
      
     
  
    }
    else{
  
      this.router.navigate(['/login']);
    }
    
     
    }


    submit_changes(){
      if(this.connected_user.nom != '' && this.connected_user.prenom != '' && this.connected_user.adresse != '' ){
        this.PasswordsService.open_loader();
        this.PasswordsService.update_abonne(this.connected_user).subscribe((data:number)=>{
         
           if(data==1){
           
            this.title='Success✅👇';
            this.message='Your changes have been saved';
            let dialog = document.getElementById('dialog');
            if(dialog){
              dialog.style.display='block';
            }
            this.PasswordsService.close_loader();
           }
           else{
            
            this.title='Error❌👇';
            this.message='An error occured while saving your changes';
            let dialog = document.getElementById('dialog');
            if(dialog){
              dialog.style.display='block';
            }
            this.PasswordsService.close_loader();
           
           }
           
          
        }
        
        );
        this.ngOnInit();
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

    close_dialog(){
      let dialog = document.getElementById('dialog');
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
      let dialog=document.getElementById('dialog');
      this.PasswordsService.open_loader();
      this.PasswordsService.uploadImage(file).subscribe(
        (response: any) => {
          this.connected_user.image = response.data.display_url;
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

}
