import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logo } from '../entity/logo';
import { Positions } from '../entity/positions';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Menu } from '../entity/menu';

@Injectable({
  providedIn: 'root'
})
export class BffService {

  apiURL = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  baseUrl = environment.apiUrl + '/api/v1/';  // URL to web api

  baseUrlSelcare = environment.apiUrl + '/api/v1/selfcare/';  // URL to web api



  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('BffService');
  }


  /**
   * 
   * @param emetIden 
   * @param actiIden 
   * @returns Observable
   */
  getPositions(params: any): Observable<any> {
    return this.http
      .get<Positions>(this.baseUrl + 'positions', { params: params })
      .pipe(
        catchError(this.handleError('getPositions', null))
      );
  }

  /**
   * 
   * @param emetteur 
   * @param actionnaire 
   * @returns 
   */
  getAvoirs(emetteur: string, actionnaire: string): Observable<any> {
    const options =
    {
      params: new HttpParams()
        .set('emetIden', emetteur)
        .set('actiIden', actionnaire)
    };

    return this.http.get(this.baseUrl + 'avoirs', options)
      .pipe(
        catchError(this.handleError('getAvoirs', null))
      );
  }

  /** GET logo from the server */
  /**
   * 
   * @param emetIden 
   * @returns 
   */
  getLogo(emetIden: number): Observable<any> {

    return this.http.get<Logo>(this.baseUrl + 'logo/' + emetIden)
      .pipe(
        catchError(this.handleError('getLogo', null))
      );
  }


  /** GET FAQ from the server */
  /**
   * 
   * @param isConnected 
   * @returns 
   */

  getFaq(isConnected: string): Observable<any> {
    const options =
    {
      params: new HttpParams()
        .set('piLoggedFaq', isConnected)
    };

    return this.http.get(this.baseUrl + 'faq', options)
      .pipe(
        catchError(this.handleError('getFaq', null))
      );
  }


  /** GET Menu and subMEnu from the server */
  /**
   * 
   * @param emetIden 
   * @returns 
   */
  getMenu(emetteur: number, actionnaire: number): Observable<any> {
    const options =
    {
      params: new HttpParams()
        .set('emetIden', emetteur)
        .set('actiIden', actionnaire)
        .set('tituNume', 1)
    };

    return this.http.get(this.baseUrl + 'menus', options)
      .pipe(
        catchError(this.handleError('getMenus', null))
      );
  }
  
  /** GET Categories from the server */
  /**
   * 
   * @param isLogged 
   * @returns 
   */

  getCategories(isLogged: string): Observable<any> {
    const options =
    {
      params: new HttpParams()
        .set('pIndiLogged', isLogged)
    };

    console.log("show pIndiLogged" + options.params.get('pIndiLogged'));


    return this.http.get(this.baseUrlSelcare + 'categories', options)
      .pipe(
        catchError(this.handleError('getCategories', null))
      );
  }
}