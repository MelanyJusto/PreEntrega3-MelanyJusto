const formulario = document.getElementById('formularioPrestamo');

const prestamoFinal = document.getElementById('nuevoPrestamo');

const misPrestamos = document.getElementById('misPrestamos');

const ul = document.createElement('ul')

const intereses = document.getElementById('intereses')

const error = document.getElementById('error');

const storage = 'prestamoFinal';

//CLASE PARA CREAR OBJETO PRESTAMO
class Prestamo {
  constructor(nombre, email, direccion, monto, cuotas, total) {
    this.nombre = nombre,
      this.email = email,
      this.direccion = direccion,
      this.monto = monto,
      this.cuotas = cuotas
      this.total = total
  }
};

//FETCH
function plazos () {
  fetch('../index.json')
  .then((res) => res.json())
  .then((data) => {
      opciones(data)
  })
};
function opciones (data){
  for (let valor of data){
    intereses.append(new Option( valor.cuotas + ' ' + valor.intereses ))
  }
};

//ARRAY // DIBUJO EN DOM 
const prestamosCliente = [];
function mostrarArray() {
  const misPrestamos = document.getElementById('misPrestamos');
  prestamosCliente.forEach(function (data, index) {
    const parrafo = document.createElement("p");
    const contenido = document.createTextNode('-Nombre:' + ' ' + data.nombre + '\nEmail:' + ' ' + data.email + '\nDireccion:' + ' ' + data.direccion + '\nMonto solicitado: $' + ' ' + data.monto + '\nCantidad de cuotas:' + ' ' + data.cuotas + '\nTotal a devolver: $'+ (parseInt(data.monto) + parseInt(data.monto) * 10 * parseInt(data.cuotas) / 100))
    misPrestamos.appendChild(parrafo)
    parrafo.appendChild(contenido);
  })
};
//MOSTRAR PRESTAMO REALIZADO EN DOM
const mostrarPrestamo = (prestamo, prestamosCliente) => {

  prestamoFinal.innerHTML = `
    <div>
      <div>
        <h1>Sr/Sra ${prestamo.nombre}, esta a punto de solicitar su presamo:</h1>
      </div>
      <ul>
      <li>Monto a solicitar: $ ${prestamo.monto}</li>
      <li>Cuotas: ${prestamo.cuotas}</li>
      <li>Dinero a devolver: $ ${parseInt(prestamo.monto) + parseInt(prestamo.monto) * 10 * parseInt(prestamo.cuotas) / 100}</li>
      </ul>
      <div>
      <input type="submit" id="confirmar" value="Confirmar Prestamo">
      <input type="reset" id="cancelar" value="Cancelar">
      </div>
    </div>
    `
  document.getElementById('confirmar').onclick = () => {
    Swal.fire({
      icon: 'success',
      title: 'Solicitud de prestamo enviada!',
      text: 'En 24hs te enviaremos un correo electronico con la confirmacion'
    })
    prestamosCliente.push(prestamo)
    console.log(prestamosCliente)
    localStorage.setItem(storage, JSON.stringify(prestamo))
    prestamoFinal.innerHTML = ''
    mostrarArray()
  }

  document.getElementById('cancelar').onclick = () => {
    Swal.fire({
      icon: 'error',
      title: 'Solicitud de prestamo cancelada!',
      text: 'Puede volver a intentarlo cuando lo desee'
    })
    prestamoFinal.innerHTML = '';

  }
};

//EVENTO PARA EVITAR REFRESH / ALMACENAMIENTO / CREACION DE NUEVOS PRESTAMOS
const handleSubmit = (e) => {
  e.preventDefault()

  const target = e.target;
  const nuevoPrestamo = new Prestamo(target.nombre.value, target.email.value, target.direccion.value, target.monto.value, target.cuotas.value)
  const nombre = target.nombre.value;
  const direccion = target.direccion.value;
  const email = target.email.value;
  const contrasena = target.contrasena.value;

  //ERROR FALTANTE DE DATOS
  if (!nombre || !direccion || !email || !contrasena) {
    error.style.display = 'block';
    return
  }
  else {
    error.style.display = 'none';
  }

  mostrarPrestamo(nuevoPrestamo, prestamosCliente);
};

plazos();
formulario.onsubmit = handleSubmit;