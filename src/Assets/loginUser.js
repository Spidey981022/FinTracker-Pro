const alreadyLogged = localStorage.getItem('loggedUser');
if(alreadyLogged){
    location.replace('./dashboard.html');
}

const form = document.querySelector('#login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const uname = e.target[0].value;
    const upwd = e.target[1].value;
    const userData = JSON.parse(localStorage.getItem('users'));
    if(localStorage.getItem('users') == null) {
        alert('Please Signup first!');
        return;
    }
    const checkUser = userData.find((user)=>{
        if(user.name === uname && user.pwd === upwd){
            return true;
        }
    });

    if(checkUser){
        checkUser.isLogged = true;
        localStorage.setItem('users', JSON.stringify(userData));
        localStorage.setItem('loggedUser', (checkUser.name));
        localStorage.setItem('profile', JSON.stringify(checkUser));
        location.replace('./dashboard.html');
    }
    else{
        alert("Either Signup or Login User Not Found!");
    }
})