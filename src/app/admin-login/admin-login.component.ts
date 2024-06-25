import { Router } from '@angular/router';
import { Front_Manager } from './../../Manager';
import { LoginRequest } from '../LoginRequest';
import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent   implements OnInit{

  constructor(private PasswordsService : PasswordsService, private router:Router){}

  dialog_title='';
  dialog_message='';

  nb_tentative=0;

  
  
  
  close_dialog(){
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
      this.dialog_title='';
      this.dialog_message='';
    }
  }
  login_request:LoginRequest={
    email: '',
    password: ''
  }

  Front_Manager : Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse: '',
    adresse_mail: '',
    numero: '',
    image: ''
  }
  ngOnInit(): void {
    const blockedUntil = localStorage.getItem('blockedUntil');
    let dialog = document.getElementById('dialog');
    if (blockedUntil && Date.now() < +blockedUntil) {
      this.dialog_title = 'Connexion échouée ❌🫰';
      this.dialog_message = 'Vous avez atteint le nombre maximal de tentatives. Veuillez réessayer plus tard.';
      if (dialog) {
          dialog.style.display = 'block';
      }
      setTimeout(() => {
        this.router.navigate(['/page-bloquee']);
        
      }, 1500);
      
     
      
    }
  }

  login() {
    let dialog = document.getElementById('dialog');
    this.nb_tentative++;
    if (this.nb_tentative >= 3) {
        const blockedUntil = localStorage.getItem('blockedUntil');
        if (blockedUntil && Date.now() < +blockedUntil) {
            this.dialog_title = 'Connexion échouée ❌🫰';
            this.dialog_message = 'Vous avez atteint le nombre maximal de tentatives. Veuillez réessayer plus tard.';
            if (dialog) {
                dialog.style.display = 'block';
            }
            return; 
        }
    }
    this.PasswordsService.open_loader();
    this.PasswordsService.login_manager(this.login_request).subscribe(
        (data) => {
          this.PasswordsService.close_loader();
            if (data != null) {
                this.Front_Manager = data;
                
                
                setTimeout(() => {
                  let hashed_id = this.PasswordsService.encryptString(this.login_request.email.toLocaleString(), this.PasswordsService.secret_key);
                  let encoded_id = encodeURIComponent(hashed_id);
                  let encrypted_value = this.PasswordsService.encryptString('true', this.PasswordsService.secret_key);
                this.PasswordsService.setEncryptedItemWithExpiration('connected_manager', encrypted_value, this.PasswordsService.secret_key);
                  this.router.navigate(['/admin_dashboard/' + encoded_id]);
                  
                }, 1500);
                if (dialog) {
                    this.dialog_title = 'Connexion réussie ✅🫰';
                    this.dialog_message = 'Vous allez être redirigé vers le tableau de bord';
                    dialog.style.display = 'block';
                }
            } else {
                if (this.nb_tentative >= 3) {
                    const blockedUntilTime = Date.now() + (10 * 60 * 1000); 
                    localStorage.setItem('blockedUntil', blockedUntilTime.toString());
                }
                if (dialog) {
                    this.dialog_title = 'Connexion échouée ❌🫰';
                    if (this.nb_tentative >= 3) {
                        this.dialog_message = 'Vous avez atteint le nombre maximal de tentatives. Veuillez réessayer plus tard.';
                        dialog.style.display = 'block';
                        setTimeout(() => {
                          this.router.navigate(['/page-bloquee']);
                          
                        }, 1500);

                    } else {
                        this.dialog_message = 'Adresse mail ou mot de passe incorrect';
                        dialog.style.display = 'block';
                    }
                    
                }
            }
        }
    );
    this.PasswordsService.close_loader();
}



}
