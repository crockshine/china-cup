import { makeAutoObservable } from 'mobx'

class ModalWindow {
    isOpen = false

    constructor() {
        makeAutoObservable(this)
    }

    openWindow = () => { // Используем стрелочную функцию
        this.isOpen = true; // Теперь this будет указывать на экземпляр класса
    }
    closeWindow = ()=> {
        this.isOpen = false
    }


}

export default new ModalWindow()