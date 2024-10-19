import "./Schedule.css"
import Event_schedule from "./Schedule_Event";
import {useEffect} from "react";

export default function Schedule() {
  var Cal = function(divId) {
    this.divId = divId;
    this.DaysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
  };

  Cal.prototype.nextMonth = function() {
    if (this.currMonth == 11) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    } else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
  };

  Cal.prototype.previousMonth = function() {
    if (this.currMonth == 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  };

  Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
  };

  Cal.prototype.showMonth = function(y, m) {
    var d = new Date(),
      firstDayOfMonth = new Date(y, m, 7).getDay(),
      lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
      lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    var html = '<table>';
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    var i = 1;
    do {
      var dow = new Date(y, m, i).getDay();
      if (dow == 1) {
        html += '<tr>';
      } else if (i == 1) {
        html += '<tr>';
        var k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for (var j = 0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }

      var chk = new Date();
      var chkY = chk.getFullYear();
      var chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        html += '<td class="today" data-day="' + i + '">' + i + '</td>';
      } else {
        html += '<td class="normal" data-day="' + i + '">' + i + '</td>';
      }

      if (dow == 0) {
        html += '</tr>';
      } else if (i == lastDateOfMonth) {
        var k = 1;
        for (dow; dow < 7; dow++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
      i++;
    } while (i <= lastDateOfMonth);
    html += '</table>';
    document.getElementById(this.divId).innerHTML = html;


    var days = document.querySelectorAll(`#${this.divId} td[data-day]`);
    days.forEach(day => {
      day.addEventListener('click', function() {
        var selectedDay = parseInt(this.getAttribute('data-day'));
        if (selectedDay === 19) {
          document.querySelector('.october17').style.display = 'none';
          document.querySelector('.october18').style.display = 'none';
          document.querySelector('.october19').style.display = 'block';
          document.querySelector('.october16').style.display = 'none';
          document.querySelector('.october20').style.display = 'none';
          document.querySelector('.october21').style.display = 'none';
          document.querySelector('.october27').style.display = 'none';
        } else if (selectedDay === 18) {
          document.querySelector('.october17').style.display = 'none';
          document.querySelector('.october18').style.display = 'block';
          document.querySelector('.october19').style.display = 'none';
          document.querySelector('.october27').style.display = 'none';
        } else if (selectedDay === 17) {
          document.querySelector('.october18').style.display = 'none';
          document.querySelector('.october19').style.display = 'none';
          document.querySelector('.october17').style.display = 'block';
          document.querySelector('.october27').style.display = 'none';
        } else if (selectedDay === 15) {
          document.querySelector('.october15').style.display = 'block';
          document.querySelector('.october16').style.display = 'none';
          document.querySelector('.october17').style.display = 'none';
          document.querySelector('.october18').style.display = 'none';
          document.querySelector('.october19').style.display = 'none';
          document.querySelector('.october20').style.display = 'none';
          document.querySelector('.october21').style.display = 'none';
          document.querySelector('.october27').style.display = 'none';
        } else if (selectedDay === 16) {
          document.querySelector('.october15').style.display = 'none';
          document.querySelector('.october16').style.display = 'block';
          document.querySelector('.october17').style.display = 'none';
          document.querySelector('.october18').style.display = 'none';
          document.querySelector('.october19').style.display = 'none';
          document.querySelector('.october20').style.display = 'none';
          document.querySelector('.october21').style.display = 'none';
          document.querySelector('.october27').style.display = 'none';
        } else if (selectedDay === 20) {
          document.querySelector('.october15').style.display = 'none';
          document.querySelector('.october16').style.display = 'none';
          document.querySelector('.october17').style.display = 'none';
          document.querySelector('.october18').style.display = 'none';
          document.querySelector('.october19').style.display = 'none';
          document.querySelector('.october20').style.display = 'block';
          document.querySelector('.october21').style.display = 'none';
          document.querySelector('.october27').style.display = 'none';
        } else if (selectedDay === 21) {
          document.querySelector('.october15').style.display = 'none';
          document.querySelector('.october16').style.display = 'none';
          document.querySelector('.october17').style.display = 'none';
          document.querySelector('.october18').style.display = 'none';
          document.querySelector('.october19').style.display = 'none';
          document.querySelector('.october20').style.display = 'none';
          document.querySelector('.october21').style.display = 'block';
          document.querySelector('.october27').style.display = 'none';
        } else if (selectedDay === 27) {
          document.querySelector('.october18').style.display = 'none';
          document.querySelector('.october19').style.display = 'none';
          document.querySelector('.october17').style.display = 'none';

          document.querySelector('.october27').style.display = 'block';
        }        
      });
    });
  };

  useEffect(()=>{
    var c = new Cal("divCal");
    c.showcurr();
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };
  })

  function getId(id) {
    return document.getElementById(id);
  }

  return (
    <main className="main_window">
      <div className="schedule">
        <button className="button_schedule" id="btnPrev" type="button">Previous</button>
        <button className="button_schedule" id="btnNext" type="button">Next</button>
        <div id="divCal" className="main_schedule"></div>
      </div>
      <div className="alert_window">
        <header className="header_schedule">
          <div className="today">OCTOBER</div>
          <div className="add_section">+</div>
        </header>
        <main className="main_alert">
          <div className="october15" style={{ display: 'none' }}>
            <Event_schedule title={"Submit Project Proposal"} deadline_title={"10 AM - 11 AM"} />
            <Event_schedule title={"Team Stand-up Meeting"} deadline_title={"12 PM - 12:30 PM"} />
          </div>
          <div className="october16" style={{ display: 'none' }}>
            <Event_schedule title={"Design Review"} deadline_title={"2 PM - 3 PM"} />
            <Event_schedule title={"Write Documentation"} deadline_title={"4 PM - 5 PM"} />
          </div>
          <div className="october17" style={{ display: 'none' }}>
            <Event_schedule title={"Client Call"} deadline_title={"1 PM - 1:30 PM"} />
            <Event_schedule title={"Prepare Presentation"} deadline_title={"3 PM - 4 PM"} />
            <Event_schedule title={"Team Lunch"} deadline_title={"12 PM - 1 PM"} />
          </div>
          <div className="october18" style={{ display: 'none' }}>
            <Event_schedule title={"Code Review Session"} deadline_title={"10 AM - 11 AM"} />
            <Event_schedule title={"Update Project Board"} deadline_title={"2 PM - 3 PM"} />
          </div>
          <div className="october19">
            <Event_schedule title={"Sprint Planning"} deadline_title={"10 AM - 11:30 AM"} />
            <Event_schedule title={"Weekly Retrospective"} deadline_title={"1 PM - 2 PM"} />
          </div>
          <div className="october20" style={{ display: 'none' }}>
            <Event_schedule title={"Finish User Stories"} deadline_title={"9 AM - 12 PM"} />
            <Event_schedule title={"Lunch with Mentor"} deadline_title={"1 PM - 2 PM"} />
          </div>
          <div className="october21" style={{ display: 'none' }}>
            <Event_schedule title={"Meet with Stakeholders"} deadline_title={"11 AM - 12 PM"} />
            <Event_schedule title={"Plan Next Sprint"} deadline_title={"3 PM - 4 PM"} />
          </div>
          <div className="october27">
            <Event_schedule title={"Do HomeTasks"} deadline_title={"1 AM - 3:30 AM"} />
            <Event_schedule title={"Prepare for Conference"} deadline_title={"10 AM - 2 PM"} />
            <Event_schedule title={"Team Building Activity"} deadline_title={"5 PM - 7 PM"} />
          </div>
          <div className="october28" style={{ display: 'none' }}>
            <Event_schedule title={"Finalize Project Budget"} deadline_title={"10 AM - 11 AM"} />
            <Event_schedule title={"Review Team Goals"} deadline_title={"2 PM - 3 PM"} />
          </div>
        </main>
      </div>
    </main>
  );
}
