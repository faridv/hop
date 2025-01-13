export class Channel {

  /**
   * Used in the channelType property to indicate a TV channel.
   */
  readonly TYPE_TV: number;

  /**
   * Used in the channelType property to indicate a radio channel.
   */
  readonly TYPE_RADIO: number;

  /**
   * Reserved for data services defined by [TS 102 796].
   */
  readonly TYPE_HBBTV_DATA: number;

  /**
   * Used in the idType property to indicate an analogue channel identified by
   the property: ‘freq’ and optionally ‘cni’ or ‘name’.
   */
  readonly ID_ANALOG: number;

  /**
   * Used in the idType property to indicate a DVB-C channel identified by the
   three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_DVB_C: number;

  /**
   * Used in the idType property to indicate a DVB-S channel identified by the
   three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_DVB_S: number;

  /**
   * Used in the idType property to indicate a DVB-T channel identified by the
   three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_DVB_T: number;

  /**
   * Used in the idType property to indicate a channel that is identified through
   its delivery system descriptor as defined by DVB-SI [EN300468] section
   6.2.13.
   */
  readonly ID_DVB_SI_DIRECT: number;

  /**
   * Used in the idType property to indicate a DVB-C or DVB-C2 channel
   identified by the three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_DVB_C2: number;

  /**
   * Used in the idType property to indicate a DVB-S or DVB-S2 channel
   identified by the three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_DVB_S2: number;

  /**
   * Used in the idType property to indicate a DVB-T or DVB-T2 channel
   identified by the three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_DVB_T2: number;

  /**
   * Used in the idType property to indicate an ISDB-C channel identified by
   the three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_ISDB_C: number;

  /**
   * Used in the idType property to indicate an ISDB-S channel identified by
   the three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_ISDB_S: number;

  /**
   * Used in the idType property to indicate an ISDB-T channel identified by
   the three properties: ‘onid’, ‘tsid’, ‘sid’.
   */
  readonly ID_ISDB_T: number;

  /**
   * Used in the idType property to indicate a terrestrial ATSC channel
   identified by the property ‘sourceID’.
   */
  readonly ID_ATSC_T: number;

  /**
   * Used in the idType property to indicate an IP broadcast channel identified
   through SD&S by a DVB textual service identifier specified in the format
   “ServiceName.DomainName” as value for property ‘ipBroadcastID’, with
   ServiceName and DomainName as defined in [DVB-IPTV]. This idType
   SHALL be used to indicate Scheduled content service defined by [PROT]
   */
  readonly ID_IPTV_SDS: number;

  /**
   * Used in the idType property to indicate an IP broadcast channel identified
   by a DVB MCAST URI (e.g. i.e. dvb-mcast://), as value for property
   ‘ipBroadcastID’.
   */
  readonly ID_IPTV_URI: number;

  /**
   *     The type of channel. The value MAY be indicated by one of the TYPE_* constants defined above. If the
   type of the channel is unknown then the value SHALL be “undefined”.

   NOTE: Values of this type between 256 and 511 are reserved for use by related specifications on request
   by liaison.
   */
  readonly channelType: number;

  /**
   * The type of identification for the channel, as indicated by one of the ID_* constants defined above
   */
  readonly idType: number;

  /**
   *     Unique identifier of a channel within the scope of the OITF. The ccid is defined by the OITF and SHALL
   have prefix ‘ccid: e.g. ‘ccid:{tunerID.}majorChannel{.minorChannel}’.

   Note: the format of this string is platform-dependent.
   */
  readonly ccid: string;

  /**
   * Optional unique identifier of the tuner within the scope of the OITF that is able to receive the given
   channel.
   */
  readonly tunerID?: string;

  /**
   * DVB or ISDB original network ID.
   */
  readonly onid: number;

  /**
   * The DVB or ISDB network ID.
   */
  readonly nid: number;

  /**
   * DVB or ISDB transport stream ID.
   */
  readonly tsid: number;

  /**
   * DVB or ISDB service ID.
   */
  readonly sid: number;

  /**
   * ATSC source_ID value.
   */
  readonly sourceID: number;

  /**
   * For analogue channels, the frequency of the video carrier in kHz.
   */
  readonly freq: number;

  /**
   * For analogue channels, the VPS/PDC confirmed network identifier.
   */
  readonly cni: number;

  /**
   *     The name of the channel. Can be used for linking analog channels without CNI. Typically, it will contain the
   call sign of the station (e.g. 'HBO').
   */
  readonly name: string;

  /**
   *     The major channel number, if assigned. Value undefined otherwise. Typically used for channels of type
   ID_ATSC_* or for channels of type ID_DVB_* or ID_IPTV_SDS in markets where logical channel numbers
   are used.
   */
  readonly majorChannel: number;

  /**
   *     The minor channel number, if assigned. Value undefined otherwise. Typically used for channels of type
   ID_ATSC_*.
   */
  readonly minorChannel: number;

  /**
   *     For channels of type ID_DVB_SI_DIRECT created through createChannelObject, this property defines
   the delivery system descriptor (tuning parameters) as defined by DVB-SI [EN300468] section 6.2.13.
   The dsd property provides a string whose characters shall be restricted to the ISO Latin-1 character set.
   Each character in the dsd represents a byte of a delivery system descriptor as defined by DVB-SI
   [EN300468] section 6.2.13, such that a byte at position "i" in the delivery system descriptor is equal the
   Latin-1 character code of the character at position "i" in the dsd.
   Described in the syntax of JavaScript: let sdd[] be the byte array of a system delivery descriptor, in which
   sdd[0] is the descriptor_tag, then, dsd is its equivalent string, if :
   dsd.length==sdd.length and
   for each integer i : 0<=i<dsd.length holds: sdd[i] == dsd.charCodeAt(i).
   */
  readonly dsd: string;

  /**
   *     Flag indicating whether the channel is marked as a favourite channel or not in one of the favourite lists as
   defined by property favouritelists.
   */
  readonly favourite: boolean;

  /**
   *     The names of the favourite lists to which this channel belongs (see property favLists on object
   ChannelConfig).
   */
  readonly favIDs: OIPF.StringCollection;

  /**
   *     Flag indicating whether the current state of the parental control system prevents the channel from being
   viewed (e.g. a correct parental control pin has not been entered).
   Note that this property supports the option of client-based management of parental control without
   excluding server-side implementation of parental control.
   */
  readonly locked: boolean;

  /**
   *     Flag indicating whether the user has manually blocked viewing of this channel. Manual blocking of a
   channel will treat the channel as if its parental rating value always exceeded the system threshold.
   Note that this property supports the option of client-based management of manual blocking without
   excluding server-side management of blocked channels.
   */
  readonly manualBlock: boolean;
  /**
   *     If the Channel has idType ID_IPTV_SDS, this element denotes the DVB textual service identifier of the IP
   broadcast service, specified in the format “ServiceName.DomainName” with the ServiceName and
   DomainName as defined in [DVB-IPTV].
   If the Channel has idType ID_IPTV_URI, this element denotes a URI of the IP broadcast service.
   */
  readonly ipBroadcastID: string;

  /**
   *     If the channel has id Type ID_IPTV_SDS, this element denotes the maximum bitrate associated to the
   channel.
   */
  readonly channelMaxBitRate: number;

  /**
   *     If the channel has idType ID_IPTV_SDS, this element denotes the TimeToRenegotiate associated to the
   channel.
   */
  readonly channelTTR: number;

  /**
   *     Flag indicating whether the channel is available to the recording functionality of the OITF. If the value of the
   pvrEnabled property on the application/oipfConfiguration object as defined in section 7.3.2.1 is
   false, this property SHALL also be false for all Channel objects.
   */
  readonly recordable: boolean;

}
