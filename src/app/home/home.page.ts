import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as watermark from "watermarkjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photo:any;

  constructor(private camera: Camera) {

    const options: CameraOptions = {

      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.photo = 'data:image/jpeg;base64,' + imageData;
      watermark([this.photo, '../../assets/1.png'])
      .image(watermark.image.lowerLeft(0.5))
      .then(img => document.getElementById('container').appendChild(img));

       watermark([this.photo])
      .image(watermark.text.lowerLeft('watermark.js', '15px sans-serif', '#fff', 0.5))
      .then(img => document.getElementById('container').appendChild(img));
     }, (err) => {
      // Handle error
     });

     
     
  }

  openCamera(){
  }

}
