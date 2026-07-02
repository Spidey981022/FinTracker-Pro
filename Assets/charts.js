let chartInstance = null;
const currHolder = localStorage.getItem('currHolder');

export default function customChart(income, expense)
{
    const ctx = document.getElementById('myChart');

    if(chartInstance) {
        chartInstance.data.datasets[0].data = [income, null];
        chartInstance.data.datasets[1].data = [null, expense];
        chartInstance.update();
        return;
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [
                {
                label: 'Income',
                data: [income, null],
                borderWidth: 1,
                backgroundColor: ['rgba(61,170,91,100)'],
                },
                {
                    label: 'Expense',
                    data: [null, expense],
                    borderWidth: 2,
                    backgroundColor: ['#dd3a3a'],
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks:{
                        callback: function(value){
                            return currHolder + value;
                        },
                    },
                    beginAtZero: true
                },
            }
        }
    });
}