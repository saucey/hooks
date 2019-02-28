export interface IUser { 
    userId: number; 
    userName: string; 
    displayName: string; 
}
    
export interface IAppUser extends IUser { 
    emailAddress: string; 
    isAuthenticated:boolean;
    token: string;
}  

export const newUser:IAppUser = {
    userId: 0,
    userName: '',
    displayName: '',
    emailAddress: '',
    isAuthenticated: false,
    token: ''
}