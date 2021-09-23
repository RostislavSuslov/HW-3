import './assets/style/style.scss';
import './../src/scripts/block/template.scss';
window.addEventListener('load', function () {

    const createBlock = ({
        name,
    }) => {

        const _block = document.createElement('div')
        _block.classList.add('col')
        _block.innerHTML = name

        return _block
    }

    class Block {
        constructor({
            apiUrl
        }) {
            this.apiUrl = apiUrl

            this.init()
        }

        init() {
            this._wrap = document.querySelector('.wrapper')
        }

        async fetchData() {
            const response = await fetch(this.apiUrl)
            const data = await response.json()

            return data.length ? data : []
        }

        render() {
            this.fetchData()
                .then(res => res.map(beer => createBlock(beer)))
                .then(content => {
                    return (
                        content
                        .map(blockItem => this._wrap.appendChild(blockItem))
                    )
                })
        }
    }

    new Block({
            apiUrl: 'https://api.punkapi.com/v2/beers'
        })
        .render()


    class Data extends Block {
        constructor(apiUrl) {
            super(apiUrl);

        }
        show() {
            return this.render();
        }
    }
    
    new Data ({apiUrl: 'https://api.punkapi.com/v2/beers'})
    .render()
})