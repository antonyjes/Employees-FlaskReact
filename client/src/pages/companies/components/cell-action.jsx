import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import ModalCompany from "../ModalCompany";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "@/state";
import { AlertModal } from "@/components/alert-modal";
import { toast } from "react-toastify";

export const CellAction = ({ data }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const userId = useSelector((state) => state.user.id);

  const getCompanies = async () => {
    const response = await fetch(`http://127.0.0.1:3000/companies/${userId}`, {
      method: "GET",
      headers: { Authorization: `${token}` },
    });

    const data = await response.json();
    dispatch(setCompanies({ companies: data }));
  };

  const onDelete = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/companies/${data.id}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    setShowAlert(false)
    toast.success("Company deleted!");
    getCompanies();
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <ModalCompany
        showModal={showModal}
        setShowModal={setShowModal}
        operation="Edit"
        currentCompany={data}
        getCompanies={getCompanies}
      />
      <AlertModal
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        onConfirm={() => onDelete(data.id)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setShowAlert(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
