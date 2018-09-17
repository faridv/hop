import * as $ from 'jquery';
import jqXHR = JQuery.jqXHR;

export default class ConnectionHelper {

    constructor() {
        this.updateStatus();
    }

    updateStatus(): void {
        if (navigator.onLine) {
            this.setOnline();
        } else {
            this.setOffline();
        }
        this.checkConnection();
    }

    setOffline(): void {
        $("#connection-status").html('<i class="icon-wifi-off"></i>');
    }

    setOnline(): void {
        $("#connection-status").html('<i class="icon-wifi"></i>');
    }

    checkConnection() {
        const self = this;
        window.addEventListener('online', self.setOnline);
        window.addEventListener('offline', self.setOffline);
    }
}