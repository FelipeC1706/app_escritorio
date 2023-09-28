import { generateId, getFormData, resetForm, showAlert, validateForm } from "../utils/utilPokemon.js";
import { Pokemon } from "./Pokemon.js";

const crudPokemon = () => {
  const pokemonsData = 'crud-pokemons';
  let pokemons = [];

  const formPokemon = document.querySelector('#formPokemon');

  const createPokemon = () => {
    const { nombremascota, raza, color, tamaño, nombredueño, telefono, observaciones } = getFormData();
    if (validateForm()) {
      showAlert('bg-danger', 'Completar todos los campos');
    } else {
      pokemons = [...pokemons, new Pokemon(generateId(), nombremascota, raza, color, tamaño, nombredueño, telefono, observaciones)];
      localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
      resetForm();
      readPokemons();
      showAlert('bg-primary', 'Registro creado');
    }
  };

  const readPokemons = () => {
    const tBodyPokemon = document.querySelector('#tBodyPokemon');
    tBodyPokemon.innerHTML = '';
    pokemons.forEach((element) => {
      const { _id, _nombremascota, _raza, _color, _tamaño, _nombredueño, _telefono, _observaciones} = element;

      const fragment = document.createDocumentFragment();
      const tableRow = document.createElement('tr');

      const tHId = document.createElement('th');
      tHId.textContent = _id;

      const tDnombremascota = document.createElement('td');
      tDnombremascota.textContent = _nombremascota;

      const tDraza = document.createElement('td');
      tDraza.textContent = _raza;

      const tDcolor = document.createElement('td');
      tDcolor.textContent = _color;

      const tDtamaño = document.createElement('td');
      tDtamaño.textContent = _tamaño;

      const tDnombredueño = document.createElement('td');
      tDnombredueño.textContent = _nombredueño;

      const tDtelefono = document.createElement('th');
      tDtelefono.textContent = _telefono;

      const tDobservaciones = document.createElement('th');
      tDobservaciones.textContent = _observaciones;
      

      const tDActions = document.createElement('td');

      const tDButtonRead = document.createElement('button');
      tDButtonRead.textContent = '✏';
      tDButtonRead.addEventListener('click', () => readPokemon(_id));
      tDButtonRead.classList.add(...['bg-success', 'rounded', 'border-0', 'mx-1', 'p-0']);

      const tDButtonDelete = document.createElement('button');
      tDButtonDelete.textContent = '🗑';
      tDButtonDelete.addEventListener('click', () => deletePokemon(_id));
      tDButtonDelete.classList.add('bg-danger');
      tDButtonDelete.classList.add('rounded');
      tDButtonDelete.classList.add('border-0');
      tDButtonDelete.classList.add('mx-1');
      tDButtonDelete.classList.add('p-0');

      tDActions.appendChild(tDButtonRead);
      tDActions.appendChild(tDButtonDelete);

      tableRow.appendChild(tHId);
      tableRow.appendChild(tDnombremascota);
      tableRow.appendChild(tDraza);
      tableRow.appendChild(tDcolor);
      tableRow.appendChild(tDtamaño);
      tableRow.appendChild(tDnombredueño);
      tableRow.appendChild(tDtelefono);
      tableRow.appendChild(tDobservaciones);
      tableRow.appendChild(tDActions);
      fragment.appendChild(tableRow);
      tBodyPokemon.appendChild(fragment);
    });
    showAlert('bg-primary', 'Registros leídos');
  };

  const readPokemon = (id) => {
    const documentFormPokemon = document.querySelector('#formPokemon');
    const formTitle = document.querySelector('#formTitle');
    const formButton = document.querySelector('#formButton');

    const pokemon = pokemons.find((element) => {
      return element._id === id;
    });
    const { _id, _nombremascota, _raza, _color, _tamaño, _nombredueño, _telefono, _observaciones } = pokemon;

    formTitle.innerHTML = 'Editar Registro de Mascota';
    formButton.innerHTML = 'Editar';
    documentFormPokemon['id'].value = _id;
    documentFormPokemon['nombremascota'].value = _nombremascota;
    documentFormPokemon['raza'].value = _raza;
    documentFormPokemon['color'].value = _color;
    documentFormPokemon['tamaño'].value = _tamaño;
    documentFormPokemon['nombredueño'].value = _nombredueño;
    documentFormPokemon['telefono'].value = _telefono;
    documentFormPokemon['observaciones'].value = _observaciones;
    showAlert('bg-primary', 'Registro leído');
  };

  const updatePokemon = () => {
    const { id, nombremascota, raza, color, tamaño, nombredueño, telefono, observaciones} = getFormData();
    const formTitle = document.querySelector('#formTitle');
    const formButton = document.querySelector('#formButton');

    if (validateForm()) {
      showAlert('bg-danger', 'Completar todos los campos');
    } else {
      pokemons = pokemons.map((element) => {
        if (element._id !== +id) {
          return element;
        } else {
          element._nombremascota = nombremascota;
          element._raza = raza;
          element._color = +color;
          element._tamaño = tamaño;
          element._nombredueño = nombredueño;
          element._telefono = telefono;
          element._observaciones = observaciones;
          return element;
        }
      });
      localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
      resetForm();
      formTitle.innerHTML = 'Registrar Mascota';
      formButton.innerHTML = 'Registrar';
      readPokemons();
      showAlert('bg-success', 'Registro actualizado');
    }
  };

  const deletePokemon = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: '¡No, cancélalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        pokemons = pokemons.filter((element) => {
          return element._id !== id;
        });
        localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
        readPokemons();
        showAlert('bg-danger', 'Registro eliminado');
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Tu registro ha sido eliminado.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu registro está seguro',
          'error'
        );
      }
    });
  };

  const submitPokemon = (e) => {
    e.preventDefault();
    const id = document.getElementById('formId').value;
    if (id === '') {
      createPokemon();
    } else {
      updatePokemon();
    }
  };

  if (localStorage.getItem(pokemonsData)) {
    pokemons = JSON.parse(localStorage.getItem(pokemonsData));
    // readPokemons();
  } else {
    pokemons = [
     
    ];
    localStorage.setItem(pokemonsData, JSON.stringify(pokemons));
  }

  readPokemons();
  formPokemon.addEventListener('submit', submitPokemon);
}

export default crudPokemon;