const feedbackForm = Vue.createApp({
  data() {
    return {
      name: "",
      problem: "",
      solution: "",
      feedbacks: [
        {
          id: 1,
          name: "Sahan Jayasuriya",
          problem: "General Suggestion",
          solution:
            "Install more public benches and shaded areas in parks for elderly citizens.",
          date: "2024-06-01",
        },
        {
          id: 2,
          name: "Ruwan Perera",
          problem: "Traffic & Congestion",
          solution:
            "Implement synchronized traffic lights and dedicated bus lanes to reduce peak hour congestion.",
          date: "2024-06-02",
        },
        {
          id: 3,
          name: "Nimali Fernando",
          problem: "Waste Management",
          solution:
            "Introduce a city-wide composting program and more recycling bins in residential areas.",
          date: "2024-06-03",
        },
        {
          id: 4,
          name: "Asna Assalam",
          problem: "Urban Flood",
          solution:
            "Deploy IoT-based water level sensors in flood-prone neighborhoods for early warning alerts.",
          date: "2024-06-04",
        },
      ],
      likedFeedbacks: {},
      problemOptions: [
        { label: "General Suggestion", value: "general" },
        { label: "Traffic & Congestion", value: "traffic" },
        { label: "Waste Management", value: "waste" },
        { label: "Urban Flood", value: "flood" },
        { label: "Energy Inefficiency", value: "energy" },
      ],
      nextId: 5,
      submitted: false,
      message: "",
      messageType: "",
    };
  },
  methods: {
    addFeedback() {
      if (this.name && this.problem && this.solution) {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        this.feedbacks.push({
          id: this.nextId++,
          name: this.name,
          problem: this.problem,
          solution: this.solution,
          date: formattedDate,
        });
        this.name = "";
        this.problem = "";
        this.solution = "";
        this.submitted = true;
        this.message = "Feedback submitted successfully!";
        this.messageType = "success";
        setTimeout(() => {
          this.submitted = false;
          this.message = "";
        }, 3000);
      } else {
        this.message = "Please fill in all fields.";
        this.messageType = "error";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
    toggleLike(id) {
      this.likedFeedbacks[id] = !this.likedFeedbacks[id];
    },
    clearMessage() {
      this.message = "";
      this.submitted = false;
    },
    getProblemIcon(problem) {
      switch (problem) {
        case "Traffic & Congestion":
          return "fas fa-traffic-light";
        case "Waste Management":
          return "fas fa-trash";
        case "Urban Flood":
          return "fas fa-water";
        case "Energy Inefficiency":
          return "fas fa-bolt";
        case "General Suggestion":
          return "fas fa-lightbulb";
      }
    },
  },
});
feedbackForm.mount("#feedback-group");

function toggleMenu() {
  document.getElementById("navbar").classList.toggle("active");
}
