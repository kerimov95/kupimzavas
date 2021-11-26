import { Injectable } from '@angular/core';
import { UserAddress } from '../models/address';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

declare const ymaps: any;

@Injectable({
  providedIn: 'root'
})
export class YandexService {

  public currentAddress: UserAddress;
  private Marker: any;
  private _mapResolver: any;
  private myMap: Promise<any>;

  constructor(
  ) { }

  public initMap(name: string) {
    this.myMap = new Promise<any>(
      (res) => {
        this._mapResolver = res;
      });

    const myMap = new ymaps.Map(name, {
      center: [43.318300, 45.694199],
      zoom: 17,
      controls: ['zoomControl', 'typeSelector']
    }, {
      zoomControlSize: "small",
      typeSelectorSize: 'small',
      searchControlProvider: 'yandex#search',
      autoFitToViewport: 'always'
    })
    myMap.container.fitToViewport();
    myMap.copyrights.add('©КупимЗаВас');
    myMap.events.add('click', this.clickMarker, this);

    this.Marker = new ymaps.Placemark([0, 0], {
      iconCaption: 'Икон'
    }, {
      preset: 'islands#greenDotIconWithCaption',
      iconColor: '#3caa3c'
    });

    var geolocationControl = new ymaps.control.GeolocationControl({
      options: {
        noPlacemark: true
      }
    });
    myMap.controls.add(geolocationControl);
    geolocationControl.events.add('locationchange', this.FindMe, this);

    var MysearchControl = new ymaps.control.SearchControl({
      options: {
        float: 'right',
        floatIndex: 100,
        noPlacemark: true,
        size: 'small'
      }
    });
    myMap.controls.add(MysearchControl);

    MysearchControl.events.add('resultselect', async data => {
      let index = data.get('index');
      let coords = MysearchControl.getResultsArray()[index].geometry._coordinates
      this.currentAddress = new UserAddress(await this.getAddress(coords), coords[0], coords[1]);

    });
    this._mapResolver(myMap);
  }

  private async clickMarker(e: any) {
    let coords = e.get('coords')
    await this.addMarket(coords, 'Мой адрес');
  }

  public async FindMe() {
    const coordinates = await Geolocation.getCurrentPosition();
    var coords = [coordinates.coords.latitude, coordinates.coords.longitude];
    await this.addMarket(coords, 'Я', 17, true);
  }

  public async addMarket(coords: any, note: string, zoom = 0, panTo = false) {
    this.currentAddress = new UserAddress(await this.getAddress(coords), coords[0], coords[1]);
    this.Marker.geometry.setCoordinates(coords);
    this.Marker.properties.set('iconCaption', note);
    await this.myMap.then(data => {
      data.geoObjects.add(this.Marker);
      if (zoom > 0)
        data.setZoom(zoom);
      if (panTo)
        data.panTo(coords);

    })
  }

  private async  getAddress(value: any): Promise<string> {
    let address = null;
    await ymaps.geocode(value).then((res) => {
      let firstGeoObject = res.geoObjects.get(0);
      firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
      address = firstGeoObject.getAddressLine();
    });
    return address;
  }

  public async destroy() {
    await this.myMap.then(map => {
      map.destroy();
    })
  }
}
