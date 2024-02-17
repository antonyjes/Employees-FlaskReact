import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCompanies } from "@/state";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Dropzone from "react-dropzone";

const ModalEmployee = ({
  showModal,
  setShowModal,
  operation,
  currentEmployee,
  getEmployees,
}) => {
  const [firstName, setFirstName] = useState(currentEmployee.firstName || "");
  const [lastName, setLastName] = useState(currentEmployee.lastName || "");
  const [age, setAge] = useState(currentEmployee.age || 0);
  const [companyId, setCompanyId] = useState(currentEmployee.companyId || "");
  const [fileValue, setFileValue] = useState("");
  const [filename, setFilename] = useState(currentEmployee.image || "");
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user.id);
  const companies = useSelector((state) => state.companies);
  const dispatch = useDispatch();

  const handleImageChange = (files) => {
    setFileValue(files[0]);
    setFilename(files[0].name);
  };

  const getCompanies = async () => {
    const response = await fetch(`http://127.0.0.1:3000/companies/${userId}`, {
      method: "GET",
      headers: { Authorization: `${token}` },
    });

    const data = await response.json();
    dispatch(setCompanies({ companies: data }));
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const createEmployee = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("age", age);
    formData.append("companyId", companyId);
    formData.append("imageReal", fileValue);
    formData.append("image", fileValue.name);

    const savedEmployeeResponse = await fetch(
      "http://127.0.0.1:3000/employees/create",
      {
        method: "POST",
        headers: { Authorization: `${token}` },
        body: formData,
      }
    );

    const savedEmployee = await savedEmployeeResponse.json();

    if (savedEmployee) {
      setShowModal(false);
      toast.success("Employee created!");
      getEmployees();
    }
  };

  const editEmployee = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("age", age);
    formData.append("companyId", companyId);
    formData.append("imageReal", fileValue);
    formData.append("image", filename);

    const updatedEmployeeResponse = await fetch(
      `http://127.0.0.1:3000/employees/${currentEmployee.id}/edit`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      }
    );

    const updatedEmployee = await updatedEmployeeResponse.json();

    if (updatedEmployee) {
      setShowModal(false);
      toast.success("Employee updated!");
      getEmployees();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operation === "Create") await createEmployee();
    if (operation === "Edit") await editEmployee();
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{operation}</DialogTitle>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2 grid-cols-2 mb-4">
                <div className="grid gap-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
              </div>
              <div className="grid gap-2 grid-cols-2 mb-4">
                <div className="grid gap-1">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                  />
                </div>
                <div className="grid gap-1">
                  <Label>Company</Label>
                  <select value={companyId} onChange={(e) => setCompanyId(e.target.value)} className="h-10 rounded-md border border-input text-sm">
                      <option value="">Select a company:</option>
                      {
                        companies.map((company) => (
                          <option key={company.id} value={company.id}>{company.name}</option>
                        ))
                      }
                  </select>
                </div>
              </div>
              <div className="grid gap-1">
                <Label>Image</Label>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="flex items-center justify-center w-full"
                    >
                      <input
                        {...getInputProps()}
                        type="file"
                        className="hidden"
                      />
                      <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          {filename === "" ? (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                          ) : (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              {filename}
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEmployee;
