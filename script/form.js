document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");

  // Check if edit mode
  const editId = localStorage.getItem("editEmployeeId");
  let employees = JSON.parse(localStorage.getItem("newEmployees")) || [];

  if (editId) {
    const emp = employees.find(e => e.id == editId);
    if (emp) {
      document.getElementById("firstName").value = emp.firstName;
      document.getElementById("lastName").value = emp.lastName;
      document.getElementById("email").value = emp.email;
      document.getElementById("department").value = emp.department;
      document.getElementById("role").value = emp.role;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEmp = {
      id: editId ? Number(editId) : Date.now(),
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      department: document.getElementById("department").value,
      role: document.getElementById("role").value
    };

    if (editId) {
      // Update existing
      employees = employees.map(emp => emp.id == editId ? newEmp : emp);
      localStorage.removeItem("editEmployeeId");
    } else {
      // Add new
      employees.push(newEmp);
    }

    localStorage.setItem("newEmployees", JSON.stringify(employees));

    // Redirect to index.html
    window.location.href = "/index.html";
  });
});
