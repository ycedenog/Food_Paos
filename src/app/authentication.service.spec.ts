import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let angularFireAuthMock: any;

  beforeEach(() => {
    angularFireAuthMock = {
      createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(Promise.resolve({})),
      signInWithEmailAndPassword: jasmine.createSpy().and.returnValue(Promise.resolve({})),
      sendPasswordResetEmail: jasmine.createSpy().and.returnValue(Promise.resolve({})),
      signOut: jasmine.createSpy().and.returnValue(Promise.resolve({})),
      currentUser: null,
    };

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: AngularFireAuth, useValue: angularFireAuthMock },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', async () => {
    await service.registerUser('test@example.com', 'password');
    expect(angularFireAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should log in a user', async () => {
    await service.loginUser('test@example.com', 'password');
    expect(angularFireAuthMock.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should reset password', async () => {
    await service.resetPassword('test@example.com');
    expect(angularFireAuthMock.sendPasswordResetEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should sign out', async () => {
    await service.signOut();
    expect(angularFireAuthMock.signOut).toHaveBeenCalled();
  });

  it('should get current user profile', async () => {
    angularFireAuthMock.currentUser = { displayName: 'Test User', email: 'test@example.com' };
    const profile = await service.getProfile();
    expect(profile?.displayName).toEqual('Test User');
    expect(profile?.email).toEqual('test@example.com');
  });
});
