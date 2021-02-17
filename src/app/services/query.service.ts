import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  sendMail(email: string, description: string, date: any) {
    const query = { email, description, date };
    this.http.post<{message: string}>('http://localhost:3000/api/sendMail', query)
    .subscribe((responseData)=>{
      console.log(responseData.message);
    });
  }
}
