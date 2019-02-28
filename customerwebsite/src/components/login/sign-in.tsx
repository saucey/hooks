import * as React from 'react'
import { NextButton, VerticalSpacer15, NumberSpacesInput } from '../../styles';
import { CSSTransition } from 'react-transition-group';

export interface ISignInProps {
    defaultSpaces:number;
    selectSpaces(spaces: number): void;
}
    
export interface ISignInState {
    spaces: number;
};

 const animation = {
'.active-enter': {  opacity: 0.01, transform: `scale(0.9) translateY('50%')`},
'.active-enter-active': {  opacity: 1,  transform: `scale(1.0) translateY('0%')`, transition: 'all 300ms ease-out'},
'.active-exit': {  opacity: 1,  transform: `scale(1.0) translateY('0%')`},
'.active-exit-active': {  opacity: 0.01,  transform: `scale(0.9) translateY('50%')`,  transition: 'all 300ms ease-out'}
};
    
export class SignIn extends React.Component<ISignInProps, ISignInState> {
    constructor(props: ISignInProps) {
        super(props);
        this.state = {spaces:this.props.defaultSpaces};         
    }

selectSpaces(){
    this.props.selectSpaces(this.state.spaces);
}

onChangeText(value: string) {
    this.setState({spaces: parseFloat(value)});
}

render() {
    const {spaces} = this.state;
    return (
         <div>
             <VerticalSpacer15/>
             <NumberSpacesInput type="number" min={1} value={spaces} onChange={e => this.onChangeText(e.currentTarget.value)}></NumberSpacesInput>
             <VerticalSpacer15/>
             <CSSTransition in={this.state.spaces? true:false} classNames="active" timeout={300} unmountOnExit>
                <NextButton css={animation} onClick={() => this.selectSpaces()}/>
             </CSSTransition>
         </div>
    )
}
}


