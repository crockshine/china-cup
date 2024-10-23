import { makeAutoObservable } from 'mobx'

class AdminTasks {

    //тут надо входящие прнимать
    incomingTasks = [
        {id: 1, from:'Путин', time: new Date()},
        {id: 2, from:'Зеленский', time: new Date()}
    ]
    sentTasks = []

    constructor() {
        makeAutoObservable(this)
    }

    getIncomingTasks (){
        //сначала this.incomingTasks = запрос, в качестве параметра можно ссылку подставить или ничего и сразу ссылку в запросе
        return this.incomingTasks
    }
    getSentTasks(){
        //отправленные типа. тож из бдшки берем
        return this.sentTasks

    }
    takeToSent(arrOfTask, id){
        //тут отправленные в бдшку надо запихнуть и удалить входящие из бдшки по айдишнику
       arrOfTask.forEach(item=>{
            if (item.id === id) this.sentTasks.push(item)
        })

        this.incomingTasks = arrOfTask.filter(item => item.id !== id)

    }



}

export default new AdminTasks()