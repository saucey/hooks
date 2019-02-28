import * as React from 'react';
import glamorous from 'glamorous';
import { AppContainer, LoadSpinner, LoadSpinnerInverse } from '../../components'
import { IPermitProduct, IProductSearchModel, ITown, ISiteLocationSearchModel, ISiteLookup, IProductFrequency, IClient, IPermit, Customer, IVrm } from '../../models';
import { GeneralHeaderWithUnderline, NextButton, CenterInMiddleOfScreen, GeneralHeaderWithUnderlineTaller } from '../../styles/style';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { PurchaseFooter } from '../../components/purchase-footer/purchase-footer';
import { PurchaseCity } from '../../components/purchase/purchase-city';
import { IPurchase, Purchase } from '../../models/purchase';
import { PurchaseSite } from '../../components/purchase/purchase-site';
import { PurchaseProduct } from '../../components/purchase/purchase-product';
import { PurchaseFrequency } from '../../components/purchase/purchase-frequency';
import { PurchaseSpaces } from '../../components/purchase/purchase-spaces';
import { PurchaseSummary } from '../../components/purchase/purchase-cost-summary';
import { PurchaseStartDate } from '../../components/purchase/purchase-calendar';
import { PurchaseConfirmation } from '../../components/purchase/purchase-confirmation';
import { getClient } from '../../helpers';
import { PurchaseIntro } from '../../components/purchase/purchase-intro';
import { createProductFrequenciesFromProductPrices } from '../../helpers/frequency';
import { PurchaseBankAccount } from '../../components/purchase/purchase-bank-account';
import { PurchaseCardPayment } from '../../components/purchase/purchase-card-payment';
import { PurchaseVrms } from '../../components/purchase/purchase-vrms';
import { Flipped, Flipper } from 'react-flip-toolkit';

const HomeWrapper = glamorous.div({ label: 'HomeWrapper', display: 'flex', flexDirection: 'column'});

export interface IPurchaseProps //extends WithStyles<typeof styles>
{
client:IClient;
towns: Array<ITown>;
sites:Array<ISiteLookup>;
products: Array<IPermitProduct>; 
product: IPermitProduct | null;
productFrequencies: Array<IProductFrequency>;
isProcessing: boolean;
permit:IPermit | null;
fetchSites(searchModel:ISiteLocationSearchModel): void;
fetchProducts(searchModel:IProductSearchModel): void;
fetchProduct(permitProductId: number): void;
onSave(permitId: number, purchase: IPurchase):void;
}

export interface IPurchaseState {
step: number;
purchase:IPurchase;
client:IClient;
show:boolean;
isDesktop:boolean;
products: Array<IPermitProduct>;
}

const setStepNumber = (stepName: string) => {
    //const stepName = this.props.location.pathname;
    switch(stepName){
        case '/purchase/intro'       : return 0;
        case '/purchase/city'        : return 1;
        case '/purchase/site'        : return 2;
        case '/purchase/product'     : return 3; 
        case '/purchase/frequency'   : return 4;
        case '/purchase/spaces'      : return 5;
        case '/purchase/vrms'        : return 6; 
        case '/purchase/startDate'   : return 7; 
        case '/purchase/summary'     : return 8;
        case '/purchase/bankAccount' : return 9;
        case '/purchase/cardPayment' : return 10;
        case '/purchase/confirmation': return 11;
    }
    return 0;
}

export class PurchaseHome extends React.Component<IPurchaseProps & RouteComponentProps, IPurchaseState>{

constructor(props: IPurchaseProps & RouteComponentProps) {
    super(props); 
    this.state = {step:setStepNumber(props.location.pathname), purchase: this.props.location.state? this.props.location.state.purchase: new Purchase, client: getClient(), 
        show:true, isDesktop:this.updateScreenInfo(), products: []};
}

componentDidMount(){
    window.addEventListener("resize", this.updateScreenInfo);
}

static getDerivedStateFromProps(props: IPurchaseProps & RouteComponentProps, state: IPurchaseState){
    return {step:setStepNumber(props.location.pathname)}
}

componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenInfo);
}

updateScreenInfo = () => { return window.innerWidth > 700 };

componentDidUpdate(prevProps: IPurchaseProps, prevState: IPurchaseState){
    //Check if products have just been loaded, potentially skip a step if only one product returned
    if(this.state.client.clientId === 23 && this.props.products.length > 0 && prevProps.products.length === 0) 
    {
        if(this.props.products.length === 1) //don't show product step if only one, more to next step
        {
            let product: IPermitProduct = this.props.products[0];
            let p = {...this.state.purchase, productId: product.permitProductId, productName: product.permitProductName, maxVRMs: product.maxVRMs, activeVRMs: product.activeVRMs };
            this.setState({purchase: p}, () => {
                this.props.fetchProduct(product.permitProductId); 
                this.props.history.push({pathname:"/purchase/frequency", state:{purchase:this.state.purchase}});
            });
        }
        else{
            this.props.history.push({pathname:"/purchase/product", state:{purchase:this.state.purchase}});
        }
    }
    //after select product - manually set frequency including price when get product info back for University of Wales
if(this.state.client.clientId === 447 && this.props.product && !prevProps.product) 
{
    let p = {...this.state.purchase, frequency: createProductFrequenciesFromProductPrices(this.props.product.prices.find(x => x.isCurrent))
        .find(y => y.productFrequencyName==="Monthly")};
    this.setState({purchase: p}); 
}
}

newSiteSearchModel():ISiteLocationSearchModel {
    return { clientId:this.state.client.clientId, searchText:'', latitude: 0, longitude:0, town:this.state.purchase.town.town,pageSize:1000};
}

newProductSearchModel(siteId:number):IProductSearchModel {
    return { clientId:this.state.client.clientId, searchText:'', siteId};
}

//0
begin(){
    if(this.state.client.clientId === 447){
        let site: ISiteLookup = {siteId: 3623, siteName:'', addressLine1:'',town:'', client:{clientId:447,clientName:'', shouldShowSites:false}, latitude:0, longitude:0};
        let p = {...this.state.purchase, site: site, town:{town:'Swansea', latitude:0,longitude:0,zoomLevel:12}};
        this.setState({purchase: p}, () => {
            this.props.fetchProducts(this.newProductSearchModel(site.siteId)); 
            this.props.history.push({pathname:"/purchase/product", state:{purchase:this.state.purchase}});
        });
    }
    else { this.props.history.push("/purchase/city"); }
}

//1
selectTown(town: ITown) {
    let p = {...this.state.purchase,town: town};
    this.setState({purchase: p}, () => {
        this.props.fetchSites(this.newSiteSearchModel()); 
        this.props.history.push({pathname:"/purchase/site", state:{purchase:this.state.purchase}});
    });
}

//2
selectSite(site: ISiteLookup){
    let p = {...this.state.purchase, site: site};
    this.setState({purchase: p}, () => {
        this.props.fetchProducts(this.newProductSearchModel(site.siteId)); 
        // this.props.history.push({pathname:"/purchase/product", state:{purchase:this.state.purchase}});
    });
}

//3
selectProduct(product: IPermitProduct){
    if(this.state.client.clientId ===23)
    {
    let p = {...this.state.purchase, productId: product.permitProductId, productName: product.permitProductName, maxVRMs: product.maxVRMs, activeVRMs: product.activeVRMs };
    this.setState({purchase: p}, () => {
        this.props.fetchProduct(product.permitProductId); 
        this.props.history.push({pathname:"/purchase/frequency", state:{purchase:this.state.purchase}});
    });
    }
    if(this.state.client.clientId ===447) //University of Wales, skip frequency step
    {
    let p = {...this.state.purchase, productId: product.permitProductId, productName: product.permitProductName, maxVRMs: product.maxVRMs, activeVRMs: product.activeVRMs,
        frequency:{productFrequencyId:3, productFrequencyName:'Monthly', productFrequencyPeriodName:'month',productFrequencyDescription:'',timeOrder:3, price:0}, spaces:1 };
    this.setState({purchase: p}, () => {
        this.props.fetchProduct(product.permitProductId); 
        this.props.history.push({pathname:"/purchase/vrms", state:{purchase:this.state.purchase}});
    });
    }
}

//4
selectFrequency(frequency: IProductFrequency){
    let p = {...this.state.purchase, frequency: frequency};
    this.setState({purchase: p}, () => {
        this.props.history.push({pathname:"/purchase/spaces", state:{purchase:this.state.purchase}});
    });
}

//5
selectSpaces(spaces:number){
    let p = {...this.state.purchase, spaces: spaces};
    this.setState({purchase: p}, () => {
    this.props.history.push({pathname:"/purchase/vrms", state:{purchase:this.state.purchase}});
    });
}

//6
selectVrms(vrms:Array<IVrm>){
    let p = {...this.state.purchase, VRMs: vrms};
    this.setState({purchase: p}, () => {
    this.props.history.push({pathname:"/purchase/startDate", state:{purchase:this.state.purchase}});
    });
}

//7
selectStartDate(startDate:Date){
    let p = {...this.state.purchase, startDate: startDate, customer: {...new Customer, customerId:22}};
    this.setState({purchase: p}, () => {
    this.props.history.push({pathname:"/purchase/summary", state:{purchase:this.state.purchase}});
    });
}


//10
buyPermit(){
    this.props.onSave(0,this.state.purchase);
    this.props.history.push({pathname:"/purchase/confirmation", state:{purchase:this.state.purchase}});
}

heading(title:string, taller:boolean = false){
    return !(taller)? <GeneralHeaderWithUnderline>{title}</GeneralHeaderWithUnderline> :
    <GeneralHeaderWithUnderlineTaller>{title}</GeneralHeaderWithUnderlineTaller>
}

render() {
const {products, isProcessing, towns, sites, productFrequencies, product, permit} = this.props;
const {step, purchase, isDesktop} = this.state;
return (
<AppContainer title='Purchase Permit' renderFooter={()=> {return isDesktop && <PurchaseFooter step={step} purchase={this.state.purchase}/>}} 
render={() => {
return <Flipper flipKey={step === 1 || step === 2}><HomeWrapper>
    {step === 0 && <React.Fragment>
        {this.heading('SEASON TICKETS')}
        <PurchaseIntro begin={() => this.begin()}></PurchaseIntro>
    </React.Fragment>}
    {step === 1 && <React.Fragment>
        <Flipped flipId='raiseHeading'>{this.heading('Choose a city')}</Flipped><br/><br/>
        {isProcessing && <LoadSpinner/>}
        <PurchaseCity towns={towns} selectTown={(e) => this.selectTown(e)}/>
    </React.Fragment>}
    {step === 2 && <React.Fragment>
        <Flipped flipId='raiseHeading'>{this.heading('Choose a car park', true)}</Flipped>
        {isProcessing && <CenterInMiddleOfScreen><LoadSpinnerInverse/></CenterInMiddleOfScreen>}
        <PurchaseSite sites={sites} selectSite={(e) => this.selectSite(e)} town={purchase.town}/>
    </React.Fragment>}
    {step === 3 && <React.Fragment>
        <Flipped flipId='raiseHeading'>{this.heading(`Choose a permit${this.state.client.clientId ===447? '':'with access to that car park'} `)}</Flipped>
        {isProcessing && <LoadSpinner/>}
        <PurchaseProduct products={products} selectProduct={(e) => this.selectProduct(e)}/>
    </React.Fragment>}
    {step === 4 && <React.Fragment>
        <Flipped flipId='raiseHeading'>{this.heading('Choose a permit frequency')}</Flipped>
        {isProcessing && <LoadSpinner/>}
        <PurchaseFrequency prices={product?product.prices.find(x => x.isCurrent):null} selectFrequency={(e) => this.selectFrequency(e)} productFrequencies={productFrequencies}/>
    </React.Fragment>}
    {step === 5 && <React.Fragment>
        <Flipped flipId='raiseHeading'>{this.heading('How many spaces would you like?')}</Flipped>
        {isProcessing && <LoadSpinner/>}
        <PurchaseSpaces defaultSpaces={purchase.spaces} selectSpaces={(e) => this.selectSpaces(e)}/>
    </React.Fragment>}
    {step === 6 && <React.Fragment>
        <Flipped flipId='raiseHeading'>{this.heading('Enter vehicle registration details')}</Flipped>
        {isProcessing && <LoadSpinner/>}
        <PurchaseVrms purchase={purchase} selectVrms={(e) => this.selectVrms(e)}/>
    </React.Fragment>}
    {step === 7 && <React.Fragment>
        {console.log(purchase)}
        <Flipped flipId='raiseHeading'>{this.heading('What date should the permit start from?', true)}</Flipped>
        {isProcessing && <LoadSpinner/>}
        <PurchaseStartDate purchase={purchase} productEndDate={product? product.endDate: null} selectStartDate={(e) => this.selectStartDate(e)}/>
    </React.Fragment>}
    {step === 8 && <React.Fragment>
        <Flipped flipId='raiseHeading'>{this.heading('Summary')}</Flipped>
        {isProcessing && <LoadSpinner/>}
        <PurchaseSummary purchase={purchase}/>
        <NextButton onClick={() => this.props.history.push({pathname:(purchase.frequency.productFrequencyName!=="Annually" && purchase.frequency.productFrequencyName!=="Quarterly")?"/purchase/bankAccount":"/purchase/cardPayment", 
        state:{purchase:this.state.purchase}})}/>
    </React.Fragment>}
    {step === 9 && <React.Fragment>
        {this.heading('Enter bank account details for payments')}
        {isProcessing && <LoadSpinner/>}
        <PurchaseBankAccount purchase={purchase}/>
        <NextButton onClick={() => this.props.history.push({pathname:"/purchase/cardPayment", state:{purchase:this.state.purchase}})}/>
    </React.Fragment>}
    {step === 10 && <React.Fragment>
        {this.heading('Enter your card details for payment')}
        {isProcessing && <LoadSpinner/>}
        <PurchaseCardPayment purchase={purchase} buyPermit={() => this.buyPermit()}/>
    </React.Fragment>}
    {step === 11 && <React.Fragment>
        {this.heading('Confirmation')}
        {isProcessing && <LoadSpinner/>}
        <PurchaseConfirmation purchase={purchase} permit={permit}/>
        <NextButton onClick={() => this.props.history.push({pathname:"/purchase/intro", state:{purchase:this.state.purchase}})}/>
    </React.Fragment>}
    {/* </Flipper> */}
    </HomeWrapper></Flipper>
 }}/>);
}
}

export default withRouter(PurchaseHome);