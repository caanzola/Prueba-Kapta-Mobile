import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as watermark from "watermarkjs";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo:any;

  constructor(private camera: Camera, private http:HttpClient) {

    const options: CameraOptions = {

      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      
      this.http.get('https://pokeapi.co/api/v2/pokemon/butterfree')
      .subscribe(data => {
      console.log('my data: ', data);
      this.photo = 'data:image/jpeg;base64,' + imageData;
      watermark([this.photo, '../../assets/1.png'])
      .image(watermark.image.lowerLeft(0.5))
      .then(img => document.getElementById('container').appendChild(img));

       watermark([this.photo])
      .image(watermark.text.lowerLeft("Nombre: "+data.name + " \nPeso:" + data.weight+ " \Altura:" + data.height, '15px sans-serif', '#fff', 0.5))
      .then(img => document.getElementById('container').appendChild(img));
    });

      
     }, (err) => {
      // Handle error
     });

     
     
  }

  openCamera(){
  }

}
