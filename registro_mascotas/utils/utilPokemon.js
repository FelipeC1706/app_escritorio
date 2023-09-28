let timeoutId = 0;

export const generateId = () => {

  if (localStorage.getItem('crud-pokemons-id')) {
    let id = +localStorage.getItem('crud-pokemons-id');
    localStorage.setItem('crud-pokemons-id', ++id);
    return id;
  } else {
    localStorage.setItem('crud-pokemons-id', 1);
    return 1;
  }
};

export const showAlert = (type, content) => {
  const contenedorAlerta = document.querySelector('#contenedorAlerta');
  clearTimeout(timeoutId);
  contenedorAlerta.classList.remove('bg-primary');
  contenedorAlerta.classList.remove('bg-success');
  contenedorAlerta.classList.remove('bg-danger');
  contenedorAlerta.classList.add(type);
  contenedorAlerta.innerHTML = content;
  timeoutId = setTimeout(() => {
    contenedorAlerta.innerHTML = '';
  }, 5000);
};

export const getFormData = () => {
  const documentFormPokemon = document.forms['formPokemon'];
  const id = documentFormPokemon['id'].value;
  const nombremascota = documentFormPokemon['nombremascota'].value;
  const raza = documentFormPokemon['raza'].value;
  const color = documentFormPokemon['color'].value;
  const tamaño = documentFormPokemon['tamaño'].value;
  const nombredueño = documentFormPokemon['nombredueño'].value;
  const telefono = documentFormPokemon['telefono'].value;
  const observaciones = documentFormPokemon['observaciones'].value;

  return ({ id, nombremascota, raza, color, tamaño, nombredueño, telefono, observaciones });
};

export const validateForm = () => {
  const documentFormPokemon = document.forms['formPokemon'];
  const nombremascota = documentFormPokemon['nombremascota'].value;
  const raza = documentFormPokemon['raza'].value;
  const color = documentFormPokemon['color'].value;
  const tamaño = documentFormPokemon['tamaño'].value;
  const nombredueño = documentFormPokemon['nombredueño'].value;
  const telefono = documentFormPokemon['telefono'].value;
  const observaciones = documentFormPokemon['observaciones'].value;

  return [nombremascota.trim(), raza.trim(), color.trim(), tamaño.trim(), nombredueño.trim(), telefono.trim(), observaciones.trim()].includes('');
};

export const resetForm = () => {
  const documentFormPokemon = document.forms['formPokemon'];
  documentFormPokemon['id'].value = '';
  documentFormPokemon['nombremascota'].value = '';
  documentFormPokemon['raza'].value = '';
  documentFormPokemon['color'].value = '';
  documentFormPokemon['tamaño'].value = '';
  documentFormPokemon['nombredueño'].value = '';
  documentFormPokemon['telefono'].value = '';
  documentFormPokemon['observaciones'].value = '';
};