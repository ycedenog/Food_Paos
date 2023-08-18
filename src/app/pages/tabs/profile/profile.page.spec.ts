import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(
    waitForAsync(() => {
      authServiceMock = {
        signOut: jasmine.createSpy().and.returnValue(Promise.resolve({})),
      };
      routerMock = {
        navigate: jasmine.createSpy(),
      };

      TestBed.configureTestingModule({
        declarations: [ProfilePage],
        imports: [IonicModule.forRoot()],
        providers: [
          { provide: AuthenticationService, useValue: authServiceMock },
          { provide: Router, useValue: routerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfilePage);
      component = fixture.componentInstance;
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out when logout method is called', async () => {
    await component.logout();
    expect(authServiceMock.signOut).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle error during logout', async () => {
    const errorMessage = 'Error logging out';
    authServiceMock.signOut.and.returnValue(Promise.reject(errorMessage));

    await component.logout();

    expect(authServiceMock.signOut).toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
    
  });
});
