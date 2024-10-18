import "./Schedule.css"
import {useEffect} from "react";

export default function Schedule(){
  var Cal = function(divId) {
    //Сохраняем идентификатор div
    this.divId = divId;
    // Дни недели с понедельника
    this.DaysOfWeek = [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
    ];
    // Months starting from January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    //Устанавливаем текущий месяц, год
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
  };
  // Переход к следующему месяцу
  Cal.prototype.nextMonth = function() {
    if ( this.currMonth == 11 ) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    }
    else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
  };
  // Переход к предыдущему месяцу
  Cal.prototype.previousMonth = function() {
    if ( this.currMonth == 0 ) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    }
    else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  };
  // Показать текущий месяц
  Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
  };
  // Показать месяц (год, месяц)
  Cal.prototype.showMonth = function(y, m) {
    var d = new Date()
    // Первый день недели в выбранном месяце 
    , firstDayOfMonth = new Date(y, m, 7).getDay()
    // Последний день выбранного месяца
    , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
    // Последний день предыдущего месяца
    , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table>';
    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    // заголовок дней недели
    html += '<tr class="days">';
    for(var i=0; i < this.DaysOfWeek.length;i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    // Записываем дни
    var i=1;
    do {
      var dow = new Date(y, m, i).getDay();
      // Начать новую строку в понедельник
      if ( dow == 1 ) {
        html += '<tr>';
      }
      // Если первый день недели не понедельник показать последние дни предыдущего месяца
      else if ( i == 1 ) {
        html += '<tr>';
        var k = lastDayOfLastMonth - firstDayOfMonth+1;
        for(var j=0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
      // Записываем текущий день в цикл
      var chk = new Date();
      var chkY = chk.getFullYear();
      var chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        html += '<td class="today">' + i + '</td>';
      } else {
        html += '<td class="normal">' + i + '</td>';
      }
      // закрыть строку в воскресенье
      if ( dow == 0 ) {
        html += '</tr>';
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if ( i == lastDateOfMonth ) {
        var k=1;
        for(dow; dow < 7; dow++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
      i++;
    }while(i <= lastDateOfMonth);
    // Конец таблицы
    html += '</table>';
    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
  };


  useEffect(()=>{
    var c = new Cal("divCal");
    c.showcurr();
    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };
  })
  // При загрузке окна

  // Получить элемент по id
  function getId(id) {
    return document.getElementById(id);
  }
  return(
    <main className="main_window">
      <div className="schedule">
      <button  className="button_schedule" id="btnPrev" type="button">Предыдущий</button>
      <button className="button_schedule" id="btnNext" type="button">Следующий</button>
        <div id="divCal" className="main_schedule">
        </div>
        </div>
        <div className="alert_window"></div>
    </main>
  )
}