import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { GeoLocation, WeatherResponse } from '../models/weather';
import { environment } from '../environments/environments';


@Injectable({ providedIn: 'root', })

export class WeatherService {
  private http = inject(HttpClient);
  private apiKey = environment.weatherApiKey;

  getWeather(city: string): Observable<{ geo: GeoLocation, weather: WeatherResponse }> {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;

    console.log('API Key:', this.apiKey);       // ← adicione isso
    console.log('URL Geocoding:', geoUrl);       // ← e isso

    return this.http.get<GeoLocation[]>(geoUrl).pipe((
      switchMap(locations => {
        if (!locations || locations.length === 0) {
          throw new Error('Cidade não encontrada');
        }
        const geo = locations[0];
        const weatherUrl = `https://api.openweathermap.org/data/4.0/onecall/current?lat=${geo.lat}&lon=${geo.lon}&units=metric&lang=pt_br&appid=${this.apiKey}`;

        return this.http.get<WeatherResponse>(weatherUrl).pipe(
          switchMap(weather => [{ geo, weather }])
        );
      })
    ));
  }

}
