import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const url = environment.api

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
    upload(files: Array<File>): Promise<any> {
        return new Promise((resolve, reject) => {

            let uploadAPI = url + 'upload'

            let formData: any = new FormData();

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i], files[i].name);
            }

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = evnt => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onerror = evnt => {
                //console.log("onerror");
                //console.log(evnt);
            };

            xhr.open("POST", uploadAPI, true);

            let token = localStorage.getItem('token');
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);

            xhr.send(formData);
        })

    };
}
