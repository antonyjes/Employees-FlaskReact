import { CellAction } from "./cell-action";

export const columns = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original} />,
    }
]