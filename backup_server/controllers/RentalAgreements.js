import moment from "moment";
import SendApiRequest from "../services/ApiService.js";

export default async function GetRentalAgreements() {
    try {
        const start_date = moment().hour(0).minute(0).second(0);
        const end_date = moment().hour(23).minute(59).second(59);
        const agreements = await SendApiRequest(`/rental_agreements?StartDate=${start_date}&EndDate=${end_date}&pdf=true`);
        return agreements;
    } catch (err) {
        throw err;
    }
}