import LayoutHome from "../LayoutHome";

const MainPage = () => {
    const items = [
        {title: "Dashboard", href: "/home"},
        {title: "Companies", href: "/companies"},
        {title: "Employees", href: "/employees"}
    ]

    return(
        <LayoutHome items={items} isAuth={true}>
            Hello World!
        </LayoutHome>
    )
}

export default MainPage;