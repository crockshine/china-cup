import { makeAutoObservable } from 'mobx'

class ModalReject {
    isOpen = false
    id = null

    constructor() {
        makeAutoObservable(this)
    }

    setTaskId = (id) => {
        this.id = id
    }
    openWindow = () => {
        this.isOpen = true;
    }
    closeWindow = ()=> {
        this.isOpen = false

    }


}

export default new ModalReject()