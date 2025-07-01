const ctx = document.getElementById("trafficChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["6–8 AM", "8–10 AM", "12–2 PM", "5–7 PM", "7–9 PM"],
    datasets: [
      {
        label: "Avg Delay (mins)",
        data: [26, 30, 35, 40, 30],
        backgroundColor: "#b3e0fc",
        borderRadius: 6
      },
    ],
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Traffic Delay by Time Slot",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Delay (minutes)",
        },
      },
    },
  },
});

const ctxWaste = document.getElementById("wasteChart").getContext("2d");
new Chart(ctxWaste, {
  type: "pie",
  data: {
    labels: ["Plastic", "Organic", "Paper", "Other"],
    datasets: [
      {
        data: [4, 65, 30, 1],
        backgroundColor: ["#0077b6", "#00abe4", "#48cae4", "#90e0ef"],
      },
    ],
  },
  options: {
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Waste Composition (%)" },
    },
  },
});

const energyCtx = document.getElementById("energyChart").getContext("2d");
new Chart(energyCtx, {
  type: "line",
  data: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Avg Monthly Bill (LKR)",
        data: [4000, 4400, 4800, 5200, 5500, 5800],
        borderColor: "#0077b6",
        tension: 0.4,
        fill: false,
      },
    ],
  },
});

document.querySelectorAll(".count").forEach((counter) => {
  const target = +counter.dataset.target;
  const updateCount = () => {
    const current = +counter.innerText.replace(/,/g, "");

    const increment = Math.ceil(target / 200);
    if (current < target) {
      counter.innerText = Math.min(
        current + increment,
        target
      ).toLocaleString();
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };
  updateCount();
});

function toggleMenu() {
  document.getElementById("navbar").classList.toggle("active");
}
