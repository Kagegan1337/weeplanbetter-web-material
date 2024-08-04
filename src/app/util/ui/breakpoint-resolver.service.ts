import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreakpointResolverService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isPhone$ = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(map(result => result.matches))
}
