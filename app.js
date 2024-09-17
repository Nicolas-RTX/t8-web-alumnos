// ### // Obtener dirección de la API // ### //

const apiUrl = 'http://localhost/api-personas/src/';

// ### // Obtener los elementos del DOM // ### //

const alumnoForm = document.getElementById('alumnoFormulario');

const idInput = document.getElementById('alumnoId');
const dniInput = document.getElementById('dni');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const cursoInput = document.getElementById('curso');
const divisionInput = document.getElementById('division');

const alumnosTabla = document.getElementById('alumnosTabla').querySelector('tbody');
const submitBtn = document.getElementById('submit-btn');

// ### // Función para obtener todos los alumnos // ### //

async function getAlumnos() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    alumnosTabla.innerHTML = '';
    data.forEach(alumno => {
        alumnosTabla.innerHTML += `
            <tr>
                <td>${alumno.dni}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.curso}</td>
                <td>${alumno.division}</td>
                <td>
                    <button onclick="editAlumno(${alumno.id})">Editar</button>
                    <button onclick="deleteAlumno(${alumno.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// ### // Función para crear o actualizar un alumno // ### //

async function saveAlumno(e) {
    e.preventDefault();

    const alumno = {
        dni: dniInput.value,
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        curso: cursoInput.value,
        division: divisionInput.value
    };

    const id = idInput.value;
    let method = 'POST';
    let url = apiUrl;

    if (id) {
        method = 'PUT';
        alumno.id = id;
        url = `${apiUrl}?id=${id}`;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumno)
    });

    const result = await response.json();
    alert(result.message);

    resetForm();
    getAlumnos();
}

// ### // Función para editar un alumno (cargar los datos en el formulario) // ### //

async function editAlumno(id) {
    const response = await fetch(`${apiUrl}?id=${id}`);
    const data = await response.json();

    idInput.value = data.id;
    dniInput.value = data.dni;
    nombreInput.value = data.nombre;
    apellidoInput.value = data.apellido;
    cursoInput.value = data.curso;
    divisionInput.value = data.division;

    submitBtn.textContent = 'Actualizar Alumno';
}

// ### // Función para eliminar un alumno // ### //

async function deleteAlumno(id) {
    const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    });

    const result = await response.json();
    alert(result.message);

    getAlumnos();
}

// ### // Resetear formulario // ### //

function resetForm() {
    idInput.value = '';
    dniInput.value = '';
    nombreInput.value = '';
    apellidoInput.value = '';
    cursoInput.value = '';
    divisionInput.value = '';
    submitBtn.textContent = 'Guardar Alumno';
}

// ### // Inicializar eventos // ### //

alumnoForm.addEventListener('submit', saveAlumno);

// ### // Cargar los alumnos al cargar la página // ### //

getAlumnos();
