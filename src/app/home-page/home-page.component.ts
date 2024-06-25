import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  show=false;

  showWidget() {
    var widgetContainer = document.querySelector('.elfsight-app-b0b79b2a-428c-4cc3-8767-6800def5727e');
    if (widgetContainer) {
        widgetContainer.innerHTML = ''; 
        var script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.setAttribute('data-use-service-core', '');
        script.defer = true;

        widgetContainer.appendChild(script);
    }

  }
  show_nav(){
    let navbarNav = document.getElementById("navbarNav");
    let nav_btn = document.getElementById("nav_btn");
    if(navbarNav && nav_btn){
      if(this.show==false ){
        navbarNav.classList.add("show");
        nav_btn.classList.add("collapsed");

        this.show=true;
      }
      else{
        navbarNav.classList.remove("show");
        nav_btn.classList.remove("collapsed");

        this.show=false;
  
      }
    }
  }


}
