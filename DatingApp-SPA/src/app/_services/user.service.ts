import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from "@angular/common/http";

// const httpOptions={
//   headers: new HttpHeaders({
//     'Authorization':'Bearer '+localStorage.getItem("token")
//   })
// };

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "users");
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(id, user: User) {
    return this.http.put(this.baseUrl + "users/" + id, user);
  }

  setMainPhoto(id: Number, userId: Number) {
    return this.http.put(
      this.baseUrl + "users/" + userId + "/photos/" + id + "/setMain",
      {}
    );
  }
  
  deletePhoto(id: Number, userId: Number) {
    return this.http.delete(
      this.baseUrl + "users/" + userId + "/photos/" + id);
  }
}
