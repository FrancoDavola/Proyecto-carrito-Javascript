const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito = []


cargarEventListeners()
function cargarEventListeners(){
    listaCursos.addEventListener('click' , agregarCurso)
    carrito.addEventListener('click' , borrarArticuloCarrito)
    vaciarCarrito.addEventListener('click' , vaciarCarro)
}


function agregarCurso(e){

    if(e.target.classList.contains('agregar-carrito')){
     const cursoSeleccionado = e.target.parentElement.parentElement
     leerDatosCurso(cursoSeleccionado)
    }
}

function borrarArticuloCarrito (e){

    
    

    if(e.target.classList.contains('borrar-curso')){

        const idDelProducto = e.target.getAttribute('data-id')

     articulosCarrito =  articulosCarrito.filter( articulo =>  articulo.id !== idDelProducto )

     carritoHTML()
        
    }
}


function leerDatosCurso(curso){

    const info = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    const existe = articulosCarrito.some(articulo => articulo.id === info.id)
              if(existe){

             const productosActualizados = articulosCarrito.map( articulo => {
                     
                       if(articulo.id == info.id){
                            articulo.cantidad++
                            return articulo
                      }else {
                            return articulo
                            }
                  })
                  
                  articulosCarrito = [...productosActualizados]

              }else {
                  articulosCarrito = [...articulosCarrito , info]
                    }
          
    

    

    
    
carritoHTML()
    
}

function carritoHTML (){

    limpiarHTML()

    articulosCarrito.forEach( curso => {
           const {imagen , titulo, precio, cantidad , id} = curso
           const row = document.createElement('tr')

           row.innerHTML = `
                             <td><img src='${imagen}'></td>
                             <td>${titulo}</td>
                             <td>${precio}</td>
                             <td>${cantidad}</td>
                             <td> <a href='#' class= "borrar-curso" data-id= "${id}">X</a></td>`;

           contenedorCarrito.appendChild(row)
    })

    
}

function limpiarHTML(){
     
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}

function vaciarCarro(){
    articulosCarrito = []

    limpiarHTML()
} 


