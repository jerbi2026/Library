import { abonne_connected } from './../abonne_connected';
import { ReservationService } from './../reservation.service';
import { PasswordsService } from './../passwords.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Reservation_front } from 'src/Reservation_front';
import * as QRCode from 'qrcode';
import { User } from 'src/User';
import { Abonne_default } from 'src/Abonne_default';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  connected_user:Abonne_default={
    id_abonné: 0,
    nom: '',
    prenom: '',
    adresse: '',
    numero: 0,
    adresse_mail: '',
    image: ''
  }
  code:string='';
  title='';
  message='';
  code_val='';
  reservations:Reservation_front[]=[]
  constructor(private router:Router,private route : ActivatedRoute,private PasswordsService : PasswordsService,private ReservationService:ReservationService){}
  ngOnInit(): void {
    let verify_user = this.PasswordsService.getDecryptedItem('connected_user', this.PasswordsService.secret_key);
  if(verify_user === 'true'){
    this.route.params.subscribe(params => {
      const encodedid = params['id'];
      const hashedid = decodeURIComponent(encodedid);
      this.connected_user.adresse_mail = this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key);
      this.PasswordsService.open_loader();
      this.PasswordsService.get_abonne_connected_default(this.connected_user.adresse_mail).subscribe((data)=>{
        if(data){
          
          this.connected_user = data;
          this.ReservationService.get_reservations_abonne(this.connected_user.id_abonné).subscribe((data)=>{
            this.reservations=data;
            
            
            
           
            for(let i=0;i<this.reservations.length;i++){
              
              this.reservations[i].date_res = this.reservations[i].date_res.split("T")[0];
              this.reservations[i].date_retour = this.reservations[i].date_retour.split("T")[0];

             
            }
            
            
            
          });
          
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

  close_dialog(){
    let delete_btn=document.getElementById('delete_btn');
    let dialog = document.getElementById('dialog');
    if(dialog && delete_btn){
      dialog.style.display='none';
      delete_btn.style.display='none';
    }
    this.title='';
    this.message='';
  }

  open_dialog_delete(chiffra:string){
    this.code=chiffra;
    let dialog=document.getElementById('dialog');
    let delete_btn=document.getElementById('delete_btn');
    this.title='Suppression🗑️👇';
    this.message='Voulez vous vraiment supprimer cette réservation?';
    if(dialog && delete_btn){
      dialog.style.display='block';
      delete_btn.style.display='block';
    }

  }

  delete_reservation(){
    let dialog = document.getElementById('dialog');
    let delete_btn=document.getElementById('delete_btn');
    if(dialog && delete_btn){
      dialog.style.display='none';
      delete_btn.style.display='none';
    }
    this.title='';
    this.message='';
    this.PasswordsService.open_loader();
    this.ReservationService.delete_reservation_by_code(this.code).subscribe(
      
      (data)=>{
        
        if(data==1){
          this.title='Succès✅';
          this.message='Reservation supprimée avec succès';
          if(dialog){
            dialog.style.display='block';
          }
        }
        else{
          this.title='Echec⛔';
          this.message='Reservation non supprimée';
          if(dialog){
            dialog.style.display='block';
          }

        }
        this.title='';
    this.message='';
    this.PasswordsService.close_loader();
        this.ngOnInit();
      }
    )
  }

  close_dialog_qr_code(){
    let dialog=document.getElementById('dialog_qr_code');
    if(dialog){
      dialog.style.display='none';
    }
    this.title='';
    this.message='';
  }

  qr_code='';

  generate(code:string){
    this.code_val=code;
    
    const code_crypt = this.PasswordsService.encryptString(code, this.PasswordsService.secret_key);
    let encoded_code = encodeURIComponent(code_crypt);
 
    const qrContent = 'https://hec-library.netlify.app/#/validate_res/manager/'+encoded_code;

    
    let dialog=document.getElementById('dialog_qr_code');
    QRCode.toDataURL(qrContent, (err, url) => {
    if (err) {
        console.error(err);
        return;
    }
   this.qr_code=url;
   this.title='QR Code✅';
   if(dialog){
      dialog.style.display='block';
   }
    });
  }

  download_qr_code(){
    const code_crypt = this.PasswordsService.encryptString(this.code_val, this.PasswordsService.secret_key);
    let encoded_code = encodeURIComponent(code_crypt);
   
    const qrContent = 'https://hec-library.netlify.app/#/validate_res/manager/'+encoded_code;
    console.log(qrContent);
    QRCode.toDataURL(qrContent, (err, url) => {
    if (err) {
        console.error(err);
        return;
    }
    let link = document.createElement('a');
    link.download = 'Reservation '+this.code_val+'.png';
    link.href = url;
    link.click();
    });
  }

  
 

}
