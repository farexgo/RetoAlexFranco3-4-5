function llamarClients() {
    $.ajax({
        url: "http://129.151.114.70:8080/api/Client/all",
        url: "http://localhost:8080/api/Client/all",

        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("#client");
            $.each(respuesta, function (id, name) {

                $select.append('<Option value =' + name.idClient + '>' + name.name + '</option>');
                console.log("select" + name.id)
            });
        }

    })
}






function llamarCars() {
    $.ajax({
        url: "http://129.151.114.70:8080/api/Car/all",
        url: "http://localhost:8080/api/Car/all",

        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("#select-cars");
            $.each(respuesta, function (id, name) {

                $select.append('<Option value =' + name.idCar + '>' + name.name + '</option>');
                
            });
        }

    })
}




function traerInformacionMessage() {
    $.ajax({
        url: "http://129.151.114.70:8080/api/Mesasage/all",
        url: "http://localhost:8080/api/Message/all",

        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }

    });
}





function pintarRespuestaMessage(respuesta) {
    let myTable = "<table class='table table-striped id=myTable'>" + "<thead><tr><th>ID</th><th>messageText</th><th>CLIENT</th></tr></thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        let client = respuesta[i].client ? respuesta[i].client.name : null;
        let car1 = respuesta[i].car? respuesta[i].car.name : null;
        myTable += "<td>" + respuesta[i].idMessage + "</td>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].car1 + "</td>";
        myTable += "<td> <button onclick='borrarElementoCar(" + respuesta[i].idMessage + ")' class='btn btn-danger'> Borrar</button>";
        myTable += "<td> <button onclick='editarInformacionCar(" + respuesta[i].idMessage + ")' class='btn btn-primary'> Actualizar</button>";


    }
    myTable += "</table>";
    $("#resultado").html(myTable);

}

function guardarInformacionMessage() {
    let myData = {


        messageText: $("#messageText").val(),
        car: { idCar: +$("#select-cars").val() },
        client: { idClient: +$("#client").val() },




    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData)    
    $.ajax({
        url: "http://129.151.114.70:8080/api/Message/save",
        url: "http://localhost:8080/api/Message/save",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify(myData),
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta) 
            $("#resultado").empty();

            $("#messageText").val(""),
                traerInformacionMessage();
            alert("se ha guardado los datos");

        }
    });
}

function editarInformacionMessage(idElemento) {
    let myData = {
        idMessage: idElemento,
        messageText: $("#messageText").val(),

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Message/update",
        url: "http://localhost:8080/api/Message/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            $("#resultado").empty();

            $("#messageText").val(""),
                traerInformacionMessage();
            alert("SE EDITO LA INFORMACION");

        }
    });
}





function borrarElementoMessage(idElemento) {
    let myData = {
        idMessage: idElemento

    };

    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({

        url: "http://129.151.114.70:8080/api/Message/" + idElemento,
        url: "http://localhost:8080/api/Message/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();

            traerInformacionMessage();
            alert("SE BORRO LA INFORMCION");

        }
    });
}


