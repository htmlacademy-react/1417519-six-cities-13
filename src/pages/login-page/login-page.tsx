import {useRef, FormEvent, useState, ChangeEvent} from 'react';
import {Navigate} from 'react-router-dom';
import { useAppDispatch } from '../../components/hooks/use-dispatch';
import { loginAction} from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { toast } from 'react-toastify';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../components/hooks/use-select';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({email: '', password: ''});

  function onChangeFormHandler (evt: ChangeEvent<HTMLInputElement>): void {
    const {name, value} = evt.target;
    setFormData({ ...formData, [name]: value});
  }

  const regexPassword = /^(?=.*\d)(?=.*[a-z])\S*$/i;
  const regexEmail = /^[\w]{1}[\w-\\.]*@[\w-]+\.[a-z]{2,4}$/i;

  const buttonIsDisabled = !regexEmail.test(formData.email) || !regexPassword.test(formData.password);

  const dispatch = useAppDispatch();


  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null
    && passwordRef.current !== null) {
      if (!regexPassword.test(passwordRef.current.value)) {
        toast.warn('The password must have at least one letter & one symbol without spaces');
        return;
      }
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const isAuthorization = useAppSelector((state) => state.USER.authorizationStatus) === AuthorizationStatus.Auth;

  if (isAuthorization) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={submitHandler}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={onChangeFormHandler}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={onChangeFormHandler}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={buttonIsDisabled}
              >
            Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default LoginPage;
