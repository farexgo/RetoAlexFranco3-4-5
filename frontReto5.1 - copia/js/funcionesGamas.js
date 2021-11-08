function llamarGamas() {
    $.ajax({
        url: "http://129.151.114.70:8080/api/Client/all",
        url: "http://localhost:8080/api/Client/all",

        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {

            let $select = $("select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<Option value =' + name.idClient + '>' + name.name + '</option>');
            });
        }

    });
}








function traerInformacionGamas() {
    $.ajax({
        url: "http://129.151.114.70:8080/api/Gama/all",
        url: "http://localhost:8080/api/Gama/all",

        type: "GET",
        datatype: "JSON",
        success: function (respuestaGama) {
            console.log(respuestaGama);
            pintarRespuestaGamas(respuestaGama);
        }

    });
}

function pintarRespuestaGamas(respuestaGama) {
    let myTable = "<table class='table table-striped id=myTable'>" + "<thead><tr><th>ID</th><th>NAME</th><th>description</th><th>Cars</th></thead>";
    for (i = 0; i < respuestaGama.length; i++) {
        
        myTable += "<tr>";
        myTable += "<td>" + respuestaGama[i].idGama + "</td>";
        myTable += "<td>" + respuestaGama[i].name + "</td>";
        myTable += "<td>" + respuestaGama[i].description + "</td>";
        myTable += "<td>" + respuestaGama[i].cars + "</td>";
        myTable += "<td> <button onclick='borrarElementoGama(" + respuestaGama[i].idGama + ")' class='btn btn-danger'> Borrar</button>";
        myTable += "<td> <button onclick='editarInformacionGama(" + respuestaGama[i].idGama + ")' class='btn btn-primary'> Actualizar</button>";
        myTable += "</tr>";


    }
    myTable += "</table>";
    $("#resultado2").html(myTable);

}

function guardarInformacionGamas() {
    let myData = {

        name: $("#name").val(),
        description: $("#description").val(),

    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Gama/save",
        url: "http://localhost:8080/api/Gama/save",
        type: "POST",
        contentType: "application/json",
        data: dataToSend,
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            $("#resultado2").empty();

            $("#name").val(""),
                $("#description").val(""),
                traerInformacionGamas();
            alert("se ha guardado los datos");

        }
    });
}

function editarInformacionGama(idElemento) {
    let myData = {
        idGama: idElemento,
        name: $("#name").val(),
        description: $("#description").val(),

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Gama/update",
        url: "http://localhost:8080/api/Gama/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            $("#resultado2").empty();

            $("#name").val(""),
                $("#description").val(""),
                traerInformacionGamas();
            alert("SE EDITO LA INFORMACION");

        }
    });
}





function borrarElementoGama(idElemento) {
    let myData = {
        idGama: idElemento

    };

    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({

        url: "http://129.151.114.70:8080/api/Gama/" + idElemento,
        url: "http://localhost:8080/api/Gama/" + idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado2").empty();

            traerInformacionGamas();
            alert("SE BORRO LA INFORMCION");

        }
    });
}


