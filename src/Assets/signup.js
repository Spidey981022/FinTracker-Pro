const userArr = JSON.parse(localStorage.getItem("users")) || [];

const form = document.querySelector('#signup-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fname = e.target[0].value;
    const email = e.target[1].value;
    const name = e.target[2].value;
    const pwd = e.target[3].value;

    const existUser = userArr.find((user)=>{
        if(user.email === email)
            return true;
    });

    if(existUser){
        alert(`${email} already exist`);
    }else{
        userArr.push({
            fname,
            email,
            name,
            pwd,
            isLogged: false,
        });
        console.log(userArr);

        localStorage.setItem('users', JSON.stringify(userArr));
        const savedData = JSON.parse(localStorage.getItem('users'));
        console.log("Saved Data " + savedData);

        e.target[0].value = '';
        e.target[1].value = '';
        e.target[2].value = '';
        e.target[3].value = '';
        location.href = './index.html';
    }
})