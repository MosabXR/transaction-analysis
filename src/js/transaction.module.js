export default class Transaction {
    #transactionId
    #customerId;
    #transactionDate
    #transactionAmount;
    constructor(transactionId, customerId, transactionDate, transactionAmount) {
        this.#transactionId = transactionId;
        this.#customerId = customerId;
        this.#transactionDate = transactionDate;
        this.#transactionAmount = transactionAmount;
    }

    getTransactionId() {
        return this.#transactionId;
    }

    getCustomerId() {
        return this.#customerId;
    }

    getTransactionDate() {
        return this.#transactionDate;
    }

    getTransactionAmount() {
        return this.#transactionAmount;
    }
}