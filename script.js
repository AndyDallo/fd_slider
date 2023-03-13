class Slider {
    constructor(images) {
        this.images = images
        this.index = 0
        this.rotation = 0
        this.pgnHeight = 0
        this.init()
        this.setup()
        this.uploadImage()
        this.useCross()
        this.createTitle()
        this.showHideTitle()
        this.createPagination()
        this.updatePagination()
        this.arrowNavigation()
        this.mouseClickNavigation()
    }
    init() {
        this.slider = document.querySelector('#slider')
        this.mask = []
        this.el = []
        for (let i = 0; i < this.images.length; i++) {
            this.maskSh = document.createElement('div')
            this.maskSh.className = 'img-m'
            this.mask.push(this.maskSh)

            this.elSh = document.createElement('div')
            this.elSh.className = 'img-c'
            this.el.push(this.elSh)
        }
    }
    setup() {

        this.invertMask = []
        this.mask.slice(1).forEach( element => {
            element.style.transform = 'translate3d(100%, 0, 0)'
        })
        this.el.slice(1).forEach( element => {
            element.style.transform = 'translate3d(-50%, 0, 0)'
        })
        for (let i = this.elL - 1; i >= 0; i--) {
            this.invertMask.push(this.mask[i])
        }    
        this.mask[0].style.zIndex = 10
        this.mask[0].style.opacity = 0
    }
    uploadImage() {
        for (let i = 0; i < this.images.length; i++) {
            this.el[i].style.backgroundImage = `url(${this.images[i]['url']})`
            this.mask[i].appendChild(this.el[i])
            this.slider.appendChild(this.mask[i])
        } 
    }
    next() {
        if (this.index + 1 >= this.images.length) {
            return
        }
        this.indexLayer = 10
        this.rotation += 90
        this.pgnHeight -= this.pgnNumber
        this.rotateCross()
        this.moveImageForward()
        this.goToNextTitle()
        this.paginationForward()
        this.index++
    }
    prev() {
        if (this.index <= 0) {
            return
        }
        this.rotation -= 90
        this.indexLayer -= 10
        this.pgnHeight += this.pgnNumber

        this.rotateCross()
        this.moveImageBackward()
        this.goToPreviousTitle()
        this.paginationBackward()

        this.index--
    }
    moveImageForward(){
        this.mask[this.index].style.transform = 'translate3d(0, 0, 0)'
        this.el[this.index].style.transform = 'translate3d(-50%, 0, 0)'
        this.mask[this.index +1].style.transform = 'none'
        this.el[this.index +1].style.transform = 'none'
        this.mask[this.index + 1].style.zIndex = this.indexLayer
    }
    moveImageBackward(){
        
        this.mask[this.index].style.transform = 'translate3d(100%, 0, 0)'
        this.el[this.index].style.transform = 'translate3d(-50%, 0, 0)'
        this.mask[this.index -1].style.transform = 'none'
        this.el[this.index -1].style.transform = 'none'
    }
    goToNextTitle(){
        this.title[this.index].style.transform = 'translate3d(0, -110%, 0)'
        this.title[this.index + 1].style.transform = 'none'
    }
    goToPreviousTitle(){
        this.title[this.index].style.transform = 'translate3d(0, 110%, 0)'
        this.title[this.index - 1].style.transform = 'none'
    }
    useCross(){
        this.cross = Array.from(document.querySelector('#p-cross').children)
    }
    rotateCross(){
        this.cross.forEach(element => {
            element.style.transform = `rotate(${this.rotation}deg)`
        })
    }
    createTitle(){
        this.tittleWrapper = document.querySelector('#p-title-w')
        for (let i = 0; i < this.images.length; i++) {
           this.titleLi = document.createElement('li')
           this.titleDiv = document.createElement('div')
           this.titleDiv.className = 'p-title'
           this.titleText = document.createElement('p')
           this.titleText.className = 'p-title-t'
           this.titleText.innerHTML = this.images[i]['title']
           this.titleLi.appendChild(this.titleDiv)
           this.titleDiv.appendChild(this.titleText)
           this.tittleWrapper.appendChild(this.titleLi)
        }
    }
    showHideTitle(){
        this.title = Array.from(document.querySelectorAll('.p-title-t'))
        this.title[0].style.transform = 'none'
    }
    createPagination() {
        this.pgn = document.querySelector('.p-pgn-left')
        this.pgnMax = document.querySelector('#p-pgn-right')
        this.pgnMax.innerHTML = this.images.length
        for (let index = 1; index < this.images.length + 1; index++) {
            this.pgnLi = document.createElement('div')
            this.pgnLi.innerHTML = index
            this.pgn.append(this.pgnLi)
        }
    }
    updatePagination() {
        this.pgnChildren = Array.from(this.pgn.children)
        this.pgnNumber = this.pgnChildren[0].getBoundingClientRect().height
    }
    paginationForward(){
        this.pgn.style.transform = `translate3d(0, ${this.pgnHeight}px, 0)`
    }
    paginationBackward(){
        this.pgn.style.transform = `translate3d(0, ${this.pgnHeight}px, 0)`
    }
    arrowNavigation(){
        window.onkeydown = event => {
            if (event.code === 'ArrowLeft') {
                this.prev()
            } else if(event.code === "ArrowRight") {
                this.next()
            }
        }
    }
    mouseClickNavigation() {
        this.winMidWith = window.innerWidth / 2
        window.onmousemove = (e) => {
            this.mouseX = e.clientX
            window.onclick = () => {
                this.mouseX >= this.winMidWith ? this.next() : this.prev()
            }
        }
    }
    turnOnOpacity(){
        this.mask[0].style.transition = 'opacity 1000ms'
        this.mask[0].style.opacity = 1
    }
}
function createSlider() {
    fetch('d.json')
    .then(req => req.json())
    .then(data => {
        const slider = new Slider(data)
        setTimeout(() => {
            slider.turnOnOpacity()
        }, 300);
    })
}
createSlider()

