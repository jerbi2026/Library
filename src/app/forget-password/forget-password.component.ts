import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{ 
  pass1="";
  pass2="";
  email:string='';
  constructor(private PasswordsService : PasswordsService, private route: ActivatedRoute, private router : Router) {}
  ngOnInit(): void {
    const codeVerif = localStorage.getItem('code_verif');
    if (codeVerif === 'true'){
      this.route.params.subscribe(params => {
        const encodedMail = params['email'];
        const hashedMail = decodeURIComponent(encodedMail);
        this.email = this.PasswordsService.decryptString(hashedMail, this.PasswordsService.secret_key);
      });

    }else{
      const body= document.getElementById('reset');
      const unauthorized = document.getElementById('not_authorized');
      if (body && unauthorized){
        body.style.display='none';
        unauthorized.style.display='block';
      }
    }
    

   
  }
  

  change_password(){
    let dialog =document.getElementById("password_changed");
    let dialog_error =document.getElementById("password_error");
    if(this.pass1==this.pass2 && this.pass1.length>=8){
      
      this.PasswordsService.open_loader();
      this.PasswordsService.changePassword(this.email,this.pass1).subscribe((data)=>{
        if(data==1 && dialog){
          
          dialog.style.display="block";
         
        }
        else if(data==0 && dialog_error){
          dialog_error.style.display="block";
        }
      });
      this.pass1="";
      this.pass2="";
      this.PasswordsService.close_loader();
      
      

    }
    else{
      alert("veuillez choisir un mot de passe de 8 caractères minimum et le confirmer");
      this.PasswordsService.close_loader();
    }
      

  }
  close_dialog(){
    let dialog =document.getElementById("password_changed");
    if(dialog){
      dialog.style.display="none";
      localStorage.removeItem('code_verif');

      this.router.navigate(['login']);
    }
  }
  close_dialog_error(){
    let dialog =document.getElementById("password_error");
    if(dialog){
      dialog.style.display="none";
      localStorage.removeItem('code_verif');

      this.router.navigate(['login']);
    }
  }
}
