import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Hire } from "../models/hire"
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  serverURL: string = environment.server_url
  name: string
  email: string
  message: string

  constructor(private http: HttpClient) { }

  hire(){

    if(this.name=="" || this.email=="" || this.message==""){
      alert("All fields are required!")
      return
    }

    let hire = new Hire(this.name, this.email, this.message)
    
    this.register(hire).subscribe(
      (response) => {
        console.log("uspesno")
        this.name=""
        this.email=""
        this.message=""
      },
      (error) => {
        console.log(error.message)
    })
  }

  register(hire: Hire) : Observable<Boolean> {
    return this.http.post<Boolean>(this.serverURL, hire)
  }

}
