/**
 * The OITF SHALL implement the “application/oipfConfiguration” object as defined below. This object
 * provides an interface to the configuration and user settings facilities within the OITF.
 */
export class ConfigurationObject extends HTMLObjectElement {
  type: 'application/oipfConfiguration';

  /**
   * Accesses the configuration object that sets defaults and shows system settings.
   */
  public readonly configuration: OIPF.Configuration;

  /**
   * Accesses the object representing the platform hardware.
   */
  public readonly localSystem: OIPF.LocalSystem;

  /**
   * The function that is called when the IP address of a network interface has changed. The specified
   * function is called with two arguments `item` and `ipAddress`. The `ipAddress` may have the value
   * `undefined` if a previously assigned address has been lost.
   */
  public onIpAddressChangee(item: OIPF.NetworkInterface, ipAddress?: string): void;
}
