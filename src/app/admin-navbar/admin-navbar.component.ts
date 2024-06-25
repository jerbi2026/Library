import { PasswordsService } from './../passwords.service';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(  private router:Router,private route: ActivatedRoute,private PasswordsService:PasswordsService) {}

  
  @Input() image = '';
  @Input() name = '';
  title='';
  message='';

  open_reservation(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/get_reservation/'+encodedid]);
        
      });
      
      
    }
    else{
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
  open_propositions(){
     let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/get_proposition/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }


  open_quotes(){
     let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/get_quotes/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }

  open_settings(){
     let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/admin_settings/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }

  open_dashboard(){
     let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/admin_dashboard/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/page-bloquee']);
    }
  }
  close_dialog(){
    let dialog =  document.getElementById('dialog_admin_sidebar');
    if(dialog){
      dialog.style.display='none';
    }
  }
  open_dialog(){
    this.title='Voulez vous supprimer le compte de cet appareil?🫰🫵';
    let dialog =  document.getElementById('dialog_admin_sidebar');
    if(dialog){
      dialog.style.display='block';
    }
  }

  delete_account(){
    let dialog =  document.getElementById('dialog_admin_sidebar');
    if(dialog){
      dialog.style.display='none';
    }
    localStorage.removeItem('connected_manager');
    this.router.navigate(['/admin_login']);
  }

  keep_account(){
    let dialog =  document.getElementById('dialog_admin_sidebar');
    if(dialog){
      dialog.style.display='none';
    }
    this.router.navigate(['/admin_login']);
  }

}
