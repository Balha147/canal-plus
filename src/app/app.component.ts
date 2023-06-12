import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './shared/service/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isLogged$!:Observable<boolean>;


  private storageService = inject(StorageService);

  ngOnInit(): void {
    this.isLogged$ = this.storageService.isLoggedIn()
  }

}
