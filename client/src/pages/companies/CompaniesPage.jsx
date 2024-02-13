import { useDispatch, useSelector } from "react-redux";
import LayoutMain from "../main/LayoutMain"
import { CompanyClient } from "./components/client";
import { setCompanies } from "@/state";
import { useEffect } from "react";
import { format } from "date-fns";

const CompaniesPage = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies);
    const token = useSelector((state) => state.token);

    const getCompanies = async () => {
        const response = await fetch("http://127.0.0.1:3000/companies", {
            method: "GET",
            headers: {Authorization: `${token}`},
        });

        const data = await response.json();
        dispatch(setCompanies({companies: data}))
    }

    const formattedCompanies = companies.map((item) => ({
        id: item.id,
        name: item.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    useEffect(() => {
        getCompanies()
    }, [])

    return(
        <LayoutMain>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <CompanyClient data={formattedCompanies} />
                </div>
            </div>
        </LayoutMain>
    )
}

export default CompaniesPage;