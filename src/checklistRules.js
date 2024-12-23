module.exports = [
    // Existing conditions
    { name: 'Valuation Fee Paid', check: data => data.isValuationFeePaid === true },
    { name: 'UK Resident', check: data => data.isUkResident === true },
    { name: 'Risk Rating Medium', check: data => data.riskRating === 'Medium' },
    { name: 'LTV Below 60%', check: data => {
        const loanToValue = (data.loanRequired / data.purchasePrice) * 100;
        return loanToValue < 60;
        }
    },
    // New condition example
    { name: 'New Condition', check: data => data.someProperty === 'someValue' },
];