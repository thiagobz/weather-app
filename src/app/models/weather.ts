export interface GeoLocation {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
};

export interface WeatherResponse { 
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    data: WeatherData[];
}

export interface WeatherData {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wing_deg: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];

}