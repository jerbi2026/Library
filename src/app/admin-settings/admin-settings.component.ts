import { Component, OnInit } from '@angular/core';
import { PasswordsService } from '../passwords.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit{
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
            this.PasswordsService.close_loader();
            
          }
        }
        );});
        this.PasswordsService.close_loader();
      
     
  
    }
    else{
      this.PasswordsService.close_loader();
      this.router.navigate(['/page-bloquee']);
    }
  }

  submit_changes(){
    if(this.connected_manager.nom != '' && this.connected_manager.prenom != '' && this.connected_manager.adresse != '' ){
      this.PasswordsService.open_loader();
      this.PasswordsService.update_manager(this.connected_manager).subscribe(
        (data:number)=>{
       
         if(data==1){
         
          this.title='Success✅👇';
          this.message='Your changes have been saved';
          let dialog = document.getElementById('dialog');
          if(dialog){
            dialog.style.display='block';
          }
          
         }
         else{
          
          this.title='Error❌👇';
          this.message='An error occured while saving your changes';
          let dialog = document.getElementById('dialog');
          if(dialog){
            dialog.style.display='block';
          }
         
         }
         this.PasswordsService.close_loader();
        
      },
      (error)=>{
        this.title='Error❌👇';
        this.message='An error occured while saving your changes';
        let dialog = document.getElementById('dialog');
        if(dialog){
          dialog.style.display='block';
        }

        this.PasswordsService.close_loader();
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
    
    }
    this.PasswordsService.close_loader();
    this.ngOnInit();
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
        this.connected_manager.image = response.data.display_url;
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
