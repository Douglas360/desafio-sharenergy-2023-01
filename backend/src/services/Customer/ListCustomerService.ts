import { Customer } from "../../models/Customer";

class ListCustomerService {
    async execute() {
        const customers = await Customer.find();
        return customers;
    }
}

export { ListCustomerService };