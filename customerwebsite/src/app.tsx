import * as React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './app-router';
import './app.css'; 

const App = ({ store }) => {
return (
<Provider store={store}>
<div style={{lineHeight: 1.5}}>
<AppRouter/>
</div>
</Provider>
);
};

export default App;