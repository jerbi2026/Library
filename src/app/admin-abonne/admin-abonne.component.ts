import { ReservationService } from './../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';
import { find_auteur } from 'src/find_auteur';
import { User } from 'src/User';
import { Front_Manager } from 'src/Manager';
@Component({
  selector: 'app-admin-abonne',
  templateUrl: './admin-abonne.component.html',
  styleUrls: ['./admin-abonne.component.css']
})
export class AdminAbonneComponent implements OnInit {



  nb_abonne=0;
  p=1;
  name_user='';
  users:User[]=[];
  user:User={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    numero: 0,
    image: ''
  }
  connected_manager:Front_Manager={
    id_manager: 0,
    nom: '',
    prenom: '',
    adresse_mail: '',
    adresse: '',
    image: '',
    numero: ''
  }

  nb_reservation=0;
  nb_reservation_valide=0;
  nb_reservation_non_valide=0;
  constructor(private PasswordsService:PasswordsService,private router:Router, private ReservationService:ReservationService,private route:ActivatedRoute){}
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
            this.get_users();
            this.get_nb_users();
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

  get_users(){
    this.PasswordsService.get_all().subscribe(
      (data)=>{
        this.users=data;
      }
    )
  }

  get_nb_users(){
    this.PasswordsService.get_nb_abonne().subscribe(
      (data)=>{
        this.nb_abonne=data;
      }
    )
  }
  find_user_name(){
    if(this.name_user != ''){
        
      var nameParts = this.name_user.split(" ");
      var find_req: find_auteur = {
        nom: nameParts[0],
        prenom: nameParts.slice(1).join(" ")
    };
    
      this.PasswordsService.get_abonne_by_name(find_req).subscribe(
        (data:User[])=>{
       
        this.users = data;
      });
    }
    else{
      this.get_users();
    }
   
  }

  open_user(user:User){
    this.user=user;
    this.PasswordsService.open_loader();
    this.ReservationService.get_nb_reservations_abonne(user.id_abonné).subscribe(
      (data)=>{
        this.nb_reservation=data;
      }
    )
    this.ReservationService.get_nb_reservations_abonne_valide(user.id_abonné).subscribe(
      (data)=>{
        this.nb_reservation_valide=data;
      }
    )
    this.ReservationService.get_nb_reservations_abonne_non_valide(user.id_abonné).subscribe(
      (data)=>{
        this.nb_reservation_non_valide=data;
      }
    )
    let dialog = document.getElementById('dialog');
    if(dialog){
      dialog.style.display='block';
    
    }
    this.PasswordsService.close_loader();


  }

  ajouter_abonne(){
    let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.PasswordsService.open_loader();
      this.route.params.subscribe(params => {
        const encodedid = params['id'];
        this.PasswordsService.close_loader();
        this.router.navigate(['/ajouter_abonne/'+encodedid]);
        
      });
      
      
    }
    else{
      this.PasswordsService.close_loader();
      this.router.navigate(['/page-bloquee']);
    }
   

  }

  close_dialog(){
    let dialog=document.getElementById('dialog');
    if(dialog){
      dialog.style.display='none';
    }
  }
  close_dialog_delete(){
    let dialog=document.getElementById('dialog_delete');
    if(dialog){
      dialog.style.display='none';
    }
  }
  open_dialog_delete(){
    this.close_dialog();
    let dialog=document.getElementById('dialog_delete');
    if(dialog){
      dialog.style.display='block';
    }

  }


  delete_user(){
    this.PasswordsService.open_loader();
    this.PasswordsService.delete_abonne(this.user.id_abonné).subscribe(
      (data)=>{
        this.get_users();
        this.get_nb_users();
        this.close_dialog();
        this.close_dialog_delete();
        this.PasswordsService.close_loader();
      },
      (error)=>{
        this.close_dialog();
        this.close_dialog_delete();
        this.open_dialog_message();
        this.PasswordsService.close_loader();
      }
    )
  }

  close_dialog_message(){
    let dialog = document.getElementById('dialog_message');
    if(dialog){
      dialog.style.display='none';
    }
  }
  open_dialog_message(){
    let dialog = document.getElementById('dialog_message');
    if(dialog){
      dialog.style.display='block';
    }
  }



}
