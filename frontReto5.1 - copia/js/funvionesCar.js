




function  llamarGamas(){
    $.ajax({
        url: "http://129.151.114.70:8080/api/Gama/all",
        url : "http://localhost:8080/api/Gama/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select =$("#select-gama");
            $.each(respuesta, function(id, name){
                
                $select.append('<Option value =' +name.idGama+'>' + name.name + '</option>');
                console.log("select" + name.id)
            });
        }

    })
}

function  llamarGamas(){
    $.ajax({
        url: "http://129.151.114.70:8080/api/Gama/all",
        url : "http://localhost:8080/api/Gama/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            let $select =$("#select-gama");
            $.each(respuesta, function(id, name){
                
                $select.append('<Option value =' +name.idGama+'>' + name.name + '</option>');
                console.log("select" + name.id)
            });
        }

    })
}





function traerInformacionCars(){
    $.ajax({
        url: "http://129.151.114.70:8080/api/Car/all",
        url : "http://localhost:8080/api/Car/all",
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCars(respuesta);    
        }

    });
}

function pintarRespuestaCars(respuesta){
    let myTable = "<table class='table table-striped id=myTable'>" + "<thead><tr><th>ID</th><th>NAME</th><th>BRAND</th><th>YEAR</th><th>DESCRIPCION</th><th>Gamas</th><th>Messages</th><th>Reservations</th> </tr></thead>";
    for(i=0;i<respuesta.length;i++){
        //let gamaListar = respuesta[i].gama? respuesta[i].gama.name : null;
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idCar+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].gama.name  +"</td>";
        myTable+="<td>"+respuesta[i].messages+"</td>";
        myTable+="<td>"+respuesta[i].reservations  +"</td>";   
        myTable+="<td> <button onclick='borrarElementoCar("+respuesta[i].idCar+")' class='btn btn-danger'> Borrar</button>";
        myTable+="<td> <button onclick='editarInformacionCar("+respuesta[i].idCar+")' class='btn btn-primary'> Actualizar</button>";
        

        myTable+="</tr>";
        
       
    }
    myTable+="</table>";        
    $("#resultado").html(myTable);

}

function mostrarMessages(idElemento1){

    idMessage=idElemento1
    $.ajax({
        url: "http://129.151.114.70:8080/api/Message/"+idElemento1,
        url : "http://localhost:8080/api/Message/"+idElemento1,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta1){
            console.log(respuesta1);
            pintarRespuestamessage(respuesta1);    
        }

    });
}


function guardarInformacionCars(){
    let myData={
        
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        gama:{idGama:+$("#select-gama").val()},

    };
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Car/save",
        url : "http://localhost:8080/api/Car/save",
        type:"POST",
        contentType: "application/json",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#resultado").empty();
           
            $("#name").val(""),
            $("#brand").val(""),
            $("#year").val(""),
            $("#description").val(""),
            traerInformacionCars();
            alert("se ha guardado los datos");
                         
        }
    }); 
}

function editarInformacionCar(idElemento){
    let myData={
        idCar:idElemento,
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.114.70:8080/api/Car/update",
        url : "http://localhost:8080/api/Car/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#resultado").empty();
            $("#name").val(""),
            $("#brand").val(""),
            $("#year").val(""),
            $("#description").val(""),
            
            traerInformacionCars();
            alert("SE EDITO LA INFORMACION");
                         
        }
    }); 
}





function borrarElementoCar(idElemento){
    let myData={
        idCar:idElemento

    };
    
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        
        url: "http://129.151.114.70:8080/api/Car/" + idElemento,
        url : "http://localhost:8080/api/Car/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
           
            traerInformacionCars();
            alert("SE BORRO LA INFORMCION");
                         
        }
    }); 
}


