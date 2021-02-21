import * as Config from '../config.json';
import App from './app/bootstrap';

// import Developer from './_helpers/developer';
import {modules} from './modules';

// import * as LogRocket from 'logrocket';
// LogRocket.init('pdu5s5/hop');
// LogRocket.identify('1', {
//     name: 'Farid Rn',
//     email: 'faridv@gmail.com',
//     type: 'admin'
// });

// new Developer({
//     debug: true,
//     active: true,
//     console: null
// });

// Bootstrap AppManager
try {
    new App(Config, modules);
} catch (error) {
    console.error(error);
}
