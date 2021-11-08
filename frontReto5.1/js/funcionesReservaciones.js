function  llamarClients(){
    $.ajax({
        url: "http://129.151.114.70:8080/api/Client/all",
        url : "http://localhost:8080/api/Client/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select =$("#select-clients");
            $.each(respuesta, function(id, name){
                
                $select.append('<Option value =' +name.idClient+'>' + name.name + '</option>');
                console.log("select" + name.id)
            });
        }

    })
}

function  llamarCars(){
    $.ajax({
        url: "http://129.151.114.70:8080/api/Car/all",
        url : "http://localhost:8080/api/Car/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select =$("#select-cars");
            $.each(respuesta, function(id, name){
                
                $select.append('<Option value =' +name.idCar+'>' + name.name + '</option>');
                console.log("select" + name.id)
            });
        }

    })
}








function traerInformacionReservation(){
    $.ajax({
        url: "http://129.151.114.70:8080/api/Reservation/all",
        url : "http://localhost:8080/api/Reservation/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);    
        }

    });
}

function pintarRespuestaReservation(respuesta){
    let myTable = "<table class='table table-striped id=myTable'>" + "<thead><tr><th>ID</th><th>Start Date</th><th>Devolution Date</th><th>Status</th><th>Client</th><th>Cars</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client+"</td>";
        myTable+="<td>"+respuesta[i].car+"</td>";

        myTable+="<td> <button onclick='borrarElementoReservation("+respuesta[i].idReservation+")' class='btn btn-danger'> Borrar</button>";
        myTable+="<td> <button onclick='editarInformacionReservation("+respuesta[i].idReservation+")' class='btn btn-primary'> Actualizar</button>";
        myTable+="</tr>";
        
       
    }
    myTable+="</table>";        
    $("#resultado").html(myTable);

}

function guardarInformacionReservation(){
    let myData={
        
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:{idClient:$("#select-clients").val()},
        client:{idCar:$("#select-cars").val()},

        

    };
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Reservation/save",
        url : "http://localhost:8080/api/Reservation/save",
        type:"POST",
        contentType: "application/json",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#resultado").empty();
            $("#startDate").val(),
            $("#devolutionDate").val(),
            $("#status").val(),
            alert("se ha guardado los datos");
                         
        }
    }); 
}

function editarInformacionReservation(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Reservation/update",
        url : "http://localhost:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#resultado").empty();
            $("#startDate").val(),
            $("#devolutionDate").val(),
            $("#status").val(),
            traerInformacionReservation();
            alert("SE EDITO LA INFORMACION");
                         
        }
    }); 
}





function borrarElementoReservation(idElemento){
    let myData={
        idReservation:idElemento

    };
    
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        
        url: "http://129.151.114.70:8080/api/Reservation/" + idElemento,
        url : "http://localhost:8080/api/Reservation/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            
           
            traerInformacionReservation();
            alert("SE BORRO LA INFORMCION");
                         
        }
    }); 
}

