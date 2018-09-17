export {};

declare global {
    interface HTMLElement {
        currentChannel: Object;
        getChannelConfig(): any;
        setFullScreen(fullScreen?: Boolean): void;
        getOwnerApplication(document?: Document): any;
        bindToCurrentChannel(): any;
        prevChannel(): void;
        nextChannel(): void;
        release(): void;
    }
}
