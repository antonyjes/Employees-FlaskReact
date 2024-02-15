import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import ModalCompany from "../ModalCompany"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCompanies } from "@/state";


export const CellAction = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const [showModal, setShowModal] = useState(false);
    const userId = useSelector((state) => state.user.id)

    const getCompanies = async () => {
        const response = await fetch(`http://127.0.0.1:3000/companies/${userId}`, {
            method: "GET",
            headers: {Authorization: `${token}`},
        });

        const data = await response.json();
        dispatch(setCompanies({companies: data}))
    }

    useEffect(() => {
        getCompanies()
    }, [])

    return(
        <>
            <ModalCompany showModal={showModal} setShowModal={setShowModal} operation="Edit" currentCompany={data} getCompanies={getCompanies} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {setShowModal(true)}}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>  
            </DropdownMenu>
        </>
    )
}