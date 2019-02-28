import * as React from 'react'
import { Purchase } from '../../models/purchase';
import { CenteredText, VerticalSpacer5, VrmGrid, VrmGridRow, VrmGridAddButton, VrmGridDeleteButton, NextButton, VrmGridInput } from '../../styles';
import { IVrm, Vrm } from '../../models';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import  '../../styles/css.css'
//import { Flipper } from 'react-flip-toolkit';

export interface IPurchaseVrmsProps {
    purchase:Purchase;
    selectVrms(Vrms: Array<IVrm>):void;
}
    
export interface IPurchaseVrmsState {
    VRMs: Array<IVrm>;
    addingRow: boolean;
};
    
export class PurchaseVrms extends React.Component<IPurchaseVrmsProps, IPurchaseVrmsState> {
    constructor(props: IPurchaseVrmsProps) {
        super(props);
        this.state = {VRMs:this.props.purchase.VRMs.length > 0? this.props.purchase.VRMs : [new Vrm], addingRow: false};         
    }

onChangeText(text: string, index: number){
   let VRMs : Array<IVrm> = this.state.VRMs;
   let VRM: IVrm = VRMs[index];
   VRM.vrm = text.toUpperCase();
   this.setState({VRMs: VRMs});
}

addRow(){
    let VRMs : Array<IVrm> = this.state.VRMs;
    let VRM: IVrm = new Vrm;
    VRMs.push(VRM);
    this.setState({VRMs: VRMs, addingRow:true});
}

deleteRow(index:number){
    let VRMs : Array<IVrm> = this.state.VRMs;
    VRMs.splice(index, 1);
    this.setState({VRMs: VRMs});
}

render() {
    const {purchase} = this.props;
    const max: number = purchase.maxVRMs * purchase.spaces;
    const active: number = purchase.activeVRMs * purchase.spaces;
    const {VRMs} = this.state;
    return (
         <div>
             <VerticalSpacer5/>
             <CenteredText>You're entitled to {max} vehicle registration{max !==1? "s":""}{purchase.maxVRMs !== purchase.activeVRMs? `, ${active} of which can be active`:''}.</CenteredText>
             {purchase.maxVRMs !== purchase.activeVRMs && <CenteredText>You can switch, at any point, which of the registrations are active.</CenteredText>}
             <VerticalSpacer5/>
             <VrmGrid>
             <TransitionGroup key={1} in={this.state.VRMs.length > 0? true: false} classNames="vrm" mountOnEnter timeout={300} appear={true} exit={true} unmountOnExit>
             {VRMs.map((item, index, array) => 
                <CSSTransition key={index} in={this.state.VRMs.length > 0} classNames="vrm" mountOnEnter timeout={300} appear={true} exit={true} unmountOnExit>
                <VrmGridRow key={index}>
                {/* <Flipper flipKey={array.length === 1 || array.length === 2}> */}
                <VrmGridInput onChange={e => this.onChangeText(e.currentTarget.value, index)} maxLength={10} autoFocus={array.length-1 ===index} value={item.vrm}
                autoCapitalize='on' autoCorrect='off' spellCheck={false}/>
                    {array.length !== 1 ? 
                    // <Flipped flipId='switchButtons'>
                    <VrmGridDeleteButton onClick={() => this.deleteRow(index)}/>
                    /* </Flipped>  */
                    : <span style={{width:50, marginRight:7}}></span>}
                    {array.length - 1 === index && (index + 1 < max) ? 
                    // <Flipped flipId='switchButtons'>
                    <VrmGridAddButton onClick={() => this.addRow()}/>
                    // </Flipped>
                     : <span style={{width:50, marginRight:7}}></span>}
                {/* </Flipper> */}
                </VrmGridRow>
                </CSSTransition>
              )}
              </TransitionGroup>
              </VrmGrid>
             <VerticalSpacer5/>
             <NextButton onClick={() => this.props.selectVrms(VRMs)}/>
         </div>
    )
}
}


