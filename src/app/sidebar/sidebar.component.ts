import { ActivatedRoute, Route, Router } from '@angular/router';
import { PasswordsService } from './../passwords.service';
import { Component, Input } from '@angular/core';
import { abonne_connected } from '../abonne_connected';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  @Input() image = '';
  @Input() name = '';
  connected_user:abonne_connected={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }

  constructor(  private router:Router,private route: ActivatedRoute,private PasswordsService:PasswordsService) {}

  open_favourites(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['/favourites/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  open_main(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['interface_user/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  open_prop(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['proposition/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  open_settings(){
   let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
      
        this.router.navigate(['settings/'+encodedid]);
        
      });
      
      
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  open_reservations(){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
    
      this.router.navigate(['/reservations/'+encodedid]);
      
    });
  }

  title='';
  message='';
  close_dialog(){
    let dialog =  document.getElementById('dialog_sidebar');
    if(dialog){
      dialog.style.display='none';
    }
  }
  open_dialog(){
    this.title='Voulez vous supprimer le compte de cet appareil?🫰🫵';
    let dialog =  document.getElementById('dialog_sidebar');
    if(dialog){
      dialog.style.display='block';
    }
  }

  delete_account(){
    let dialog =  document.getElementById('dialog_sidebar');
    if(dialog){
      dialog.style.display='none';
    }
    localStorage.removeItem('connected_user');
    this.router.navigate(['/login']);
  }

  keep_account(){
    let dialog =  document.getElementById('dialog_sidebar');
    if(dialog){
      dialog.style.display='none';
    }
    this.router.navigate(['/login']);
  }


  
  
  
 

}
