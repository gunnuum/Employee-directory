document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");
  const editId = localStorage.getItem("editEmployeeId");

  if (editId) {
    const stored = JSON.parse(localStorage.getItem("newEmployees")) || [];
    const emp = stored.find((e) => e.id == editId);
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
      role: document.getElementById("role").value,
    };

    let stored = JSON.parse(localStorage.getItem("newEmployees")) || [];

    if (editId) {
      stored = stored.map((e) => (e.id == editId ? newEmp : e));
    } else {
      stored.push(newEmp);
    }

    localStorage.setItem("newEmployees", JSON.stringify(stored));
    localStorage.removeItem("editEmployeeId");

    alert("Saved!");
    window.location.href = "/";
  });
});
