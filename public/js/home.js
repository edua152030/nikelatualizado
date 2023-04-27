const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
}

checkLogged();

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById('verTodas').addEventListener("click", function(){
    window.location.href = "transactions.html";
})

//adicionando valores na home
document.getElementById("transaction-modal").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({

        value: value, type: type, description: description, date: date
    })

    saveData(data)
    e.target.reset();
    myModal.hide();

    getCacheshIn();
    getCacheshOut();
    getTotal();

    alert("lançamento adicionado");

})

function checkLogged(){

    if(session){
        session.setItem("logged", session);

        logged = session;
    }

    if(!logged){
        window.location.href= "index.html"
    }

    const dataUser = localStorage.getItem(logged)
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getCacheshIn();
    getCacheshOut();
    getTotal();
};


//sair 
function logout(){
    sessionStorage.removeItem("logged");
        window.location.href= "index.html"
};

//adicionar lancamento com usuário logado
function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
};

function getCacheshIn(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item)=> item.type === "1");

    

     if(cashIn.length){
         let cashInHtml = ``;
         let limite = 0;

         if(cashIn.length > 5 ){
            limit = 5;
        }else{
            limit =  cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `

                                    <div class="row mb-4">
                                        <div class="col-12">
                                            <h3 class="fs-2"> R$ ${cashIn[index].value.toFixed(2)}</h3>
                                            <div class="container p-0" >
                                                <div class="row">
                                                    <div class="col-12 col-md-8">
                                                        <p>${cashIn[index].description} </p>
                                                    </div>
                                                    <div class="col-12 col-md-8 d-flex justify-content-end">
                                                        ${cashIn[index].date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `
            
        }
        document.getElementById("cash-In-List").innerHTML = cashInHtml;
     }
};


function getCacheshOut(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item)=> item.type === "2");

   

     if(cashIn.length){
         let cashInHtml = ``;
         let limite = 0;

         if(cashIn.length > 5 ){
            limit = 5;
        }else{
            limit =  cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `

                                    <div class="row mb-4">
                                        <div class="col-12">
                                            <h3 class="fs-2"> R$ ${cashIn[index].value.toFixed(2)}</h3>
                                            <div class="container p-0" >
                                                <div class="row">
                                                    <div class="col-12 col-md-8">
                                                        <p>${cashIn[index].description} </p>
                                                    </div>
                                                    <div class="col-12 col-md-8 d-flex justify-content-end">
                                                        ${cashIn[index].date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `
            
        }
        document.getElementById("cash-Out-List").innerHTML = cashInHtml;
     }
};


function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type ==='1'){
            total += item.value;
        }else{
            total -= item.value;
        }
    })

    document.getElementById('total').innerHTML = `R$ ${total.toFixed(2)}`;
}

