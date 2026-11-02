document.addEventListener("DOMContentLoaded", function () {
  // Sidebar Mobile Toggle Handling
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  function toggleSidebar() {
    sidebar.classList.toggle("show");
    sidebarOverlay.classList.toggle("show");
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", toggleSidebar);
  }

  // Menu Item Selection Highlighting
  const navLinks = document.querySelectorAll(".nav-link-custom");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // On mobile, close sidebar when clicking an item
      if (window.innerWidth < 992) {
        toggleSidebar();
      }
    });
  });

  // // Logout Button Click Interaction
  // const logoutBtn = document.getElementById("logoutBtn");
  // logoutBtn.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   if (confirm("Deseja realmente sair do sistema?")) {
  //     alert("Sessão encerrada com sucesso.");
  //   }
  // });

  // Logout Button Click Interaction
// const logoutBtn = document.getElementById("logoutBtn");

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", function (e) {
//     e.preventDefault(); // Impede o navegador de ir direto para o link

//     if (confirm("Deseja realmente sair do sistema?")) {
//       // Pega o link que já está no href do botão (gerado pelo Django)
//       window.location.href = this.href; 
//     }
//   });
// }

  // Initialize Sample Chart.js Graphic
  const ctx = document.getElementById("billingChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
      datasets: [
        {
          label: "Faturamento (R$ mil)",
          data: [65, 72, 68, 80, 78, 84.5],
          borderColor: "#0ea5e9",
          backgroundColor: "rgba(14, 165, 233, 0.1)",
          fill: true,
          tension: 0.35,
          borderWidth: 3,
        },
        {
          label: "Atendimentos",
          data: [420, 450, 410, 510, 490, 530],
          borderColor: "#2563eb",
          backgroundColor: "transparent",
          tension: 0.35,
          borderWidth: 2,
          borderDash: [5, 5],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          grid: {
            color: "#f1f5f9",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
});
