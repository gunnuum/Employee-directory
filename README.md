# Employee Directory

A simple web-based employee directory using Java, Spark, Freemarker, and vanilla JavaScript.

## Features

- List employees with search, filter, and pagination
- Add, edit, and delete employees (client-side via localStorage)
- Server-side rendering with Freemarker templates
- Responsive UI with modern CSS

## Project Structure

- `freemarker-backend/`
  - `src/main/java/Main.java` - Main backend server
  - `data/employees.json` - Initial employee data
  - `templates/employee-list.ftl` - Freemarker template for employee list
  - `public/` - Static frontend assets
    - `form.html` - Add/Edit employee form
    - `scripts/` - JavaScript files
    - `styles/` - CSS files

## Getting Started

### Prerequisites

- Java 8+
- Maven

### Build & Run

1. Navigate to `freemarker-backend` directory:

    ```sh
    cd freemarker-backend
    ```

2. Build the project:

    ```sh
    mvn clean package
    ```

3. Run the server:

    ```sh
    mvn exec:java
    ```

4. Open [http://localhost:4567/](http://localhost:4567/) in your browser.

## Usage

- **Dashboard:** View all employees, search, and filter.
- **Add/Edit:** Click "Add Employee" or "Edit" to open the form.
- **Delete:** Remove employees (localStorage only).

## Notes

- New/edited employees are stored in browser localStorage and not persisted server-side.
- Initial data is loaded from `data/employees.json`.

## Dependencies

- [Spark Java](https://sparkjava.com/)
- [Freemarker](https://freemarker.apache.org/)
- [Jackson Databind](https://github.com/FasterXML/jackson)

## License

MIT