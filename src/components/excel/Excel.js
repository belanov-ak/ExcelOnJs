export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.components = options.components || []
    }

    //Creates root element and passes value, that stores in toHTML method of each class, to it
    getRoot() { 
        const $root = document.createElement('div')

        this.components.forEach(Component => {
            const component = new Component()
            $root.insertAdjacentHTML('beforeend', component.toHTML())
        });

        return $root
    }

    //Displays the template on the page 
    render() {
        this.$el.append(this.getRoot())
    }
}