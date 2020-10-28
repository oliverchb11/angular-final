import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { v4 as uuidv4 } from "uuid";
@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  constructor(private afs: AngularFirestore) { }


  getListato(tipo:string):Promise<firebase.firestore.DocumentData>{
    return this.afs.collection('Listado').ref.where("TIPO", "==" , `${tipo}`).get();
  }
  getTipo(vehiculo:string):Promise<firebase.firestore.DocumentData>{
    return this.afs.collection('TIPO').ref.where("VEHICULO", "==" , `${vehiculo}`).get();
  }

  getCaracteristicas(vehiculo,marca,accesorio):Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.afs.collection(vehiculo).ref.where("MARCA" , "==" , `${marca}` ).where("TIPO" , "==" , `${accesorio}`).get();
  }


  postPrecios(precio,marca,accesorio){

    const data = {
      precio,
      marca,
      accesorio
    }
    this.afs.collection('PRECIOS').doc(uuidv4()).set(data);
  }

}
