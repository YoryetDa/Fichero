document.addEventListener('DOMContentLoaded', function() {
    const instituciones = ["Institución A", "Institución B", "Institución C"];

    // Función para cargar doctores desde el localStorage o usar los iniciales si no existen
    const cargarDoctores = () => {
        const doctoresGuardados = localStorage.getItem('doctores');
        return doctoresGuardados ? JSON.parse(doctoresGuardados) : [
            {
                nombre: "Dr. Carlos",
                apellido: "Martinez",
                emails: ["carlos.martinez@institucion.com"],
                telefonos: ["123456789"],
                especialidad: "Cardiología",
                instituciones: ["Institución A"],
                notas: "Nota inicial",
                historico: "2024-01-01: Creado\n",
                ultimaActualizacion: "2024-01-01",
                actualizadoPor: "admin",
                visitas: "2024-01-01: Primera visita\n"
            },
            {
                nombre: "Dr. Laura",
                apellido: "González",
                emails: ["laura.gonzalez@institucion.com"],
                telefonos: ["987654321"],
                especialidad: "Dermatología",
                instituciones: ["Institución B"],
                notas: "Nota inicial",
                historico: "2024-01-02: Creado\n",
                ultimaActualizacion: "2024-01-02",
                actualizadoPor: "admin",
                visitas: "2024-01-02: Primera visita\n"
            },
            {
                nombre: "Dr. Pedro",
                apellido: "López",
                emails: ["pedro.lopez@institucion.com"],
                telefonos: ["111222333"],
                especialidad: "Neurología",
                instituciones: ["Institución C"],
                notas: "Nota inicial",
                historico: "2024-01-03: Creado\n",
                ultimaActualizacion: "2024-01-03",
                actualizadoPor: "admin",
                visitas: "2024-01-03: Primera visita\n"
            },
            {
                nombre: "Dr. María",
                apellido: "Fernández",
                emails: ["maria.fernandez@institucion.com"],
                telefonos: ["444555666"],
                especialidad: "Pediatría",
                instituciones: ["Institución A", "Institución B"],
                notas: "Nota inicial",
                historico: "2024-01-04: Creado\n",
                ultimaActualizacion: "2024-01-04",
                actualizadoPor: "admin",
                visitas: "2024-01-04: Primera visita\n"
            }
        ];
    };

    const actualizarContadores = () => {
        const doctoresGuardados = JSON.parse(localStorage.getItem('doctores')) || [];
        document.getElementById('contador-doctores').innerText = doctoresGuardados.length;
    };

    let doctores = cargarDoctores();

    if (!localStorage.getItem('doctores')) {
        localStorage.setItem('doctores', JSON.stringify(doctores));
    }

    const guardarDoctores = () => {
        localStorage.setItem('doctores', JSON.stringify(doctores));
        actualizarContadores();

    };

    // Función para renderizar la lista de doctores
    const renderizarDoctores = () => {
        const lista = document.getElementById('doctores-lista');
        if (!lista) return; // Verificación agregada

        lista.innerHTML = '';
        doctores.forEach((doctor, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${doctor.nombre || ''}</td>
                <td>${doctor.apellido || ''}</td>
                <td>${(doctor.emails || []).join(', ')}</td>
                <td>${(doctor.telefonos || []).join(', ')}</td>
                <td>${doctor.especialidad || ''}</td>
                <td>${(doctor.instituciones || []).join(', ')}</td>
                <td>${doctor.notas || ''}</td>
                <td>${doctor.visitas || ''}</td>
                <td>
                    <button class="btn btn-info btn-ver" data-index="${index}">Ver</button>
                    <button class="btn btn-warning btn-editar" data-index="${index}">Editar</button>
                    <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;

            lista.appendChild(row);
        });

        // Asignar eventos a los botones
        document.querySelectorAll('.btn-ver').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                verDoctor(index);
            });
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editarDoctor(index);
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                eliminarDoctor(index);
            });
        });
    };

    
    // Función para ver un doctor (mostrar modal con información)
    const verDoctor = (index) => {
        const doctor = doctores[index];
        alert(`Doctor: ${doctor.nombre} ${doctor.apellido}\nEmails: ${(doctor.emails || []).join(', ')}\nTeléfonos: ${(doctor.telefonos || []).join(', ')}\nEspecialidad: ${doctor.especialidad}\nInstituciones: ${(doctor.instituciones || []).join(', ')}\nNotas: ${doctor.notas}\nVisitas: ${doctor.visitas}`);
    };

    // Función para editar un doctor
    const editarDoctor = (index) => {
        // Implementa la lógica para editar un doctor aquí
        alert('Función de editar doctor aún no implementada.');
    };

    // Función para eliminar un doctor
    const eliminarDoctor = (index) => {
        if (confirm('¿Estás seguro de que deseas eliminar este doctor?')) {
            doctores.splice(index, 1);
            guardarDoctores();
            renderizarDoctores();
        }
    };

    renderizarDoctores();
    actualizarContadores();
});
