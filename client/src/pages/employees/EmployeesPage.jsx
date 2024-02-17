import { useDispatch, useSelector } from "react-redux";
import LayoutMain from "../main/LayoutMain";
import { EmployeeClient } from "./components/client";
import { setEmployees } from "@/state";
import { useEffect, useState } from "react";
import ModalEmployee from "./ModalEmployee";

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const token = useSelector((state) => state.token);
  const [showModal, setShowModal] = useState(false);
  const userId = useSelector((state) => state.user.id);

  const getEmployees = async () => {
    const response = await fetch(`http://127.0.0.1:3000/employees/${userId}`, {
      method: "GET",
      headers: { Authorization: `${token}` },
    });

    const data = await response.json();
    dispatch(setEmployees({ employees: data }));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <LayoutMain>
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <EmployeeClient data={employees} setShowModal={setShowModal} />
          </div>
        </div>
      </LayoutMain>
      {
        showModal && (
          <ModalEmployee
            showModal={showModal}
            setShowModal={setShowModal}
            operation="Create"
            currentEmployee={[]}
            getEmployees={getEmployees}
          />
        )
      }
    </>
  );
};

export default EmployeesPage;
