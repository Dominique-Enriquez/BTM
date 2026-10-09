import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { ToastStack } from './shared/components/toast-stack/toast-stack';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ToastStack],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
