import { api_data } from "./api.module.js";
import Customer from "./customer.module.js";
import Transaction from "./transaction.module.js";

export default class Data {
    static #customers = [];
    static #transactions = [];

    static initializeData() {
        api_data.customers.forEach(customer => {
            this.addCustomer(new Customer(customer.id, customer.name));
        });
        api_data.transactions.forEach(transaction => {
            this.addTransaction(new Transaction(transaction.id, transaction.customer_id, transaction.date, transaction.amount));
        });
    }

    static setCustomers(customers) {
        this.#customers = customers;
    }

    static getCustomers() {
        return this.#customers;
    }

    static getTransactions() {
        return this.#transactions;
    }

    static addCustomer(customer) {
        this.#customers.push(customer);
    }

    static addTransaction(transaction) {
        this.#transactions.push(transaction);
    }

    static filterByCustomerName(customerName) {
        let allCustomerId, allCustomerTransactions = [], temp;
        allCustomerId = this.#customers.filter(c => c.getCustomerName().startsWith(customerName));
        allCustomerId.forEach(customer => {
            temp = this.#transactions.filter(t => t.getCustomerId() === customer.getCustomerId());
            allCustomerTransactions.push(...temp);
        });

        return allCustomerTransactions;
    }

    static filterByTransactionAmount(transactionAmount, filterOperator) {
        let allCustomerTransactions;
        if (filterOperator == 2)
            allCustomerTransactions = this.#transactions.filter(t => t.getTransactionAmount() >= transactionAmount);
        else if (filterOperator == 3)
            allCustomerTransactions = this.#transactions.filter(t => t.getTransactionAmount() <= transactionAmount);
        return allCustomerTransactions;
    }

}