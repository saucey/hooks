import * as React from 'react'
import { LargeCenteredText, NextButton, VerticalSpacer15 } from '../../styles/style';
import { CSSTransition } from 'react-transition-group';
//import { Transition, animated } from 'react-spring'

export interface IPurchaseIntroProps {
    begin(): void;
}
    
export interface IPurchaseIntroState {
    show: boolean;
};
    
export class PurchaseIntro extends React.Component<IPurchaseIntroProps, IPurchaseIntroState> {
    constructor(props: IPurchaseIntroProps) {
        super(props);
        this.state = {show:false};         
    }

    componentDidMount(){
        setTimeout(x => this.setState({show:true}),50);
    }

    render() {
        return (
            <React.Fragment>
            {/* <Transition native items={true} from={{ transform: 'translate3d(0,30px,0)' }} enter={{ transform: 'translate3d(0,0px,0)' }} leave={{ transform: 'translate3d(0,30px,0)' }}>
          {show => show && (props => <animated.div style={props}><div style={{margin:'0 auto'}}><LargeCenteredText>Follow a few simple steps to purchase your parking season ticket</LargeCenteredText></div></animated.div>) }
        </Transition> */}
            <VerticalSpacer15/>
            <LargeCenteredText>Follow a few simple steps to purchase your parking season ticket</LargeCenteredText>
            <VerticalSpacer15/>
            <CSSTransition in={this.state.show} classNames="nextbuttoninfinite" timeout={1600000} unmountOnExit>
                 <NextButton onClick={() => this.props.begin()}/>
           </CSSTransition>
            </React.Fragment>
        )
    }
}




