// Cambridge School Transport System - Dashboard JavaScript

// Chart configurations
const chartColors = {
    primary: '#1a5490',
    secondary: '#2c7cc1',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
};

let charts = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadAnalytics();
});

// Load and display analytics data
async function loadAnalytics() {
    try {
        const response = await fetch('/analytics_data');
        const data = await response.json();
        
        // Update budget summary
        updateBudgetSummary(data.budget);
        
        // Create charts
        createYearChart(data.year_counts);
        createResidenceChart(data.residence_fees);
        createPaymentChart(data.payment_stats);
        createFeeDistributionChart(data.fee_distribution);
        
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

// Update budget summary section
function updateBudgetSummary(budget) {
    const formatter = new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    
    document.getElementById('totalExpected').textContent = 
        formatter.format(budget.expected);
    document.getElementById('totalCollected').textContent = 
        formatter.format(budget.collected);
    document.getElementById('totalOutstanding').textContent = 
        formatter.format(budget.outstanding);
    
    const collectionRate = budget.expected > 0 
        ? ((budget.collected / budget.expected) * 100).toFixed(1) 
        : 0;
    document.getElementById('collectionRate').textContent = 
        collectionRate + '%';
}

// Create Students by Year chart
function createYearChart(yearCounts) {
    const ctx = document.getElementById('yearChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (charts.yearChart) {
        charts.yearChart.destroy();
    }
    
    const years = ['Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'];
    const counts = years.map(year => yearCounts[year] || 0);
    
    charts.yearChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Number of Students',
                data: counts,
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Create Fees by Residence chart
function createResidenceChart(residenceFees) {
    const ctx = document.getElementById('residenceChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (charts.residenceChart) {
        charts.residenceChart.destroy();
    }
    
    const residences = Object.keys(residenceFees);
    const fees = Object.values(residenceFees);
    
    // Generate colors for each residence
    const backgroundColors = residences.map((_, i) => {
        const colors = [
            chartColors.primary,
            chartColors.secondary,
            chartColors.success,
            chartColors.info,
            chartColors.warning,
            chartColors.danger
        ];
        return colors[i % colors.length];
    });
    
    charts.residenceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: residences,
            datasets: [{
                data: fees,
                backgroundColor: backgroundColors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const formatter = new Intl.NumberFormat('en-UG', {
                                style: 'currency',
                                currency: 'UGX',
                                minimumFractionDigits: 0
                            });
                            return context.label + ': ' + formatter.format(value);
                        }
                    }
                }
            }
        }
    });
}

// Create Payment Status chart
function createPaymentChart(paymentStats) {
    const ctx = document.getElementById('paymentChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (charts.paymentChart) {
        charts.paymentChart.destroy();
    }
    
    charts.paymentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Paid', 'Unpaid'],
            datasets: [{
                data: [paymentStats.paid, paymentStats.unpaid],
                backgroundColor: [
                    chartColors.success,
                    chartColors.danger
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = paymentStats.total;
                            const value = context.parsed;
                            const percentage = total > 0 
                                ? ((value / total) * 100).toFixed(1) 
                                : 0;
                            return context.label + ': ' + value + 
                                   ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Create Fee Distribution chart
function createFeeDistributionChart(feeDistribution) {
    const ctx = document.getElementById('feeDistributionChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (charts.feeDistributionChart) {
        charts.feeDistributionChart.destroy();
    }
    
    const labels = Object.keys(feeDistribution);
    const data = Object.values(feeDistribution);
    
    charts.feeDistributionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Students',
                data: data,
                backgroundColor: chartColors.secondary,
                borderColor: chartColors.secondary,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Update payment status
async function updatePayment(studentId, paid) {
    try {
        const response = await fetch(`/update_payment/${studentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paid: paid })
        });
        
        if (response.ok) {
            // Reload analytics to update charts and budget
            loadAnalytics();
        } else {
            alert('Error updating payment status');
        }
    } catch (error) {
        console.error('Error updating payment:', error);
        alert('Error updating payment status');
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Auto-refresh analytics every 30 seconds if page is visible
let refreshInterval;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
    } else {
        loadAnalytics();
        refreshInterval = setInterval(loadAnalytics, 30000);
    }
});

// Initial auto-refresh setup
if (!document.hidden) {
    refreshInterval = setInterval(loadAnalytics, 30000);
}
