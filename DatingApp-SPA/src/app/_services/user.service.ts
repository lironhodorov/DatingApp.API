import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";

import { PaginationResult } from "../_models/pagination";

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

  getUsers(pageNumber?, pageSize?,userParams?,likeParams?): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<
      User[]
    >();
    let params = new HttpParams();
    if (pageNumber != null && pageSize != null) {
      params = params.append("currentPage", pageNumber);
      params = params.append("pageSize", pageSize);
    }
    if(userParams!=null){
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge); 
     params = params.append("gender", userParams.gender);
     params = params.append("orderBy", userParams.orderBy);

    }
    if(likeParams==='Likees'){
      params = params.append("Likees", 'true');
    }
    if(likeParams==='Likers'){
      params = params.append("Likers", 'true');
    }

    return this.http
      .get<User[]>(this.baseUrl + "users", { observe: "response", params })
      .pipe(
        map((response) => {
          paginationResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginationResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginationResult;
        })
      );
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
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }

  sendLike(id:number,likeeId:number){
    return this.http.post(this.baseUrl + "users/" + id + "/like/" + likeeId,{});
  }
}
