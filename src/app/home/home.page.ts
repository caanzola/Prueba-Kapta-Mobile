import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as watermark from "watermarkjs";
import { HttpClient } from '@angular/common/http';

export class Pokemon{
  name: string;
  weight: string;
  height: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo:any;

  constructor(private camera: Camera, private http:HttpClient) {
  }

  openCamera(){
    const options: CameraOptions = {

      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      
      this.http.get('https://pokeapi.co/api/v2/pokemon/butterfree')
      .subscribe(data => {
        var x = data as Pokemon;
      this.photo = 'data:image/jpeg;base64,' + imageData;
      watermark([this.photo, '../../assets/1.png'])
      .image(watermark.image.lowerLeft(0.5))
      .then(img => document.getElementById('container').appendChild(img));

       watermark([this.photo])
      .image(watermark.text.lowerLeft("Nombre: "+x.name + " \nPeso:" + x.weight+ " \Altura:" + x.height, '15px sans-serif', '#fff', 0.5))
      .then(img => document.getElementById('container').appendChild(img));
    });

      
     }, (err) => {
      // Handle error
     });
  }

}
