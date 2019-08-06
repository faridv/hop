import * as Config from './../config.json';
import App from './app/bootstrap';

import * as LogRocket from 'logrocket';
LogRocket.init('pdu5s5/hop');
LogRocket.identify('1', {
    name: 'Farid Rn',
    email: 'faridv@gmail.com',
    type: 'admin'
});

// Bootstrap AppManager
new App(Config);