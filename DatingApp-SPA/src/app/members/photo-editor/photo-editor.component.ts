import { Component, OnInit, Input, Output } from "@angular/core";
import { Photo } from "../../_models/photo";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../environments/environment.prod";
import { AuthService } from "../../_services/auth.service";
import { JsonPipe } from "@angular/common";
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  baseUrl = environment.apiUrl;
  hasBaseDropZoneOver = false;
  currentMain: Photo;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        var photo = JSON.parse(response);
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo) {
    this.userService
      .setMainPhoto(photo.id, this.authService.decodedToken.nameid)
      .subscribe(
        (res) => {
          this.currentMain = this.photos.filter((p) => p.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.authService.changeMemberPhoto(photo.url);
          this.authService.user.photoUrl = photo.url;
          localStorage.setItem("user", JSON.stringify(this.authService.user));
        },
        (fail) => {
          this.alertify.error("Photo failed to be updated to main");
        }
      );
  }

  deletePhoto(id) {
    this.alertify.confirm("Are you sure you want to delete the photo?", () => {
      this.userService
        .deletePhoto(id, this.authService.decodedToken.nameid)
        .subscribe(
          (res) => {
            this.photos.splice(
              this.photos.findIndex((x) => x.id === id),
              1
            );
            this.alertify.success("Photo deleted succesfuly");
          },
          (fail) => {
            this.alertify.error("Photo failed to be deleted");
          }
        );
    });
  }
}
