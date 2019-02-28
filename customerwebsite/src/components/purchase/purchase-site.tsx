import * as React from 'react'
import { ISiteLookup, IGeoLocation, ITown } from '../../models';
import { StyledGoogleMap } from '../google-map';
import { Marker, withGoogleMap } from 'react-google-maps';
import { SelectedSite } from '../selected-site';

export interface IPurchaseSiteProps {
    sites: Array<ISiteLookup>; 
    town: ITown;
    selectSite(site:ISiteLookup): void;
}
    
export interface IPurchaseSiteState {
    isOpenId: number;
    mapCentre: IGeoLocation | null;
    zoomLevel: number;
};
    
export class PurchaseSite extends React.Component<IPurchaseSiteProps, IPurchaseSiteState> {
    constructor(props: IPurchaseSiteProps) {
        super(props);
        this.state = {isOpenId:0, zoomLevel: this.props.town.zoomLevel ? this.props.town.zoomLevel:12,
            mapCentre:{latitude:this.props.town.latitude? this.props.town.latitude:51.33, longitude:this.props.town.longitude? this.props.town.longitude + 0.01:-0.15564799999999998}};         
    }

componentWillMount() {
    this.getGeoLocationForTown(this.props.town.town);
};

onGoogleApiLoaded = (map, maps) => {
    if (map) {
        const bounds = new maps.LatLngBounds();
        map.fitBounds(bounds);
        this.bindResizeListener(map, maps, bounds);
      }
};

bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

getGeoLocationForTown(town: string) {
    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': `${town}, uk`}, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      //let lat = results[0].geometry.location.lat();
      //let lng = results[0].geometry.location.lng()+0.01;
      //this.setState({mapCentre: {latitude:lat, longitude:lng}});
    } else {
      alert("Something went wrong " + status);
    }
  });
}

onToggleOpen(siteId: number) {
    let newSiteId: number = siteId;
    if (this.state.isOpenId === newSiteId){ newSiteId = 0;}
    this.setState({isOpenId:newSiteId});
}

selectSite(site: ISiteLookup){
    this.props.selectSite(site);
}

close(){
    this.setState({isOpenId:0});
}

render() {
    const {sites} = this.props;
    const {isOpenId} = this.state;
    return (
        <div style={{position: 'relative'}}>
                <StyledGoogleMap key="oneMap" zoom={this.state.zoomLevel} onGoogleApiLoaded={this.onGoogleApiLoaded} yesIWantToUseGoogleMapApiInternals
                center={{ lat: this.state.mapCentre && this.state.mapCentre.latitude?this.state.mapCentre.latitude:0, lng: this.state.mapCentre && this.state.mapCentre.longitude?this.state.mapCentre.longitude:0 }}  >
               
                    {sites && sites.map(item => (
                        <Marker key={item.siteId} position={{ lat: item.latitude, lng: item.longitude }} onClick={() => this.onToggleOpen(item.siteId)} 
                        icon={{url: isOpenId === item.siteId ? '/icons/parkingMarkerOrange.png' : '/icons/parkingMarker.png', size:new google.maps.Size(30,30)}}></Marker>
                    ))}
               </StyledGoogleMap>
               <SelectedSite isOpenId={isOpenId} site={isOpenId !== 0 ? sites.find(x => x.siteId === isOpenId):null} selectSite={(e) => this.selectSite(e)} close={() => this.close()}/>
            </div>
        )
    }
}

export default withGoogleMap(PurchaseSite);


