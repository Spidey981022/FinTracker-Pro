export default function entries(){
    const entryList = document.querySelector('.entry-lists');
    const loggedUser = localStorage.getItem('loggedUser');
    const obj = JSON.parse(localStorage.getItem(`transaction_${loggedUser}`)) ?? [];

    const ui = (obj)=>{
        entryList.innerHTML = '';
        obj.forEach((item) => {
            let {amount, type, description, category, date} = item;
            const currHolder = localStorage.getItem('currHolder') ?? '$';
            // console.log(`${date} ${description} ${type} ${amount} `);
            entryList.innerHTML += `
        <div class="entry">
                        <p>${date}</p>
                        <p>${description}</p>
                        <p>${category}</p>
                        <p>${currHolder}<span>${amount}</span></p>
                        <p>
                            <i class="ri-pencil-fill"></i>
                            <i class="ri-delete-bin-fill delete"></i>
                        </p>
                    </div>
        `;
        })
    }
    ui(obj);

    function color(obj){
        obj.forEach((item,index) => {
            const entry = document.querySelectorAll('.entry');
            obj[index].type === 'Expense' ? (entry[index].children[3].style.color = 'red') : (entry[index].children[3].style.color = 'green');
        })
    }
    color(obj);

    const searchBar = document.querySelector('#search-bar');
    searchBar.addEventListener('input', (e) => {
       const filteredArr =  obj.filter((item) => {
            return item.category.toLowerCase().includes(e.target.value.toLowerCase()) || item.description.toLowerCase().includes(e.target.value.toLowerCase()) || item.date.includes(e.target.value) || item.amount.includes(e.target.value);
        })
           ui(filteredArr);
       color(filteredArr);
    })

    const filterBar = document.querySelector('#filter-bar');
    filterBar.addEventListener('input', (e) => {
        const filteredArr =  obj.filter((item) => {
            if(e.target.value === "" || e.target.value === 'all'){
                return true;
            }
           return item.type === e.target.value;
        })
        ui(filteredArr);
        color(filteredArr);
    })

}