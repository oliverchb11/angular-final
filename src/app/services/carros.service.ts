import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  constructor(private afs: AngularFirestore) { }


  getCarMarca$
  (){
  return  this.afs.collection('CARROS').valueChanges({idField: 'id'});
  }


  getPiezaCarro(marca,pieza){
    return  this.afs.collection('CARROS').doc(marca).collection(pieza).valueChanges({idField: 'id'})
  }

}
