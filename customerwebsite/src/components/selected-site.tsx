import * as React from 'react'
import { ISiteLookup } from '../models';
import { SiteInfo, SiteInfoSite, SiteInfoSiteTitle, SiteInfoSiteAddress, SiteInfoSiteSpaces, SiteInfoOpeningHours, SiteInfoOpeningHoursTitle, SiteInfoOpeningHoursRow, SiteInfoOpeningHoursDay, SiteInfoOpeningHoursHours, NextButton, SiteInfoSiteTown, SiteInfoOpeningHoursBox, CloseButton } from '../styles/style';
import { CSSTransition } from 'react-transition-group';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './selected-site.css'
library.add(faTimesCircle)

export interface ISelectedSiteProps
{
    isOpenId: number;
    site:ISiteLookup | null;
    selectSite(site:ISiteLookup): void;
    close(): void;
}

export interface ISelectedSiteState{
    open: boolean;
    nextButtonShown: boolean;
}

export class SelectedSite extends React.Component<ISelectedSiteProps, ISelectedSiteState>{
    constructor(props: ISelectedSiteProps) {
        super(props); 
        this.state = {open:props.isOpenId !==0, nextButtonShown: false};
}

// static getDerivedStateFromProps(props:ISelectedSiteProps, state:ISelectedSiteState){
//   return {
//       open: props.isOpenId !== 0
//   }
// }

// componentDidUpdate(){
//     setTimeout(x => this.setState({nextButtonShown:this.props.isOpenId !== 0}) ,50);
// }

componentWillReceiveProps(nextProps:ISelectedSiteProps){
    this.setState({open:nextProps.isOpenId !== 0});
    setTimeout(x => this.setState({nextButtonShown:nextProps.isOpenId !== 0}) ,50);
}

render(){
const {site} = this.props;
const openingHours = [{day:'Monday',times:'6:30 am - 20:00 pm'},{day:'Tuesday',times:'6:30 am - 20:00 pm'},{day:'Wednesday',times:'6:30 am - 20:00 pm'},
{day:'Thursday',times:'6:30 am - 20:00 pm'},{day:'Friday',times:'6:30 am - 20:00 pm'},{day:'Saturday',times:'6:30 am - 20:00 pm'},{day:'Sunday',times:'closed'}];
return (
    <CSSTransition in={this.state.open} classNames="selectedsite" mountOnEnter timeout={300} appear={true} unmountOnExit>
    <SiteInfo>
    <CloseButton onClick={() => this.props.close()}><FontAwesomeIcon icon="times-circle"/></CloseButton>
    <SiteInfoSite>
        <SiteInfoSiteTitle>{site? site.siteName:''}</SiteInfoSiteTitle>
        <SiteInfoSiteAddress>{site?site.addressLine1:''}</SiteInfoSiteAddress>
        <SiteInfoSiteTown>{site?site.town:''}</SiteInfoSiteTown>
        <SiteInfoSiteSpaces>{4} spaces available</SiteInfoSiteSpaces>
        <CSSTransition in={this.state.nextButtonShown} classNames="nextbutton" timeout={1600} unmountOnExit>
            <NextButton onClick={() => this.props.selectSite(site)}/>
        </CSSTransition>
    </SiteInfoSite>
    <SiteInfoOpeningHours>
            <SiteInfoOpeningHoursTitle>Opening Hours</SiteInfoOpeningHoursTitle>
            <SiteInfoOpeningHoursBox>
            {openingHours.map((item, index) => 
                    <SiteInfoOpeningHoursRow key={index}>
                        <SiteInfoOpeningHoursDay>{item.day}</SiteInfoOpeningHoursDay>
                        <SiteInfoOpeningHoursHours>{item.times}</SiteInfoOpeningHoursHours>
                    </SiteInfoOpeningHoursRow>
                )}
            </SiteInfoOpeningHoursBox>
    </SiteInfoOpeningHours>
    </SiteInfo>
    </CSSTransition>
);
      }
    }