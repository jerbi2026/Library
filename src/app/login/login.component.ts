import { Router } from '@angular/router';
import { LoginRequest } from '../LoginRequest';
import { PasswordsService } from '../passwords.service';
import { abonne } from './../abonne';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  new_abonne:abonne={
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    mot_de_passe: '',
    numero: 0,
    image: ''
  }

  login_request:LoginRequest={
    email: '',
    password: ''
  }


  confirm_pass:string='';


  dialog_title='';
  dialog_message='';

  constructor(private PasswordsService : PasswordsService,private router:Router){}
  

  sign_up(){
    const dialog = document.getElementById('dialog');

    if(this.new_abonne.mot_de_passe==this.confirm_pass && this.new_abonne.mot_de_passe.length>=8 && this.new_abonne.adresse_mail!='' && this.new_abonne.nom!='' && this.new_abonne.prenom!='') {
      this.PasswordsService.open_loader();
      this.PasswordsService.add_user(this.new_abonne).subscribe(
        (data)=>{
          if(data==0){
            this.PasswordsService.close_loader();
            if(dialog){
              dialog.style.display='block';
              this.dialog_title='Inscription réussie ✅🫰';
              this.dialog_message='Vous pouvez maintenant vous connecter';
              this.new_abonne.adresse='';
              this.new_abonne.adresse_mail='';
              this.new_abonne.image='';
              this.new_abonne.mot_de_passe='';
              this.new_abonne.nom='';
              this.new_abonne.numero=0;
              this.new_abonne.prenom='';
              this.confirm_pass='';
  
            }
            

          }
          else{
            this.PasswordsService.close_loader();
            if(dialog){
              dialog.style.display='block';
              this.dialog_title='Inscription non réussie ⛔🔴';
              this.dialog_message='Mail existe deja';
            }
          }
         
         
        },
        (error)=>{
          if(dialog){
            dialog.style.display='block';
            this.dialog_title='Inscription non réussie ⛔🔴';
            this.dialog_message='Veuillez verifier vos données';
          }
        }
        
      );
      
    }
    else{
      if(dialog){
        dialog.style.display='block';
        this.dialog_title='Inscription non réussie ⛔🔴';
        this.dialog_message='Veuillez verifier vos données';
      }
    }
  }

  close_dialog(){
    const dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
    }
  }

  login() {
    if (this.login_request.email !== '' && this.login_request.password !== '') {
      this.PasswordsService.open_loader();
      this.PasswordsService.login(this.login_request).subscribe(
        (data) => {
          this.PasswordsService.close_loader();
          if (data) {
            const dialog = document.getElementById('dialog');
            if (dialog) {
              dialog.style.display = 'block';
              this.dialog_title = 'Connexion réussie ✅🫰';
              this.dialog_message = 'Vous pouvez maintenant accéder à votre espace utilisateur';
            }
            setTimeout(() => {
              let hashed_id = this.PasswordsService.encryptString(this.login_request.email.toLocaleString(), this.PasswordsService.secret_key);
              let encoded_id = encodeURIComponent(hashed_id);
              let encrypted_value = this.PasswordsService.encryptString('true', this.PasswordsService.secret_key);
              this.PasswordsService.setEncryptedItemWithExpiration('connected_user', encrypted_value, this.PasswordsService.secret_key);
              this.router.navigate(['/interface_user/' + encoded_id]);
            }, 3000);
          } else {
            const dialog = document.getElementById('dialog');
            if (dialog) {
              dialog.style.display = 'block';
              this.dialog_title = 'Connexion non réussie ⛔🔴';
              this.dialog_message = 'Veuillez vérifier vos données';
            }
          }
        }
      );
    }
  }
  

  go_back(){
    this.PasswordsService.close_loader();
    this.router.navigate(['/home']);
  }

  open_admin(){
    this.PasswordsService.close_loader();
    this.router.navigate(['/admin_login']);
  }





  


  

}
