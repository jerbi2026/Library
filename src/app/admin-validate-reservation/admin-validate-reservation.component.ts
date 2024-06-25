import { abonne } from './../abonne';
import { reservation } from 'src/reservation';
import { ReservationService } from './../reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsService } from './../passwords.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/User';
@Component({
  selector: 'app-admin-validate-reservation',
  templateUrl: './admin-validate-reservation.component.html',
  styleUrls: ['./admin-validate-reservation.component.css']
})
export class AdminValidateReservationComponent implements OnInit {
  
  reservation:reservation={
    id_res: 0,
    id_livre: 0,
    id_abonné: 0,
    date_res: new Date(),
    date_retour:new Date(),
    code: '',
    statut: false
  }
  abonne_id = 0;
  title='';
  message='';

  
  constructor(private PasswordsService:PasswordsService,private router:Router, private ReservationService:ReservationService,private route:ActivatedRoute){}
  ngOnInit(): void {
   let verify_user = this.PasswordsService.getDecryptedItem('connected_manager', this.PasswordsService.secret_key);
    if(verify_user === 'true'){
      this.route.params.subscribe(params => {
        const encodedid = params['id_res'];
        const hashedid = decodeURIComponent(encodedid);
        this.reservation.code = (this.PasswordsService.decryptString(hashedid, this.PasswordsService.secret_key));
        this.PasswordsService.open_loader();
        this.ReservationService.get_reservation_by_code(this.reservation.code).subscribe((data)=>{
          if(data){
            this.reservation = data[0];
            this.abonne_id=this.reservation.id_abonné;
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
  close_dialog(){
    let dialog = document.getElementById('dialog_message');
    if(dialog){
            dialog.style.display='block';
    }
    this.router.navigate(['/home']);

  }


  validate_reservation(){
    
    this.PasswordsService.open_loader();
      this.ReservationService.valider_reservation(this.reservation.id_res).subscribe(
        (data)=>{
          
          
          this.title='Success✅';
          this.message='Reservation validee avec succes';
          let dialog = document.getElementById('dialog_message');
          if(dialog){
            dialog.style.display='block';
          }
          this.PasswordsService.close_loader();
        },
        (error)=>{
          this.title='Erreur🔴⛔';
          this.message='Erreur lors de la validation';
          let dialog = document.getElementById('dialog_message');
          if(dialog){
            dialog.style.display='block';
          }
          this.PasswordsService.close_loader();
        }
      )
    
    
  }

}
