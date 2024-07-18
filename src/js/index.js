'use strict';
import { displayTransactions, displayChart, customers, transactions, toggleTheme } from './ui.module.js';

toggleTheme();

displayChart([],[]);
displayTransactions(customers, transactions);


