import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthenticationToken } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthenticationToken).getToken();
  const esApi = req.url.startsWith('http://127.0.0.1:8000/api/');
  const esLogin = req.url.includes('/login/');

  if (token && esApi && !esLogin) {
    return next(req.clone({ setHeaders: { Authorization: 'Token ' + token } }));
  }
  return next(req);
};
