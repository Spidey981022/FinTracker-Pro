export default function logout(){
    const loggedUser = localStorage.getItem('loggedUser');


        const userList = JSON.parse(localStorage.getItem('users'));

        const findUser = userList.find((user)=>{
            return user.name === loggedUser;
        });

        if(findUser){
            findUser.isLogged = false;
            localStorage.setItem('users', JSON.stringify(userList));
        }
        localStorage.removeItem('loggedUser');
        location.replace('./index.html');
    };