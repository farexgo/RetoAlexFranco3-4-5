





function traerInformacionClients(){
    $.ajax({
        url: "http://129.151.114.70:8080/api/Client/all",
        url : "http://localhost:8080/api/Client/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClients(respuesta);    
        }

    });
}

function pintarRespuestaClients(respuesta){
    let myTable = "<table class='table table-striped id=myTable'>" + "<thead><tr><th>ID</th><th>EMAIL</th><th>PASSWORD</th><th>NAME</th><th colspan='3'>AGE</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='borrarElementoCar("+respuesta[i].idClient+")' class='btn btn-danger'> Borrar</button>";
        myTable+="<td> <button onclick='editarInformacion("+respuesta[i].idClient+")' class='btn btn-primary'> Actualizar</button>";
        

        myTable+="</tr>";
        
       
    }
    myTable+="</table>";        
    $("#resultado2").html(myTable);

}



function guardarInformacionClients(){
    let myData={
        
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val(),

    };
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Client/save",
        url : "http://localhost:8080/api/Client/save",
        type:"POST",
        contentType: "application/json",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#resultado").empty();
           
            $("#name").val(""),
            $("#email").val(""),
            $("#password").val(""),
            $("#age").val(""),
            traerInformacionClients();
            alert("se ha guardado los datos");
                         
        }
    }); 
}

function editarInformacion(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Client/update",
        url : "http://localhost:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#resultado").empty();
            $("#name").val(""),
            $("#email").val(""),
            $("#password").val(""),
            $("#age").val(""),
            
            traerInformacionClients();
            alert("SE EDITO LA INFORMACION");
                         
        }
    }); 
}

function borrarElementoCar(idElemento){
    let myData={
        idClient:idElemento

    };
    
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        
        url: "http://129.151.114.70:8080/api/Client/" + idElemento,
        url : "http://localhost:8080/api/Client/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
           
            traerInformacionClients();
            alert("SE BORRO LA INFORMCION");
                         
        }
    }); 
}
