 // JQUERY Consultar base de datos y mostrar en una tabla

 $("#table-tab").click(function () {
    submitConsulta();
 });

 $(document).ready(function () {
    $("#productoForm").submit(function (event) {
        //cancels the form submission
        console.log("entro");
        event.preventDefault();
        submitFormInsert();
    });
});

function submitFormInsert() {
    var comentario = $("#comentario").val();
    var object = {"comentario": comentario };

    console.log(object);

    fetch('http://localhost/HowToWeb/server/business/ProductoInsert.php', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
        },
         body: JSON.stringify(object),
         cache: 'no-cache'
    })
        .then(function (response) {
          console.log("entró");
         return response.text();
    })
        .then(function (data) {
                 if (data === "1") {
                     alert("Error al insertar");
              }
                 else {
                     alert("Comentario registrado");
              }submitConsulta();  
         })
         .catch(function(err){
             console.error(err);
         });
         submitConsulta();          
}

function formSuccess(){
    alert("Datos almacenados");
}



function submitConsulta() {
    console.log("Entró a llamar");
    fetch('http://localhost/HowToWeb/server/business/ProductoConsulta.php',{
        method: 'GET',
        headers: {
           'Content-Type' :  'application/json'
    }

    }). then(response => response.json())
            .then(result=>{
                if (result.length > 0) {
                    cargarDatos (result);
                } else {
                    console.log(JSON.stringify(result));
                }
            })
            .catch(error => console.log('error: ' + error));
}


function cargarDatos (data) {
    var rows = "";
    $("#dataTable tr").remove();
    $("#dataTable").append('<tr><td>♥♥♥  COMENTARIOS  ♥♥♥</td>' +
        "</tr>"
        );
    for (x in data) {
    rows +=`<tr row_id= ${data[x].idProducto}>`;

  
    var idcomen="C"+data[x].idProducto;


    rows +=`<td><input type="text" id="${idcomen}" value="${data[x].comentario}" style="background-color:transparent; border:none; color: black;"></td>`

    }
    $("#dataTable").append(rows);
}


