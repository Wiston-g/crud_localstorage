const formularioP = document.querySelector('#formulario');
const n_tareas = document.getElementById('n_Tareas');

let arreglo_Tarea= [];
let numero=0;



//---------funciones

const Crear_Tarea =(actividad)=>{
    let item ={
        id:numero=numero+1,
        tarea:actividad,
        estado:false
        
    }
    arreglo_Tarea.push(item);
    return item;
    
}

const agregarBd=()=>{
    localStorage.setItem('pendiente', JSON.stringify(arreglo_Tarea));
    imprimir_tareas();
}


const imprimir_tareas=()=>{
    n_tareas.innerHTML="";
    arreglo_Tarea=JSON.parse(localStorage.getItem('pendiente'));
    if(arreglo_Tarea===null){
        arreglo_Tarea=[];
    }else{
        arreglo_Tarea.forEach(element=>{
            n_tareas.innerHTML+=`<div class="col alert alert-primary " role="alert"><p>${element.id} - ${element.tarea} - ${element.estado}</p><div id="botonera" class="col"><button id="editar" onclick="editar(${element.id})" type="button" class="btn btn-warning " >Editar</button><button id="hecha" onclick="hecho(${element.id})" type="button" class="btn btn-success">Hecha</button><button id="eliminar" onclick="borrar(${element.id})" type="button" class="btn btn-danger">Eliminar</button></div>`
        })
    }
}

const editar=(id)=>{
    for(var i=0; i<=arreglo_Tarea.length;i++){
        if(arreglo_Tarea[i].id==id){
            arreglo_Tarea[i].tarea;
            let cambio=prompt("la tarea actual es " + arreglo_Tarea[i].tarea)
            arreglo_Tarea[i].tarea=cambio;
        }agregarBd();
    }
}

const hecho=(id)=>{
    const verdad=true;
    for(var i=0; i<=arreglo_Tarea.length;i++){
        if(arreglo_Tarea[i].id==id){
            arreglo_Tarea[i].estado=true;
            alert(arreglo_Tarea[i].estado)
        }agregarBd();
    }
}


const borrar=(id)=>{
    
     for(var i=0; i<=arreglo_Tarea.length;i++){
        if(arreglo_Tarea[i].id==id&&arreglo_Tarea[i].estado==true){
           arreglo_Tarea.splice(i, 1);
        }agregarBd();
    }
    
}

//------------eventos
formularioP.addEventListener('submit',(e)=>{
    e.preventDefault();
    let actividad_agregar=document.querySelector('#nueva_tarea').value;
    Crear_Tarea(actividad_agregar);
    agregarBd();
    formularioP.reset();
})

document.addEventListener('DOMContentLoaded', imprimir_tareas);

