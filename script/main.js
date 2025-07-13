console.log("JS loaded");

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("employeeList");

  // Default JSON data
  const defaultEmployees = [
    {
      "id": 1,
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice@example.com",
      "department": "HR",
      "role": "Manager"
    },
    {
      "id": 2,
      "firstName": "Bob",
      "lastName": "Smith",
      "email": "bob@example.com",
      "department": "Engineering",
      "role": "Developer"
    }
  ];

  // Load localStorage employees
  const stored = JSON.parse(localStorage.getItem("newEmployees")) || [];

  // Merge default + local storage data
  const employees = [...defaultEmployees, ...stored];

  employees.forEach((emp) => {
    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button class="edit-btn" data-id="${emp.id}">Edit</button>
      <button class="delete-btn" data-id="${emp.id}">Delete</button>
    `;
    listContainer.appendChild(div);
  });

  // Edit employee
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      localStorage.setItem("editEmployeeId", id);
      window.location.href = "/form.html";
    })
  );

  // Delete employee
  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      const card = e.target.closest(".employee-card");

      // Delete only from localStorage, default data remains
      const updated = stored.filter((emp) => emp.id !== id);

      if (stored.length !== updated.length) {
        localStorage.setItem("newEmployees", JSON.stringify(updated));
        alert("Deleted!");
        window.location.reload();
      } else {
        if (card) card.remove();
        alert("Removed (default data, not permanent)");
      }
    })
  );

  // Populate filter dropdowns
  extractUniqueFields();

  // Filter toggle
  document.getElementById("filterToggle")?.addEventListener("click", () => {
    const sidebar = document.getElementById("filterSidebar");
    sidebar.classList.toggle("visible");
  });

  // Filter apply
  document.getElementById("applyFilters")?.addEventListener("click", filterEmployees);

  // Clear filters
  document.getElementById("clearFilters")?.addEventListener("click", () => {
    document.getElementById("searchBar").value = "";
    document.getElementById("firstNameFilter").value = "";
    document.getElementById("departmentFilter").value = "";
    document.getElementById("roleFilter").value = "";
    filterEmployees();
  });

  // Search input filter
  document.getElementById("searchBar")?.addEventListener("input", filterEmployees);

  // === Filter logic ===
  function extractUniqueFields() {
    const allCards = document.querySelectorAll(".employee-card");
    const departments = new Set();
    const roles = new Set();

    allCards.forEach((card) => {
      const dept = card.querySelector("p:nth-child(4)")?.textContent.split(": ")[1];
      const role = card.querySelector("p:nth-child(5)")?.textContent.split(": ")[1];
      if (dept) departments.add(dept);
      if (role) roles.add(role);
    });

    const deptFilter = document.getElementById("departmentFilter");
    const roleFilter = document.getElementById("roleFilter");

    departments.forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      deptFilter.appendChild(opt);
    });

    roles.forEach((r) => {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      roleFilter.appendChild(opt);
    });
  }

  function filterEmployees() {
    const search = document.getElementById("searchBar").value.toLowerCase();
    const fname = document.getElementById("firstNameFilter").value.toLowerCase();
    const dept = document.getElementById("departmentFilter").value;
    const role = document.getElementById("roleFilter").value;

    document.querySelectorAll(".employee-card").forEach((card) => {
      const text = card.innerText.toLowerCase();
      const first = card.querySelector("p:nth-child(2)")?.textContent.toLowerCase() || "";
      const department = card.querySelector("p:nth-child(4)")?.textContent || "";
      const roleText = card.querySelector("p:nth-child(5)")?.textContent || "";

      const matchSearch = text.includes(search);
      const matchFirst = fname === "" || first.includes(fname);
      const matchDept = dept === "" || department.includes(dept);
      const matchRole = role === "" || roleText.includes(role);

      card.style.display = matchSearch && matchFirst && matchDept && matchRole ? "block" : "none";
    });
  }
});
