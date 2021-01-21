import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminService } from 'src/app/service/admin/admin.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private db: AngularFirestore,
    public auth: AngularFireAuth,
    public adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.adminService.adminGetByAuthState();
  }

  // successCallback(succ: FirebaseUISignInSuccessWithAuthResult) {
  //   const userUid = succ.authResult.user.uid;
  //   this.db.collection('/admin').doc(userUid).get().subscribe(
  //     (v) => {
  //       let admin = v.data();
  //       if (v.exists === false) {
  //         admin = {
  //           uid: userUid,
  //           displayName: succ.authResult.user.displayName,
  //           name: succ.authResult.user.displayName,
  //           email: succ.authResult.user.email,
  //           emailVerified: succ.authResult.user.emailVerified,
  //           phoneNumber: succ.authResult.user.phoneNumber,
  //           photoURL: succ.authResult.user.photoURL,
  //           role: '0',
  //           channelID: '',
  //         };
  //         this.db.collection('admin').doc(userUid).set(admin);
  //       }
  //       this.router.navigateByUrl('/replyList');
  //     }
  //   );
  // }

  // errorCallback(errorData: FirebaseUISignInFailure) {
  //   console.log('errorCallback', errorData);
  // }

  async login() {
    const l = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' }));
    const userUid = l.user.uid;
    this.db.collection('/admin').doc(userUid).get().subscribe(
      (v) => {
        let admin = v.data();
        if (v.exists === false) {
          admin = {
            uid: userUid,
            displayName: l.user.displayName,
            name: l.user.displayName,
            email: l.user.email,
            emailVerified: l.user.emailVerified,
            phoneNumber: l.user.phoneNumber,
            photoURL: l.user.photoURL,
            role: '0',
            channelID: '',
          };
          this.db.collection('admin').doc(userUid).set(admin);
        }
        this.router.navigateByUrl('/replyList');
      }
    );
  }
  logout() {
    this.auth.signOut();
  }
}
