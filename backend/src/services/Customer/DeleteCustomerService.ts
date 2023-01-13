import { Customer } from "../../models/Customer";

class DeleteCustomerService {
    async execute({ id }: { id: string }) {
        const customer = await Customer.findById(id);
        if (!customer) {
            throw new Error("Customer not found")
        }
        await customer.remove();
    }
}
export { DeleteCustomerService };