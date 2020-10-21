import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarrosService } from '../../services/carros.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public marcas:any[];
  public validador = false;
  public validador2 = false;
  public validador3 = false;
  public talleres:any;
  public datosTaller:any;
  constructor(private carroService:CarrosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMarca();
  }

  agregarMarca(){
    this.validador = true
}

agregarPieza(pieza,marca){
  this.carroService.getPiezaCarro(marca.value,pieza.value).subscribe(pieza=>{
    console.log(pieza);
    this.talleres = pieza
    this.validador2 = true
  })
}

agregarTaller(taller){

  for(let i = 0; i< this.talleres.length;i++){
  
    if(this.talleres[i].id==taller.value){
      console.log(this.talleres[i]);
      this.datosTaller = this.talleres[i];
      this.validador3 = true
    }
  }
}


  getMarca(){
    this.carroService.getCarMarca$().subscribe(carro=>{
      console.log(carro);
      this.marcas = carro;
 
    })
  }

  openModalCar(content) {
    this.modalService.open(content);
  }

  openModalmotorcycle(content){
    this.modalService.open(content);
  }


}
