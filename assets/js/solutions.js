function toggleMenu() {
  document.getElementById("navbar").classList.toggle("active");
}

Vue.createApp({
  data() {
    return {
      selectedArea: "Wellampitiya",
      rainfall: 0,
      areaRiskData: {
        Wellampitiya: { low: 30, moderate: 60, high: 100 },
        Maradana: { low: 60, moderate: 100, high: 140 },
        Pettah: { low: 50, moderate: 90, high: 130 },
        Borella: { low: 70, moderate: 110, high: 150 },
        "Colombo Fort": { low: 80, moderate: 120, high: 160 },
        Dematagoda: { low: 60, moderate: 100, high: 140 },
        Orugodawatta: { low: 55, moderate: 95, high: 135 },
        Kolonnawa: { low: 40, moderate: 80, high: 120 },
        Peliyagoda: { low: 50, moderate: 90, high: 130 },
        Kiribathgoda: { low: 45, moderate: 85, high: 125 },
        Kelaniya: { low: 50, moderate: 90, high: 130 },
        Nugegoda: { low: 60, moderate: 100, high: 140 },
        Rajagiriya: { low: 55, moderate: 95, high: 135 },
        Kotte: { low: 60, moderate: 100, high: 140 },
        Battaramulla: { low: 65, moderate: 105, high: 145 },
        Malabe: { low: 70, moderate: 110, high: 150 },
        Kaduwela: { low: 75, moderate: 115, high: 155 },
        Wellawatte: { low: 50, moderate: 90, high: 130 },
        Dehiwala: { low: 55, moderate: 95, high: 135 },
        "Mount Lavinia": { low: 60, moderate: 100, high: 140 },
        Ratmalana: { low: 65, moderate: 105, high: 145 },
        Moratuwa: { low: 70, moderate: 110, high: 150 },
        Bambalapitiya: { low: 50, moderate: 90, high: 130 },
        Angoda: { low: 60, moderate: 100, high: 140 },
        Wattala: { low: 55, moderate: 95, high: 135 },
        Mattakkuliya: { low: 50, moderate: 90, high: 130 },
        Grandpass: { low: 60, moderate: 100, high: 140 },
        "Havelock Town": { low: 55, moderate: 95, high: 135 },
        Kohuwala: { low: 60, moderate: 100, high: 140 },
        Boralesgamuwa: { low: 65, moderate: 105, high: 145 },
        Homagama: { low: 70, moderate: 110, high: 150 },
        Pannipitiya: { low: 65, moderate: 105, high: 145 },
        Maharagama: { low: 60, moderate: 100, high: 140 },
        Navinna: { low: 60, moderate: 100, high: 140 },
        Nawala: { low: 55, moderate: 95, high: 135 },
        Koswatta: { low: 60, moderate: 100, high: 140 },
      },
    };
  },
  computed: {
    riskLevel() {
      const thresholds = this.areaRiskData[this.selectedArea];
      if (this.rainfall < thresholds.low) return "Low";
      else if (this.rainfall < thresholds.moderate) return "Moderate";
      else if (this.rainfall < thresholds.high) return "High";
      else return "Severe";
    },
    riskColor() {
      switch (this.riskLevel) {
        case "Low":
          return "#28a745";
        case "Moderate":
          return "#ffc107";
        case "High":
          return "#fd7e14";
        case "Severe":
          return "#dc3545";
      }
    },
    waterStyle() {
      const height = (this.rainfall / 200) * 100;
      return {
        height: `${height}%`,
        backgroundColor: this.riskColor,
      };
    },
  },
}).mount("#floodSimulator");


const energyTracker = Vue.createApp({
  data() {
    return {
      appliance: "",
      wattage: "",
      hours: "",
      days: "",
      rate: 50,
      entries: [],
    };
  },
  computed: {
    totalKWh() {
      return this.entries.reduce((sum, e) => sum + e.kwh, 0);
    },
    perApplianceCosts() {
      let remaining = this.entries.map((e) => e.kwh);
      let costs = [];
      let slabLimits = [60, 30, 30, 60];
      let slabRates = [7.85, 10, 27.75, 32];
      let slabIdx = 0;
      let slabLeft = slabLimits[slabIdx];
      let used = 0;

      for (let i = 0; i < this.entries.length; i++) {
        let kwh = this.entries[i].kwh;
        let cost = 0;
        let kwhLeft = kwh;
        while (kwhLeft > 0 && slabIdx < slabLimits.length) {
          let take = Math.min(kwhLeft, slabLeft);
          cost += take * slabRates[slabIdx];
          kwhLeft -= take;
          slabLeft -= take;
          if (slabLeft === 0) {
            slabIdx++;
            slabLeft = slabLimits[slabIdx] || Infinity;
          }
        }
        if (kwhLeft > 0) cost += kwhLeft * 45;
        costs.push(cost);
      }
      return costs;
    },
    totalCost() {
      let kwh = this.totalKWh;
      let cost = 0;
      if (kwh <= 60) {
        cost = kwh * 7.85;
      } else if (kwh <= 90) {
        cost = 60 * 7.85 + (kwh - 60) * 10;
      } else if (kwh <= 120) {
        cost = 60 * 7.85 + 30 * 10 + (kwh - 90) * 27.75;
      } else if (kwh <= 180) {
        cost = 60 * 7.85 + 30 * 10 + 30 * 27.75 + (kwh - 120) * 32;
      } else {
        cost = 60 * 7.85 + 30 * 10 + 30 * 27.75 + 60 * 32 + (kwh - 180) * 45;
      }
      return cost + this.fixedCharge;
    },
    fixedCharge() {
      let kwh = this.totalKWh;
      if (kwh <= 60) return 0;
      if (kwh <= 90) return 90;
      if (kwh <= 180) return 480;
      return 0;
    },
  },
  mounted() {
    const saved = localStorage.getItem("energyEntries");
    if (saved) this.entries = JSON.parse(saved);
  },
  methods: {
    addEntry() {
      const kwh = (this.wattage * this.hours * this.days) / 1000;

      this.entries.push({
        appliance: this.appliance,
        kwh,
      });
      this.save();
      this.appliance = "";
      this.wattage = "";
      this.hours = "";
      this.days = "";
    },
    removeEntry(index) {
      this.entries.splice(index, 1);
      this.save();
    },
    save() {
      localStorage.setItem("energyEntries", JSON.stringify(this.entries));
    },
  },
});
energyTracker.mount("#energy-tracker");
