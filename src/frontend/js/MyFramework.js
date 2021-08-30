class MyFramework {
    getElementById(id) {
        return document.getElementById(id);
    }
    requestPOST(url, response, datos) {
        let xlm = new XMLHttpRequest();
        xlm.onreadystatechange = () => {
            if (xlm.readyState == 4) {
                response.responsePost(xlm.status, xlm.responseText);
            }
        };
        xlm.open("POST", url, true);
        xlm.setRequestHeader("Content-Type", "application/json");
        xlm.send(JSON.stringify(datos));
    }
}
