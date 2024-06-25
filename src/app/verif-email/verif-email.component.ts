import { Router } from '@angular/router';
import { PasswordsService } from './../passwords.service';
import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent {
  email:string="";
  error = false;
  code="";
  code_envoye="";
  constructor(private PasswordsService : PasswordsService,private router: Router){}

  verif_mail(){
   var code_input = document.getElementById("code");
   var code_submit = document.getElementById("code_submit");
   var submit_mail = document.getElementById("submit_mail");
   var email_container = document.getElementById("email_container");
   var code_envoye = document.getElementById("code_envoye");
   this.PasswordsService.open_loader();

    this.PasswordsService.find_mail(this.email).subscribe((data)=>{
      if(data==1 && code_input && code_submit && submit_mail && email_container && code_envoye){
        code_submit.style.display="block";
        code_input.style.display="block";
        code_envoye.style.display="block";
        submit_mail.style.display="none";
        email_container.style.display="none";
        
        this.code_envoye=this.PasswordsService.generateRandomString(6);
        emailjs.init('iQPAvdMoj37X1rb-t');
        emailjs.send("service_7c8j1b9","template_57if6vg",{
         
        message: this.code_envoye,
        destination: this.email,
        });
        this.PasswordsService.close_loader();
     
        
      }
      else if(data==0){
        let dialog =document.getElementById("dialog");
        if(dialog){
          dialog.style.display="block";
        }
        this.email = "";
        this.PasswordsService.close_loader();
      }
    });
    this.PasswordsService.close_loader();
  }

  close_dialog(){
    let dialog =document.getElementById("dialog");
    if(dialog){
      dialog.style.display="none";
    }
  }
  close_dialog_code(){
    let dialog =document.getElementById("code_envoye");
    if(dialog){
      dialog.style.display="none";
    }
  }

  verif_code(){
    if(this.code==this.code_envoye){
         let hashed_mail = this.PasswordsService.encryptString(this.email, this.PasswordsService.secret_key);
        let encoded_mail = encodeURIComponent(hashed_mail);
        localStorage.setItem('code_verif', 'true');
        this.router.navigate(['reset_password/' + encoded_mail]);

    }
  }

}
