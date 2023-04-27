const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//logar
//pegando login do funcionario
document.getElementById("eval-login").addEventListener('submit', function(e){
    e.preventDefault();
    
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;
    
    //valida se usuario esta cadastrado na storage
    const account = getAccount(email);
    if(!account){
        alert("verifique usuario e senha");
        return;
    }
    //verifica se a senha esta errada
    if(account){
        if(account.password !== password){
            alert("verifique usuario e senha");
            return;
        }

    saveSession(email, checksession);    

    window.location.href = "home.html";
    }
});

//criar conta
document.getElementById('create-form').addEventListener('submit', function(e){
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 4){
        alert("verifique email e senha");
        return;
    }

    if(password.length < 4 ){
        alert("verifique email e senha");
        return;
    }

//salva a conta
    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();
    alert("conta criada com sucessso!")
});

//salva na storage local da aplicação
function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
};

//funcão que pega o usuario cadastrado na storage
function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }
    return "";
}

function checkLogged(){

    if(session){
        session.setItem("logged", session);

        logged = session;
    }

    if(logged){

        saveSession(logged, session)
        window.location.href= "home.html"
    }

}

function saveSession(data, saveSession){

    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data);
}




