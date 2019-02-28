import * as React from 'react'; 
import { injectIntl, InjectedIntlProps} from 'react-intl';
import { Header, CompanyLogo, BackgroundImage, CancelLink } from '../../styles/style';
import { getLogo } from '../../helpers/logo';
import { LoadSpinner } from '../load-spinner';

export interface IAppContainerProps {
  title: string;
  isHome?: boolean;
  isReady: boolean;
  isOpen: boolean;
  onToggleSideMenu(boolean): void;
  render(): JSX.Element;
  renderFooter(): JSX.Element;
  onHomeClick(): void;
  }
  
  export interface IAppContainerState {
    isOpen: boolean;
  }

  //export class AppWrapper extends React.Component<IAppContainerProps, IAppContainerState> {
  export const AppWrapper = injectIntl((class extends React.Component<IAppContainerProps & InjectedIntlProps, IAppContainerState> {
  constructor(props: IAppContainerProps & InjectedIntlProps) {
    super(props); 
    this.state = {isOpen : this.props.isOpen};
  }

  render() {
    const { title, render, isHome, renderFooter, onHomeClick } = this.props;
    const isReady = this.props.isReady; 
    return (
    <React.Fragment>
    {isReady ? this.renderApp({ title, isReady, isHome, render, renderFooter, onHomeClick }) : <LoadSpinner />}
    </React.Fragment>
    );
  };

  toggleOpen = () =>{ 
     this.state.isOpen ? this.handleDrawerClose() : this.handleDrawerOpen();}

  handleDrawerOpen = () => { 
     this.setState({ isOpen: true });
     this.props.onToggleSideMenu(true);
  };

  handleDrawerClose = () => { 
    this.setState({ isOpen: false });
    this.props.onToggleSideMenu(false);
};

   renderApp = ({ title, isReady, isHome, render, renderFooter, onHomeClick}: {  
      title: string, 
      isReady: boolean, 
      isHome?: boolean, 
      render(): JSX.Element, 
      renderFooter(): JSX.Element,
      onHomeClick(): void }) => {
      return [
      (
      <div key={0} style={{paddingBottom:100}}>
      <Header key={1}>
        <CompanyLogo key={3} src={getLogo()}></CompanyLogo>
        <CancelLink key={4} to="/purchase/intro">CANCEL</CancelLink>
      </Header>
        <BackgroundImage key={2}>
          {render()}
        </BackgroundImage>
      {renderFooter()}
      </div>
      )
          ];
      };
    }
  )
  );

export default AppWrapper;
