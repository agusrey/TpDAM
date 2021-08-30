class Main {
    main() {
        console.log("Se ejecuto el metodo main!!!");
        this.myFramework = new MyFramework();
    }
    mostrarLista() {
        let listaUsr = new Array();
        let usr1 = new User(1, "matias", "mramos@asda.com", true);
        let usr2 = new User(2, "Jose", "jose@asda.com", false);
        let usr3 = new User(3, "Pedro", "perdro@asda.com", false);
        usr1.setIsLogged(false);
        listaUsr.push(usr1);
        listaUsr.push(usr2);
        listaUsr.push(usr3);
        for (let obj in listaUsr) {
            listaUsr[obj].printInfo();
        }
    }
    handleEvent(ev) {
        alert("Se hizo click!");
        let objetoClick = ev.target;
        if (objetoClick.textContent == "Listar") {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log("Llego la respuesta!!!!");
                        console.log(xhr.responseText);
                        let listaDis = JSON.parse(xhr.responseText);
                        for (let disp of listaDis) {
                            let listaDisp = this.myFramework.getElementById("listaDisp");
                            listaDisp.innerHTML += `<li class="collection-item avatar">
                            <img src="./static/images/lightbulb.png" alt="" class="circle">
                            <span class="nombreDisp">${disp.name}</span>
                            <p>${disp.description}
                            </p>
                            <a href="#!" class="secondary-content">
                                <div class="switch">
                                    <label >
                                      Off
                                      <input id="disp_${disp.id}" type="checkbox">
                                      <span class="lever"></span>
                                      On
                                    </label>
                                  </div>
                            </a>
                          </li>`;
                        }
                        for (let disp of listaDis) {
                            let checkDisp = this.myFramework.getElementById("disp_" + disp.id);
                            checkDisp.addEventListener("click", this);
                        }
                    }
                    else {
                        alert("error!!");
                    }
                }
            };
            xhr.open("GET", "http://localhost:8000/devices", true);
            xhr.send();
            console.log("Ya hice el request!!");
        }
        else {
            let checkBox = ev.target;
            alert(checkBox.id + " - " + checkBox.checked);
            let datos = { "id": checkBox.id, "status": checkBox.checked };
            this.myFramework.requestPOST("http://localhost:8000/devices", this, datos);
        }
    }
    responsePost(status, response) {
        alert(response);
    }
}
window.addEventListener("load", () => {
    let miObjMain = new Main();
    miObjMain.main();
    let boton = miObjMain.myFramework.getElementById("boton");
    boton.textContent = "Listar";
    boton.addEventListener("click", miObjMain);
    let btnCerrar = miObjMain.myFramework.getElementById("btnCerrar");
    btnCerrar.addEventListener("dblclick", miObjMain);
});
