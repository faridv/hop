/**
 * The `Configuration` object allows configuration items within the system to be read and modified. This includes
 * settings such as audio and subtitle languages, display aspect ratios and other similar settings. Unlike the `LocalSystem`
 * object, this is concerned with software- and application-related settings rather than hardware configuration and control.
 *
 * The property `isPINEntryLocked` and the methods `setParentalControlPIN`,
 * `unlockWithParentalControlPIN`, `verifyParentalControlPIN`, `setBlockUnrated` and
 * `getBlockUnrated` formerly found in this class are now found in the
 * `application/oipfParentalControlManager` embedded object - see section 7.9.1.
 *
 * The methods `setParentalControlPINEnable` and `getParentalControlPINEnable` formerly found in this
 * class have been removed.
 */
export class Configuration {

  /**
   * A comma-separated set of languages to be used for audio playback, in order of preference.
   * Each language SHALL be indicated by its ISO 639.2 language code as defined in [ISO 639.2].
   */
  preferredAudioLanguage: string;

  /**
   * A comma-separated set of languages to be used for subtitle playback, in order of preference.
   * Each language SHALL be indicated by its ISO 639.2 language code as defined in [ISO 639.2].
   */
  preferredSubtitleLanguage: string;

  /**
   * A comma-separated set of languages to be used for the user interface of a service, in order of
   * preference.
   *
   * Each language SHALL be indicated by its ISO 639.2 language code as defined in [ISO 639.2].
   * If present, the HTTP `Accept-language` header shall contain the same languages as the
   * preferredUILanguage property with the same order of preference. NOTE: The order of preference in
   * the `Accept-language` header is indicated using the quality factor.
   */
  preferredUILanguage: string;

  /**
   * An ISO-3166 three character country code identifying the country in which the receiver is deployed.
   */
  countryId: string;

  /**
   * An integer indicating the time zone within a country in which the receiver is deployed. A value of 0
   * SHALL represent the eastern-most time zone in the country, a value of 1 SHALL represent the next
   * time zone to the west, and so on.
   * Valid values are in the range 0 – 60.
   */
  regionId: number;

  /**
   * The policy dictates what mechanism the system should use when storage space is exceeded.
   * Valid values are shown in the table below.
   * Value Description
   * - `0` Indicates a recording management policy where no recordings are to
   *   be deleted.
   * - `1` Indicates a recording management policy where only watched
   *   recordings MAY be deleted.
   * - `2` Indicates a recording management policy where only recordings
   *   older than the specified threshold (given by the `pvrSaveDays` and
   *   `pvrSaveEpisodes` properties) MAY be deleted.
   */
  pvrPolicy: 0 | 1 | 2;

  /**
   * When the `pvrPolicy` property is set to the value 2, this property indicates the minimum number of
   * episodes that SHALL be saved for series-link recordings.
   */
  pvrSaveEpisodes: number;

  /**
   * When the `pvrPolicy` property is set to the value 2, this property indicates the minimum save time (in
   * days) for individual recordings. Only recordings older than the save time MAY be deleted.
   */
  pvrSaveDays: number;

  /**
   * The default padding (measured in seconds) to be added at the start of a recording.
   */
  pvrStartPadding: number;

  /**
   * The default padding (measured in seconds) to be added at the end of a recording.
   */
  pvrEndPadding: number;

  /**
   * Get the system text string that has been set for the specified key.
   *
   * @param key A key identifying the system text string to be retrieved.
   */
  getText(key: string): string;

  /**
   * Set the system text string that has been set for the specified key. System text strings
   * are used for automatically-generated messages in certain cases, e.g. parental control
   * messages.
   *
   * @param key The key for the text string to be set. Valid keys are:
   *   - `'no_title'` Text string used as the title for
   *     programmes and channels where no
   *     guide information is available.
   *     Defaults to “No information”
   * - `'no_synopsis'` Text string used as the synopsis for
   *     programmes where no guide information
   *     is available.
   *     Defaults to “No further information available”
   * - `'manual_recording'` Text string used to identify a manual
   *     recording.
   *     Defaults to “Manual Recording”
   * @param value The new value for the system text string.
   */
  setText(key: 'no_title' | 'no_synopsis' | 'manual_recording', value?: string): void;


}
