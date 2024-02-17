import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "age",
        header: "Age"
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({row}) => (
            <div className="flex items-center">
                <img className="w-6 h-6 p-2" src={`http://localhost:3000/assets/employees/${row.original.image}`} />
            </div>
        )
    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({row}) => row.original.companyName
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />
    }
]