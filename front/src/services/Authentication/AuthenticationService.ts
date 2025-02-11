import { BehaviorSubject } from "rxjs";

const initialState = {
  isAuthenticated: true,
};

const auth$ = new BehaviorSubject(initialState);

const login = () => {
  auth$.next({ isAuthenticated: true });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  auth$.next({ isAuthenticated: false });
};

export { auth$, login, logout };
