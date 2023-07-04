if (document.querySelector('.container')) {
    const formContainer = document.getElementById('form-container');
    const login = document.querySelector('.login-link');
    const register = document.querySelector('.register-link');

    register.addEventListener('click', () => {
        formContainer.classList.add('open');
    })

    login.addEventListener('click', () => {
        formContainer.classList.remove('open');
    })

    document.getElementById('btn-register').addEventListener('click', (e) => {
        e.preventDefault()
        let name = document.getElementById('name')
        let email = document.getElementById('email-register')
        let password = document.getElementById('password-register')

        const dataUser = {
            name: name.value,
            email: email.value,
            password: password.value
        }

        let data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dataUser)
        }

        fetch('http://localhost:3000/api/login/user', data)
            .then(res => res.json())
            .then(data => window.location.reload())
    })


    const loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let username = document.getElementById('username').value
        let password = document.getElementById('password-login').value

        const objLogin = {
            username,
            password
        }

        let data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(objLogin)
        }

        fetch('http://localhost:3000/api/login/login', data)
            .then(res => {
                console.log(res)
                return res.status == 404
                ?alert('contraseña incorrecta')
                : res.json()           
            })
            .then(data =>{
                console.log(data)
                if(data !== undefined){
                   console.log('voy ingresando')
                   window.location = 'recepcion.html'
                }
            })
    })
}



// todo el registro
if (document.getElementById('container')) {
    const siteFormClient = document.querySelector('.site-forms-client')
    const btnUpdataData = document.getElementById('btn-update-data')
    const btnRegisterData = document.getElementById('btn-register-data')

    btnUpdataData.addEventListener('click', (e) => {
        e.preventDefault()
        siteFormClient.classList.add('open')
    })

    btnRegisterData.addEventListener('click', (e) => {
        e.preventDefault()
        siteFormClient.classList.remove('open')
    })

    const formRegister = document.getElementById('form-register');
    let tableRegister = document.getElementById('table-register');

    document.addEventListener('DOMContentLoaded', () => {
        callClientes();
        callhabitaciones();
        callReservation();
    });

    const callClientes = () => {
        fetch('http://localhost:3000/api/clientes')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let lista = ''
                data.forEach(element => {
                    lista +=
                        `<tr>
                    <td>${element.dni}</td>
                    <td>${element.nombre}</td>
                    <td>${element.apellido}</td>
                </tr>`
                });

                tableRegister.innerHTML += lista
            })
    };

    const objetoRegisterClientes = () => {
        let nombre = document.querySelector('#nombre').value
        let apellido = document.querySelector('#apellido').value
        let dni = document.querySelector('#dni').value

        //VALIDACION DE FORMULARIO DESOCUPAR
        if (!nombre) {
            alert('Olvidaste ingresar el nombre del cliente')
        } else if (!apellido) {
            alert('Olvidaste ingresar el apellido')
        } else if (!dni) {
            alert('Olvidaste ingresar el dni')
        } else {
            return {
                nombre,
                apellido,
                dni
            }
        }
    };

    formRegister.addEventListener('submit', (e) => {
        e.preventDefault()

        let clients = objetoRegisterClientes()
        console.log(clients)
        fetch('http://localhost:3000/api/clientes')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let filtrarClientes = data.filter(cliente => cliente.nombre === clients.nombre && cliente.apellido === clients.apellido)
                console.log(filtrarClientes)
                //condicional ternario
                filtrarClientes.length > 0
                    ? alert(`El clientes ${filtrarClientes.nombre} ${filtrarClientes.apellido}, ya esta registrado`)
                    : fetch('http://localhost:3000/api/clientes', {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(clients)
                    })
                        .then(res => res.json())
                        .then(data => window.location.reload())
            })
        formRegister.reset()
    });

    const formUpdate = document.getElementById('form-update')

    formUpdate.addEventListener("submit", (e) => {
        e.preventDefault()
        let oldDni = document.getElementById('old-dni').value
        let newDni = document.getElementById('new-dni').value
        let newNombre = document.getElementById('new-nombre').value
        let newApellido = document.getElementById('new-apellido').value

        const dataUpdate = {
            oldDni,
            newDni,
            newNombre,
            newApellido
        }

        fetch('http://localhost:3000/api/clientes', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataUpdate)
        })

            .then(res => res.json())
            .then(data => window.location.reload())
        formUpdate.reset()
    });

    const formReservation = document.getElementById('form-reservation');
    console.log(formReservation)

    const objetoReservas = () => {
        let cliente = document.getElementById('dni-check').value
        let habitacion = document.getElementById('habitacion').value
        let fechaCheckIn = document.getElementById('fecha-in').value
        let fechaCheckOut = document.getElementById('fecha-out').value
        //VALIDACION DE FORMULARIO DESOCUPAR
        if (!cliente) {
            alert('Olvidaste ingresar el DNI del cliente')
        } else if (!habitacion) {
            alert('Olvidaste ingresar numero de habiatcion, Recuerda que es un Numero del 1 - 8 y NO un caracter del A-Z')
        } else {
            //convierte en string separado por comas split
            //comprobarciones si las fechas son iguales o pasadas
            if (new Date(fechaCheckIn.split('/', 3).join()).getTime() <= new Date().getTime())
                return alert(`La fecha ${fechaCheckIn} es pasado al de hoy ${new Date()} INGRESA UN FECHA DESPUES DE AHORA O DEL DIA DE RESERVA.`)
            if (new Date(fechaCheckOut.split('/', 3).join()).getTime() <= new Date().getTime()) return alert(`La fecha ${fechaCheckOut} es pasado al de hoy ${new Date()} ingresa una fecha mayor a la de ahora y a la ${fechaCheckIn}.`)

            if (new Date(fechaCheckIn.split('/', 3).join()).getTime() == new Date(fechaCheckOut.split('/', 3).join()).getTime()) return alert(`La fecha ${fechaCheckOut} es igual a la de la feha ${fechaCheckIn}. No puedes reservar la misma fecha de entrada y salida.`)

            return {
                cliente,
                habitacion,
                fechaCheckIn,
                fechaCheckOut
            }
        }
    };

    formReservation.addEventListener("submit", (e) => {
        e.preventDefault()
        let reservas = objetoReservas()
        //retrona la alerta si la fecha es menor al de hoy
        if (reservas === undefined) return reservas
        console.log(reservas)
        //respuesta de clientes
        fetch('http://localhost:3000/api/clientes')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let existCliente = data.filter(cliente => cliente.dni === reservas.cliente)
                console.log(existCliente)

                if (existCliente.length > 0) {
                    console.log('el cliente esta registrado sigue el proceso de reservar ahora ver la habitacion si esta disponible')
                    //respuesta de la habitacion
                    callHabitacion(reservas)

                } else {
                    alert(`El cliente no se encuentra registrado, Por favor registrese antes de continuar con la reserva`)
                }
            })
        formReservation.reset()
    });

    const callHabitacion = (reservas) => {
        fetch('http://localhost:3000/api/habitaciones')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let estadoReserva = data.filter(reserva => reserva.habitacionN === reservas.habitacion)
                console.log(estadoReserva)
                console.log(Array.isArray(estadoReserva))
                //si el numero de habitacion en diferente de los 8
                if (estadoReserva.length === 0) {
                    return alert('Numero de habitacion es incorrecta, En nuestro hotel tenemos 8 habitaciones de lujo')
                } else {
                    if (estadoReserva[0].estado === "ocupado") {
                        return alert(`la habitacion ${estadoReserva[0].habitacionN} esta ocupado`)
                        //aqui verificar si las habiatciones estas ocupadas o desocupadas
                    } else {
                        fetch('http://localhost:3000/api/reservas', {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(reservas)

                        })
                        console.log(`Se ha registrado al cliente ${reservas.cliente}, en la habitacion ${reservas.habitacion} del ${reservas.fechaCheckIn} hasta ${reservas.fechaCheckOut}`)
                        //funcion actualiza datos de habitacion
                        updateStatusRoom(reservas)
                    }
                }
            })
    };

    const updateStatusRoom = (reservas) => {
        const estadoHabitacion = {
            habitacionN: reservas.habitacion,
            newEstado: "ocupado"
        }
        console.log(estadoHabitacion)
        //enviar estado de la habiatcion a ocupado
        fetch('http://localhost:3000/api/habitaciones/actualizar', {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(estadoHabitacion)
        })
            .then(res => res.json())
            .then(data => window.location.reload())
    };

    const tableStatusHabitacion = document.getElementById('table-habitacion')

    const callhabitaciones = () => {
        fetch('http://localhost:3000/api/habitaciones')
            .then(res => res.json())
            .then(data => {
                let lista = ''
                data.forEach(element => {
                    lista +=
                        `<tr>
                    <td>${element.habitacionN}</td>
                    <td>${element.estado}</td>
                </tr>`
                });
                tableStatusHabitacion.innerHTML += lista

                // const changeButtons =  document.querySelector('button')
                // callReservation(changeButtons)
            })
    };

    const tableReserva = document.getElementById('table-reservas')

    const callReservation = () => {
        fetch('http://localhost:3000/api/reservas')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let lista = ''
                data.forEach(element => {
                    lista +=
                        `<tr>
                <td>${element.cliente}</td>
                <td>${element.habitacion}</td>
                <td>${element.fechaCheckIn}</td>
                <td>${element.fechaCheckOut}</td>
            </tr>`
                });
                tableReserva.innerHTML += lista
            })
    }

    const formFree = document.getElementById('form-free')

    formFree.addEventListener('submit', (e) => {
        e.preventDefault()

        let dniCliente = document.getElementById('dni-free').value
        let habitacionN = document.getElementById('room-free').value
        //LLAMAR PARA NO DEJAR QUE ENTRE SI EL DNI ES INCRRECTO
        fetch(`http://localhost:3000/api/reservas/${dniCliente}`)
            .then(res => res.json())
            .then(data => {
                //alert('El dni del cliente no es valido')
                console.log(data)
                //VALIDACION DE FORMULARIO DESOCUPAR
                if (!dniCliente) {
                    alert('Olvidaste ingresar el Dni Cliente:')
                } else if (!habitacionN) {
                    alert('Olvidaste ingresar el Numero de habitacion a DESOCUPAR')
                } else {

                    const freeHabitacion = {
                        dniCliente,
                        habitacionN,
                        newEstado: "libre"
                    }


                    //sendDataReserAndFree(freeHabitacion)
                    //  const callData = callReservation(data)

                    //seria llamar callreservation
                    //traer reserva lista y comparar con el objto 
                    //si cliente y habiatacion es igual al del objeto eliminar
                    //mandar dni al reservas para eliminar y no habitacion
                    fetch('http://localhost:3000/api/reservas/borrar', {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(freeHabitacion)
                    })
                        .then(res => res.json())
                        .then(data => window.location.reload())

                    fetch('http://localhost:3000/api/habitaciones/actualizar', {
                        method: 'put',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(freeHabitacion)
                    })
                        .then(res => res.json())
                        .then(data => window.location.reload())
                    //formFree.reset()
                }
            })


    })



    //al liberar habitacion verificar que tanto n habi y dni sean iguales
    //colocar fechas a los estados de las habitaciones
    // hacer dos index trabajos y app
    //validar fromulariso con if
    //hacer grid para posicionar los formularios
    //arreglar botones
}

