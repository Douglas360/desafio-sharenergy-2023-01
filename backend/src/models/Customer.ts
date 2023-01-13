import mongoose from 'mongoose';

import { CustomerType } from '../types/CustomerType';

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
       
    },
    address: {
        type: String,
        
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    }
});

const Customer = mongoose.model<CustomerType>('Customer', customerSchema);

export { Customer };