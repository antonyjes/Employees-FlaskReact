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
                <img className="w-[6rem] h-[6rem] p-2 object-cover rounded-full" src={`http://127.0.0.1:3000/assets/${row.original.image}`} />
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