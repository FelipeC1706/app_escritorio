export class Pokemon {
  _id;
  _nombremascota;
  _raza;
  _color;
  _tamaño;
  _nombredueño;
  _telefono;
  _observaciones;
 

  constructor(id, nombremascota, raza, color, tamaño, nombredueño, telefono, observaciones) {
    this._id = id;
    this._nombremascota = nombremascota;
    this._raza = raza;
    this._color = color;
    this._tamaño = tamaño;
    this._nombredueño = nombredueño;
    this._telefono = telefono;
    this._observaciones = observaciones;
  }

  get id() {
    return this._id;
  }

  get nombremascota() {
    return this._nombremascota;
  }

  set nombremascota(nombremascota) {
    this._nombremascota = nombremascota;
  }

  get raza() {
    return this._raza;
  }

  set raza(raza) {
    this._raza = raza;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }

  get tamaño() {
    return this._tamaño;
  }

  set tamaño(tamaño) {
    this._tamaño = tamaño;
  }

  get nombredueño() {
    return this._nombredueño;
  }

  set nombredueño(nombredueño) {
    this._nombredueño = nombredueño;
  }

  get telefono() {
    return this._telefono;
  }

  set telefono(telefono) {
    this._telefono = telefono;
  }

  get observaciones() {
    return this._observaciones;
  }

  set observaciones(observaciones) {
    this._observaciones = observaciones;
  }
};