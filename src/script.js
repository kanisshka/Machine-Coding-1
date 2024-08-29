(async function () {
  try {
    const data = await fetch("./src/data.json");
    const res = await data.json();
    console.log(res);

    let employees = res;
    let selectEmployeeId = employees[0].id;
    let selectEmployee = employees[0];

    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(
      ".employees__single--information"
    );

    //add Employee Logic
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");

    createEmployee.addEventListener("click",()=>{
        console.log("first")
        addEmployeeModal.style.display = "flex";
    })
    // Select Employee Logic
    addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.className === "addEmployee") {
          addEmployeeModal.style.display = "none";
        }
      });
    employeeList.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN" && selectEmployeeId !== e.target.id) {
        selectEmployeeId = e.target.id;

        renderEmployees();

        //render single employee
        renderSingleEmployee();
      }
    });
    const renderEmployees = () => {
      employeeList.innerHTML = "";
      employees.forEach((emp) => {
        const employee = document.createElement("span");
        employee.classList.add("employees__names--item");

        if (parseInt(selectEmployeeId, 10) === emp.id) {
          employee.classList.add("selected");
          selectEmployee = emp;
        }

        employee.setAttribute("id", emp.id);
        employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>`;

        employeeList.append(employee);
      });
    };
    //Render Single Employee
    const renderSingleEmployee = () => {
      // deleting employee

      employeeInfo.innerHTML = `<img src="${selectEmployee.imageUrl}" />
      <span class="employees__single--heading">
      ${selectEmployee.firstName} ${selectEmployee.lastName} (${selectEmployee.age})
      </span>
      <span>${selectEmployee.address}</span>
      <span>${selectEmployee.email}</span>
      <span>Mobile - ${selectEmployee.contactNumber}</span>
      <span>DOB - ${selectEmployee.dob}</span>`;
    };

    renderEmployees();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
