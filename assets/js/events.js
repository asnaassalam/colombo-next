document.addEventListener('DOMContentLoaded', function () {
      const tooltip = document.getElementById('tooltip');
      const eventData = [
        { title: 'Urban Greening Workshop', date: '2025-06-20' },
        { title: 'SICET 2025 Conference', date: '2025-07-25' },
        { title: 'Flood Simulation Drill', date: '2025-07-29' },
        { title: 'KCD Sri Lanka 2025', date: '2025-10-26' }
      ];

      const highlightDates = eventData.map(event => event.date);

      const calendarEl = document.getElementById('calendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [],

        dayCellDidMount: function (arg) {
          const dateStr = arg.date.getFullYear() + '-' +
            String(arg.date.getMonth() + 1).padStart(2, '0') + '-' +
            String(arg.date.getDate()).padStart(2, '0');
          const match = eventData.find(e => e.date === dateStr);

          if (match) {
            arg.el.style.backgroundColor = '#00abe4';
            arg.el.style.cursor = 'pointer';
            arg.el.setAttribute('data-title', match.title);

            arg.el.addEventListener('mouseenter', function (e) {
              tooltip.innerText = match.title;
              tooltip.style.display = 'block';
            });

            arg.el.addEventListener('mousemove', function (e) {
              let tooltipWidth = tooltip.offsetWidth;
              let tooltipHeight = tooltip.offsetHeight;
              let x = e.clientX - tooltipWidth / 2;
              let y = e.clientY + 30;
              
              if (x + tooltipWidth > window.innerWidth) {
                x = window.innerWidth - tooltipWidth - 10;
              }
              
              if (x < 0) {
                x = 10;
              }
              
              if (y + tooltipHeight > window.innerHeight) {
                y = e.clientY - tooltipHeight - 12;
              }
              tooltip.style.left = x + 'px';
              tooltip.style.top = y + 'px';
            });

            arg.el.addEventListener('mouseleave', function () {
              tooltip.style.display = 'none';
            });
          }
        }
      });

      calendar.render();
    });

function toggleMenu() {
  document.getElementById("navbar").classList.toggle("active");
}