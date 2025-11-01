let citas = [];
let editIndex = null;
let deleteIndex = null;
let nextId = 1;

// Configuración de imágenes
const imagenes = {
    "Perro": "./imagenes/pluto.gif",
    "Gato": "./imagenes/gato.gif",
    "Pájaro": "https://cdn.pixabay.com/animation/2023/01/16/09/19/09-19-03-257_512.gif",
    "Hámster": "https://i.gifer.com/origin/0a/0a6246318077e29154d87bb9a30478fb_w200.gif",
    "Ratón": "./imagenes/Raton.gif",
    "Pez": "./imagenes/pez.gif",
    "Conejo": "./imagenes/conejo.gif",
    "Serpiente": "./imagenes/serpiente.gif",
    "Hurón": "https://i.pinimg.com/originals/41/5f/1e/415f1effa9a1b9e90ef213bf80e38b95.gif",
    "Mini Pig": "./imagenes/minipink.webp"
};

// Tipos de mascota basados en las imágenes disponibles
const tiposMascota = Object.keys(imagenes);

// Configurar tipos de mascota en el select
const tipoSelect = document.getElementById('tipo');
tiposMascota.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.textContent = tipo;
    tipoSelect.appendChild(option);
});

// Contador de caracteres
document.getElementById('sintomas').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').textContent = `${charCount}/400 caracteres`;
});

// Evento para el formulario
document.getElementById('citaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    enviar();
});

// Validaciones individuales
function validarNombre(nombre) {
    if (!nombre.trim()) {
        Swal.fire({
            title: "Error",
            text: "El nombre de la mascota es obligatorio",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    if (nombre.length > 50) {
        Swal.fire({
            title: "Error",
            text: "El nombre no puede exceder los 50 caracteres",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    return true;
}

function validarPropietario(propietario) {
    if (!propietario.trim()) {
        Swal.fire({
            title: "Error",
            text: "El nombre del propietario es obligatorio",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    if (propietario.length > 50) {
        Swal.fire({
            title: "Error",
            text: "El nombre del propietario no puede exceder los 50 caracteres",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    return true;
}

function validarTelefono(telefono) {
    if (!telefono.trim()) {
        Swal.fire({
            title: "Error",
            text: "El teléfono es obligatorio",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    if (!/^\d{10}$/.test(telefono)) {
        Swal.fire({
            title: "Error",
            text: "El teléfono debe tener exactamente 10 dígitos",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    return true;
}

function validarTipo(tipo) {
    if (!tipo) {
        Swal.fire({
            title: "Error",
            text: "Debe seleccionar un tipo de mascota",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    return true;
}

function validarFecha(fecha) {
    if (!fecha) {
        Swal.fire({
            title: "Error",
            text: "La fecha es obligatoria",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaSeleccionada = new Date(anio, mes - 1, dia);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);

    if (fechaSeleccionada < manana) {
        Swal.fire({
            title: "Error",
            text: "La fecha debe ser a partir de mañana. No se permiten fechas anteriores ni la de hoy.",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    return true;
}

function validarHora(hora) {
    if (!hora) {
        Swal.fire({
            title: "Error",
            text: "La hora es obligatoria",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }

    const [horaCita] = hora.split(':').map(Number);
    if (horaCita < 8 || horaCita >= 20) {
        Swal.fire({
            title: "Error",
            text: "El horario de atención es de 8:00 AM a 8:00 PM",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    return true;
}

function validarSintomas(sintomas) {
    if (!sintomas.trim()) {
        Swal.fire({
            title: "Error",
            text: "Los síntomas son obligatorios",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    if (sintomas.length > 400) {
        Swal.fire({
            title: "Error",
            text: "Los síntomas no pueden exceder 400 caracteres",
            icon: "error",
            confirmButtonText: "Entendido"
        });
        return false;
    }
    return true;
}

function enviar() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const propietario = document.getElementById('propietario').value;
    const telefono = document.getElementById('telefono').value;
    const tipo = document.getElementById('tipo').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const sintomas = document.getElementById('sintomas').value;

    // Validar cada campo individualmente
    if (!validarNombre(nombre)) return;
    if (!validarPropietario(propietario)) return;
    if (!validarTelefono(telefono)) return;
    if (!validarTipo(tipo)) return;
    if (!validarFecha(fecha)) return;
    if (!validarHora(hora)) return;
    if (!validarSintomas(sintomas)) return;

    // Crear objeto de cita
    const cita = {
        id: editIndex !== null ? citas[editIndex].id : nextId++,
        nombre: nombre.trim(),
        propietario: propietario.trim(),
        telefono: telefono.trim(),
        tipo,
        fecha,
        hora,
        sintomas: sintomas.trim(),
        estado: 'Abierta'
    };

    // Agregar o editar cita
    if (editIndex !== null) {
        citas[editIndex] = cita;
        editIndex = null;
        Swal.fire({
            title: "¡Éxito!",
            text: "Cita actualizada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    } else {
        citas.push(cita);
        Swal.fire({
            title: "¡Éxito!",
            text: "Cita creada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }

    // Ordenar citas
    citas.sort((a, b) => {
        const fechaA = new Date(`${a.fecha}T${a.hora}`);
        const fechaB = new Date(`${b.fecha}T${b.hora}`);
        return fechaA - fechaB;
    });

    // Guardar en Local Storage
    localStorage.setItem('citasVeterinaria', JSON.stringify(citas));

    // Limpiar formulario
    document.getElementById('citaForm').reset();
    document.getElementById('charCount').textContent = '0/400 caracteres';

    // Cerrar modal usando el sistema de hash
    window.location.hash = '#';

    // Mostrar citas
    mostrarCitas(citas);
}

function mostrarCitas(array) {
    const citasContainer = document.getElementById('citasContainer');
    citasContainer.innerHTML = '';

    if (array.length === 0) {
        citasContainer.innerHTML = '<p>No hay citas para mostrar</p>';
        return;
    }

    array.forEach((cita, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        // Obtener la imagen correspondiente al tipo de mascota
        const imagenSrc = imagenes[cita.tipo] || './imagenes/default.png';
        const imagenMascota = `<img src="${imagenSrc}" alt="${cita.tipo}" class="pet-icon">`;

        card.innerHTML = `
            <div class="card-body"> <section class="card-header"><h3>Cita #${cita.id}</h3>  <span class="estado ${cita.estado.toLowerCase()}">${cita.estado}</span>   </section>
               <section class="name-img"> <span class="name">  ${cita.nombre} </span> <span class="pictura">  ${imagenMascota} </span>  </section>
             
                 <div class="detalles">  <p><strong>Propietario:</strong> ${cita.propietario}</p>
                <p><strong>Teléfono:</strong> ${cita.telefono}</p>
                <p><strong>Fecha:</strong> ${formatearFechaLocal(cita.fecha)}</p>
                <p><strong>Hora:</strong> ${cita.hora}</p>
                <p><strong>Síntomas:</strong> ${cita.sintomas}</p>  </div> 
              
                <div class="botones">
                    <button onclick="editarCita(${index})">Editar</button>
                    <button onclick="solicitarEliminacion(${index})">Eliminar</button>
                    <select onchange="cambiarEstado(${index}, this.value)">
                        <option value="Abierta" ${cita.estado === 'Abierta' ? 'selected' : ''}>Abierta</option>
                        <option value="Terminada" ${cita.estado === 'Terminada' ? 'selected' : ''}>Terminada</option>
                        <option value="Anulada" ${cita.estado === 'Anulada' ? 'selected' : ''}>Anulada</option>
                    </select>
                </div>
            </div>
        `;
        citasContainer.appendChild(card);
    });
}

function formatearFechaLocal(fechaString) {
    const partes = fechaString.split('-');
    const fecha = new Date(partes[0], partes[1] - 1, partes[2]);
    return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '-');
}

function editarCita(index) {
    const cita = citas[index];

    document.getElementById('nombre').value = cita.nombre;
    document.getElementById('propietario').value = cita.propietario;
    document.getElementById('telefono').value = cita.telefono;
    document.getElementById('tipo').value = cita.tipo;
    document.getElementById('fecha').value = cita.fecha;
    document.getElementById('hora').value = cita.hora;
    document.getElementById('sintomas').value = cita.sintomas;
    document.getElementById('charCount').textContent = `${cita.sintomas.length}/400 caracteres`;

    editIndex = index;
    window.location.hash = 'vetModal';
}

function solicitarEliminacion(index) {
    deleteIndex = index;
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarEliminacion(true);
        } else {
            confirmarEliminacion(false);
        }
    });
}

function confirmarEliminacion(confirmado) {
    window.location.hash = '#';

    if (confirmado && deleteIndex !== null) {
        citas.splice(deleteIndex, 1);
        localStorage.setItem('citasVeterinaria', JSON.stringify(citas));
        mostrarCitas(citas);
        Swal.fire({
            title: "Eliminada",
            text: "La cita ha sido eliminada",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }
    deleteIndex = null;
}

function cambiarEstado(index, nuevoEstado) {
    citas[index].estado = nuevoEstado;
    localStorage.setItem('citasVeterinaria', JSON.stringify(citas));
    mostrarCitas(citas);
}

function filtrarPorEstado(estado) {
    if (!estado) {
        mostrarCitas(citas);
        return;
    }
    const citasFiltradas = citas.filter(cita => cita.estado === estado);
    mostrarCitas(citasFiltradas);
}

function buscarCitas() {
    const termino = document.getElementById('searchInput').value.toLowerCase();
    if (!termino) {
        mostrarCitas(citas);
        return;
    }

    const citasFiltradas = citas.filter(cita =>
        cita.nombre.toLowerCase().includes(termino) ||
        cita.propietario.toLowerCase().includes(termino)
    );
    mostrarCitas(citasFiltradas);
}

// Mostrar citas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const citasGuardadas = localStorage.getItem('citasVeterinaria');
    if (citasGuardadas) {
        citas = JSON.parse(citasGuardadas);
        nextId = citas.length > 0 ? Math.max(...citas.map(c => c.id)) + 1 : 1;
    }
    mostrarCitas(citas);
});