console.log("JS loaded ✅");

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("employeeList");
  const stored = JSON.parse(localStorage.getItem("newEmployees")) || [];

  // Render localStorage employees
  stored.forEach((emp) => {
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

  // Populate dropdowns from all cards
  function extractUniqueFields() {
    const allCards = document.querySelectorAll(".employee-card");
    const departments = new Set();
    const roles = new Set();

    allCards.forEach((card) => {
      const dept = card.querySelector("p:nth-child(4)")?.textContent?.split(": ")[1];
      const role = card.querySelector("p:nth-child(5)")?.textContent?.split(": ")[1];
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

  extractUniqueFields();

  // Edit/Delete
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      localStorage.setItem("editEmployeeId", id);
      window.location.href = "/form.html";
    })
  );

  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      const card = e.target.closest(".employee-card");
      const updated = stored.filter((emp) => emp.id !== id);

      if (stored.length !== updated.length) {
        localStorage.setItem("newEmployees", JSON.stringify(updated));
        alert("Deleted!");
        window.location.reload();
      } else {
        if (card) card.remove();
        alert("Removed (not permanent)");
      }
    })
  );

  // Toggle filter panel
  document.getElementById("filterToggle").addEventListener("click", () => {
    document.getElementById("filterPanel").classList.toggle("hidden");
  });

  // Apply and clear filter buttons
  document.getElementById("applyFilters").addEventListener("click", filterEmployees);
  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("searchBar").value = "";
    document.getElementById("firstNameFilter").value = "";
    document.getElementById("departmentFilter").value = "";
    document.getElementById("roleFilter").value = "";
    filterEmployees();
  });

  // Filter logic
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

  document.getElementById("searchBar").addEventListener("input", filterEmployees);
});
