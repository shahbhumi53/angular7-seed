import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Asset } from '../../model/asset.model';

@Injectable()
export class ImageService {

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  getImage(imageUrl: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(imageUrl)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public addBase64ImgURL(assets: Asset[]): Asset[] {
    assets.forEach((val, i) => {
      if (val.image_url !== null && -1 !== val.image_url.indexOf('?initials=')) {
        this.getImage(val.image_url)
          .then((response) => {
            assets[i].custom_field.displayImg = response;
          })
          .catch((error) => {
            assets[i].custom_field.displayImg = '';
          });
      } else {
        assets[i].custom_field.displayImg = val.image_url;
      }
    });
    return assets;
  }
}
