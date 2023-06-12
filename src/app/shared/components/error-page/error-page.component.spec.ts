import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageComponent } from './error-page.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
     });
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to login', () => {
    spyOn(router, 'navigate').and.stub();

    component.navigateTo();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(router.navigate).toHaveBeenCalledWith(jasmine.any(Array));
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

});
