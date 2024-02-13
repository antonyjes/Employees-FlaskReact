import LayoutHome from "../LayoutHome";

const LayoutMain = ({children}) => {
    const items = [
        {title: "Dashboard", href: "/home"},
        {title: "Companies", href: "/companies"},
        {title: "Employees", href: "/employees"}
    ]

    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutMain;