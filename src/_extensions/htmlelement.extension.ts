export {};

declare global {
    interface HTMLElement {
        currentChannel: any;
        getChannelConfig(): any;
        setFullScreen(fullScreen?: Boolean): void;
        getOwnerApplication(document?: Document): any;
        bindToCurrentChannel(): any;
        prevChannel(): void;
        nextChannel(): void;
        release(): void;
    }
}
