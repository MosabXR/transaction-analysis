export default class Customer {
    #customerId;
    #customerName;
    constructor(customerId, customerName){
        this.#customerId = customerId;
        this.#customerName = customerName;
    }

    getCustomerId() {
        return this.#customerId;
    }

    getCustomerName() {
        return this.#customerName;
    }
}