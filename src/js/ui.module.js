import Data from './data.module.js';

// Main Declarations.
Data.initializeData();
const customers = Data.getCustomers();
const transactions = Data.getTransactions();

let chartData;
let chartTransactions;
let lastChartCustomerId;

const tableBody = document.querySelector('tbody');
const transactionChart = document.querySelector('#transaction-chart');
const searchField = document.querySelector('input');
const filter = document.querySelector('select');
let chartColor = '#FFF';
let inverseChartColor = '#FFF';

// A function that display table data.

function displayTransactions(customers, transactions) {
    let customerName;
    let customerId;

    let container = ``;

    transactions.forEach(transaction => {
        customerName = customers.find(c => c.getCustomerId() === transaction.getCustomerId()).getCustomerName();
        customerId = customers.find(c => c.getCustomerId() === transaction.getCustomerId()).getCustomerId();
        container += `
                    <tr data-user-id="${customerId}">
                        <th scope="row"><span>${transaction.getTransactionId()}</span></th>
                        <td><span>${customerName}</span></td>
                        <td><span>${transaction.getTransactionDate()}</span></td>
                        <td><span>${transaction.getTransactionAmount()}</span></td>
                      </tr>
        `;
    });

    tableBody.innerHTML = container;

    // Initialized action listeners for each data row click.

    document.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('click', e => {
            let id = Number(e.currentTarget.dataset.userId);
            lastChartCustomerId = id;
            displayChart(id, Data.getTransactions());
        });
    });
}

// A function that displays customer data chart.

function displayChart(customerId, transactions) {
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    let chartTransactions = transactions.filter(t => t.getCustomerId() === customerId);
    let chartData = chartTransactions.map(transaction => ({
        "date": transaction.getTransactionDate(),
        "amount": transaction.getTransactionAmount()
    }));

    window.myChart = new Chart(
        transactionChart,
        {
            type: 'line',
            data: {
                labels: chartData.map(row => row.date),
                datasets: [
                    {
                        label: 'Transaction History',
                        data: chartData.map(row => row.amount),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgb(75, 192, 192)',
                        tension: 0.2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: chartColor // Legend text color
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        backgroundColor: chartColor, // Tooltip background color
                        titleColor: 'rgb(75, 192, 192)', // Tooltip title color
                        bodyColor: inverseChartColor // Tooltip body text color
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Transaction Date',
                            color: chartColor // X axis title color
                        },
                        ticks: {
                            color: chartColor // X axis label color
                        },
                        grid: {
                            color: inverseChartColor // Color of the horizontal grid lines
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Transaction Amount',
                            color: chartColor // Y axis title color
                        },
                        ticks: {
                            color: chartColor // Y axis label color
                        },
                        grid: {
                            display: true,
                            color: inverseChartColor // Color of the horizontal grid lines
                        }
                    }
                }
            }
        }
    );
}

// A function that toggles dark mode.

function toggleTheme() {
    function applyDarkMode() {
        document.body.classList.replace('bg-dark', 'bg-white');
        document.querySelector('table').classList.replace('table-dark', 'table-light');
        document.querySelector('button').classList.replace('btn-light', 'btn-dark');
        document.body.dataset.theme = 'light';
        chartColor = '';
        inverseChartColor = 'FFF';
        displayChart(lastChartCustomerId, transactions);
    }

    function applyLightMode() {
        document.body.classList.replace('bg-white', 'bg-dark');
        document.querySelector('table').classList.replace('table-light', 'table-dark');
        document.querySelector('button').classList.replace('btn-dark', 'btn-light');
        document.body.dataset.theme = 'dark';
        chartColor = '#FFF';
        inverseChartColor = '#FFF';
        displayChart(lastChartCustomerId, transactions);
    }

    if (document.body.dataset.theme == 'dark') {
        applyDarkMode();
    } else if (document.body.dataset.theme == 'light') {
        applyLightMode();  
    }

}


// A function that applies search filters.

function applyFilter() {
    if (searchField.value == '') {
        displayTransactions(customers, transactions);
    } else {
        if (filter.value == 1) {
            displayTransactions(customers, Data.filterByCustomerName(searchField.value));
        } else if (filter.value == 2) {
            displayTransactions(customers, Data.filterByTransactionAmount(searchField.value, filter.value));
        } else if (filter.value == 3) {
            displayTransactions(customers, Data.filterByTransactionAmount(searchField.value, filter.value));
        } else {
            searchField.value = '';
            displayTransactions(customers, transactions);
        }
    }

}

// Action listeners initialization.

// Dark mode button action listener.

document.querySelector('button').addEventListener('click', e => {
    toggleTheme();
});

// Select filter action listener.

filter.addEventListener('input', e => {
    if (filter.value != 0) {
        searchField.removeAttribute('disabled');
    } else {
        searchField.setAttribute('disabled', 'disabled');
    }
    applyFilter();
});

// Search field action listener.

searchField.addEventListener('input', e => {
    applyFilter();
});

export { displayTransactions, displayChart, customers, transactions, toggleTheme }