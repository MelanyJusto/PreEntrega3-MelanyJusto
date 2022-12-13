//CLASE PARA CREAR OBJETO PRESTAMO
class Prestamo {
    constructor(nombre, email, monto, cuotas) {
        this.nombre = nombre,
        this.email = email,
        this.monto = monto,
        this.cuotas = cuotas
    }
}

const formulario = document.getElementById('formularioPrestamo');

const prestamoFinal = document.getElementById('nuevoPrestamo');

const storage = 'prestamoFinal';

//MOSTRAR PRESTAMO REALIZADO EN DOM
const mostrarPrestamo = (prestamo) => {
    prestamoFinal.innerHTML = `
    <div>
      <div>
        <h1>Sr/Sra ${prestamo.nombre}, esta a punto de solicitar su presamo:</h1>
      </div>
      <ul>
      <li>Monto a solicitar: ${prestamo.monto}</li>
      <li>Cuotas: ${prestamo.cuotas}</li>
      <li>Dinero a devolver: ${parseInt(prestamo.monto) + parseInt(prestamo.monto) * 10 * parseInt(prestamo.cuotas) / 100}</li>
      </ul>
      <div>
      <input type="submit" value="Confirmar Prestamo">
      </div>
    </div>
    `
}

const handleSubmit = (e) => {
    e.preventDefault()
    const target = e.target;
    const nuevoPrestamo = new Prestamo(target.nombre.value, target.email.value, target.monto.value, target.cuotas.value)

    localStorage.setItem(storage, JSON.stringify(nuevoPrestamo))
    mostrarPrestamo(nuevoPrestamo);
}

formulario.onsubmit = handleSubmit;

console.log(formulario);
