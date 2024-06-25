import { PasswordsService } from './../passwords.service';
import { ReservationService } from './../reservation.service';
import { reservation } from 'src/reservation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { User } from 'src/User';
import { ActivatedRoute, Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Front_Manager } from 'src/Manager';


@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent implements OnInit {


  constructor(private ReservationService : ReservationService,private PasswordsService : PasswordsService,private router : Router,private route:ActivatedRoute) { }

  title='a';
  message='a';
  nb_reservation=0;
  code='';

  button_text='Open Scanner';
  scanner=false;
  @ViewChild('webcam')
  webcam: any;


  reservations:reservation[]=[];
  reservation:reservation={
    id_res: 0,
    id_livre: 0,
    id_abonné: 0,
    date_res: new Date(),
    date_retour:new Date(),
    code: '',
    statut: false
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
  verif_code='';
  generating_code='';


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
            this.get_all_reservation();
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

  open_livre(id:number){
    let hashed_id = this.PasswordsService.encryptString(id.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_id = encodeURIComponent(hashed_id);
    let hashed_mail = this.PasswordsService.encryptString(this.connected_manager.adresse_mail.toLocaleString(), this.PasswordsService.secret_key);
    let encoded_mail = encodeURIComponent(hashed_mail);


    this.router.navigate(['/book_details/'+encoded_id+'/'+encoded_mail]);

  }


  get_all_reservation(){
    this.ReservationService.get_all_reservation().subscribe(
      (data)=>{
      this.reservations=data;
      this.nb_reservation=this.reservations.length;
    },
    (error)=>{
      this.title='Erreur';
      this.message='Erreur lors de la récupération des réservations';
      let dialog = document.getElementById('dialog');
      if(dialog){
        dialog.style.display='block';
      }
    }
    
    )
  }
  private trigger: Subject<void> = new Subject<void>();
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  handleInitError(error: WebcamInitError): void {
    console.error('Erreur lors de l\'initialisation de la webcam :', error);
  }

  handleImageCapture(image: WebcamImage): void {
    console.log('Image capturée :', image);
  }

  stopVideo(): void {
    if (this.webcam) {
      this.webcam.stop();
    }
  }




  close_dialog_delete(){
    let dialog = document.getElementById('dialog_delete');
    if(dialog){
      dialog.style.display='none';
     
    }
  }
  close_dialog_message(){
    let dialog = document.getElementById('dialog_message');
    if(dialog){
      dialog.style.display='none';
      this.title='';
      this.message='';
    }
  }

  open_scanner(){
    this.scanner=!this.scanner;
    let scan_section = document.getElementById('scanner');
    if(scan_section){
      if(this.scanner){
        scan_section.style.display='block';
        this.button_text='Close Scanner';
      }
      else{
        scan_section.style.display='none';
        this.button_text='Open Scanner';
      }
    
    }
    
  }

  open_dialog_delete(code:string){
    this.code=code;
    let dialog = document.getElementById('dialog_delete');
    if(dialog){
      dialog.style.display='block';
    }
  }

  delete_reservation(){
    this.PasswordsService.open_loader();
    this.ReservationService.delete_reservation_by_code(this.code).subscribe(
      (data)=>{
        this.title='Success✅';
        this.message='Reservation supprime avec succes';
        let dialog = document.getElementById('dialog_message');
        if(dialog){
          dialog.style.display='block';
        }
        this.get_all_reservation();
        this.close_dialog_delete();
        this.PasswordsService.close_loader();
      },
      (error)=>{
        this.title='Erreur🔴⛔';
        this.message='Erreur lors de la suppression';
        let dialog = document.getElementById('dialog_message');
        if(dialog){
          dialog.style.display='block';
        }
        this.close_dialog_delete();
        this.PasswordsService.close_loader();
      }
    )
  }

  get_reservation_by_code(){
    this.ReservationService.get_reservation_by_code(this.code).subscribe(
      (data)=>{
        this.reservations=data;
        this.nb_reservation=this.reservations.length;
       
        
      }
    )
    if(this.code==''){
      this.get_all_reservation();
    }
    
  }


  close_dialog_verif_code(){
    let dialog_code_verif = document.getElementById('dialog_verif_code'); 
    if(dialog_code_verif){
      dialog_code_verif.style.display='none';
    }
  }

  open_dialog_verif_code(item:reservation){
    this.reservation=item;
    this.generating_code=this.PasswordsService.generateRandomString(6);
    this.verif_code='';
    this.PasswordsService.open_loader();
    emailjs.init('iQPAvdMoj37X1rb-t');
    emailjs.send("service_7c8j1b9","template_57if6vg",{
         
        message: this.generating_code,
        destination: this.connected_manager.adresse_mail,
    });
    this.PasswordsService.close_loader();
    let dialog_code_verif = document.getElementById('dialog_verif_code');
    if(dialog_code_verif){
      dialog_code_verif.style.display='block';
    }

    
    
  }

  validate_reservation(){
    this.PasswordsService.open_loader();
    if(this.verif_code==this.generating_code){
      this.ReservationService.valider_reservation(this.reservation.id_res).subscribe(
        (data)=>{
          
          
          this.title='Success✅';
          this.message='Reservation validee avec succes';
          let dialog = document.getElementById('dialog_message');
          if(dialog){
            dialog.style.display='block';
          }
          this.get_all_reservation();
          this.close_dialog_verif_code();
          this.PasswordsService.close_loader();
        },
        (error)=>{
          this.title='Erreur🔴⛔';
          this.message='Erreur lors de la validation';
          let dialog = document.getElementById('dialog_message');
          if(dialog){
            dialog.style.display='block';
          }
          this.close_dialog_verif_code();
          this.PasswordsService.close_loader();
        }
      )
    }
    else{
      this.title='Erreur🔴⛔';
      this.message='Code de validation incorrect';
      let dialog = document.getElementById('dialog_message');
      if(dialog){
        dialog.style.display='block';
      }
      this.close_dialog_verif_code();
      this.PasswordsService.close_loader();
    }
  }
  

  

}
