<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Employee Directory</title>
  <link rel="stylesheet" href="/styles/style.css"/>
</head>
<body>
  <h1>Employee Directory</h1>

  <!-- Top bar: Add + Search + Filter -->
  <div class="search-bar-container">
    <input type="text" id="searchBar" placeholder="Search by name or email" />
    <button id="filterToggle" class="filter-btn">⚙️ Filters</button>
    <a href="/form.html" class="add-button">➕ Add Employee</a>
  </div>


<!-- 🔲 Sidebar Filter Panel -->
<div id="filterSidebar" class="filter-sidebar">
  <h3>Filter Employees</h3>

  <label for="firstNameFilter">First Name:</label>
  <input type="text" id="firstNameFilter" placeholder="" />

  <label for="departmentFilter">Department:</label>
  <select id="departmentFilter">
    <option value="">All Departments</option>
  </select>

  <label for="roleFilter">Role:</label>
  <select id="roleFilter">
    <option value="">All Roles</option>
  </select>

  <label for="pageSize">Results Per Page:</label>
  <select id="pageSize">
    <option>10</option>
    <option>25</option>
    <option>50</option>
    <option>100</option>
  </select>

  <button id="applyFilters">Apply</button>
  <button id="clearFilters" class="clear-btn">Clear</button>
</div>
  <!-- Employee Cards -->
  <div id="employeeList">
    <#list employees as emp>
      <div class="employee-card">
        <p><strong>ID:</strong> ${emp.id}</p>
        <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
        <p><strong>Email:</strong> ${emp.email}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <p><strong>Role:</strong> ${emp.role}</p>
        <button class="edit-btn" data-id="${emp.id}">Edit</button>
        <button class="delete-btn" data-id="${emp.id}">Delete</button>
      </div>
    </#list>
  </div>

  <script src="/scripts/main.js"></script>
</body>
</html>
