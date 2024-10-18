import { makeAutoObservable } from 'mobx'

class ModalWindow {
    isOpenSecond = false

    constructor() {
        makeAutoObservable(this)
    }


    switchWindow = () =>{
        this.isOpenSecond = !this.isOpenSecond;
        console.log(this.isOpenSecond);

    }



}

export default new ModalWindow()