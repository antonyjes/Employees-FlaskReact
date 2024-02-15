import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const ModalCompany = ({
  showModal,
  setShowModal,
  operation,
  currentCompany,
  getCompanies,
}) => {
  const [name, setName] = useState(currentCompany.name || "");
  const token = useSelector((state) => state.token);

  const createCompany = async () => {
    const savedCompanyResponse = await fetch(
      "http://127.0.0.1/companies/create",
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      }
    );

    const savedCompany = await savedCompanyResponse.json();

    if (savedCompany) {
      setShowModal(false);
      toast.success("Company created!");
      getCompanies();
    }
  };

  const editCompany = async () => {
    const editCompanyResponse = await fetch(
      `http://127.0.0.1/companies/${currentCompany.id}/edit`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      }
    );

    const updatedCompany = await editCompanyResponse.json();

    if (updatedCompany) {
      setShowModal(false);
      toast.success("Company updated!");
      getCompanies();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operation === "Create") await createCompany();
    if (operation === "Edit") await editCompany();
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
              <div className="grip gap-2">
                <div className="grid gap-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="name@example.com"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCompany;
