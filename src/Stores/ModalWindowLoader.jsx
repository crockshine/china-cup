import { makeAutoObservable } from 'mobx'

class ModalWindowLoader {
    isOpen = false

    constructor() {
        makeAutoObservable(this)
    }

    openWindow = () => { // Используем стрелочную функцию
        this.isOpen = true;
        console.log(this.isOpen);// Теперь this будет указывать на экземпляр класса
    }
    closeWindow = ()=> {
        this.isOpen = false
        console.log(this.isOpen);// Теперь this будет указывать на экземпляр класса

    }


}

export default new ModalWindowLoader()