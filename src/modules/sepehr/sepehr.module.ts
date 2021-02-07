import {Module} from '../../libs/module';

export default class SepehrModule extends Module {

    template = `<section class="module info"><h1>Module Sepehr works!</h1></section>`;

    constructor(config: any = {}, layoutInstance?) {
        super(config, layoutInstance);
        this.render();
        return this;
    }

    render(callback?): void {
        this.templateHelper.render(this.template, {}, this.$el, 'html');
    }

}