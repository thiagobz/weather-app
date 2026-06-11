import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather';
import { GeoLocation, WeatherData } from './models/weather';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private weatherService = inject(WeatherService);

  city = '';
  geo: GeoLocation | null = null;
  weather: WeatherData | null = null;
  isLoading = false;
  errorMsg = '';

  search(): void {
    if (!this.city.trim()) return;

    this.isLoading = true;
    this.errorMsg = '';
    this.weather = null;
    this.geo = null;

    this.weatherService.getWeather(this.city).subscribe({
      next: ({ geo, weather }) => {
        this.geo = geo;
        this.weather = weather.data[0];
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Cidade não encontrada. Verifique o nome e tente novamente.'
        this.isLoading = false;
      }
    });
  }
   getIconUrl(icon: string): string {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
   }
}
