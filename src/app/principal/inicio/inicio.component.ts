import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarrosService } from '../../services/carros.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public marcasCarro:any[]=[];
  public marcasMoto:any[]=[];
  public accesoriosCarro:any[]=[];
  public accesoriosMoto:any[]=[];
  public carro = "CARRO"
  public moto = 'MOTO'
  public carros = "CARROS"
  public motos = 'MOTOS'
  public precio:string;
  public marca:string;
  public accesorio:string;
  public divCarro = false;
  public divMoto = false;
  public progreso :string;
  public progreso1 :string;
  public btnDesiable = false;
  public progressBar :boolean;
  public establecimiento : string;
  constructor(private carroService:CarrosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    

  }

  

  //METODOS PARA MOSTRAR INFORMACIÓN DEL CARRO

  async openModalCar(content,carro:string) {
    this.modalService.open(content);
    const [listacarro,tipoCarro] = await Promise.all([
      this.carroService.getListato(carro),
      this.carroService.getTipo(carro)
    ])
    listacarro.forEach((doc)=>{
      this.marcasCarro.push(doc.data().MARCA)
    })
    tipoCarro.forEach((doc2)=>{
       this.accesoriosCarro.push(doc2.data().ACCESORIO)
    })
  }

  async datosCarro(vehiculo:string,marca,accesorio){
   const caracteristicasCarro  = await this.carroService.getCaracteristicas(vehiculo,marca.value,accesorio.value)
    caracteristicasCarro.forEach((result)=>{
      console.log(result.data().PRECIO);
      this.btnDesiable = true
      this.precio = result.data().PRECIO;
      this.establecimiento = result.data().NOMBRE_ESTABLECIMIENTO;
      console.log(`el precio menor es de ${this.precio} del establecimiento ${result.data().NOMBRE_ESTABLECIMIENTO}`);
      this.carroService.postPrecios(result.data().PRECIO,marca.value,accesorio.value);
      this.marca = marca.value;
      this.accesorio = accesorio.value;
    })
  }


  predecirCarro(){
    setTimeout(() => {
      this.progreso = "25"
    }, 1000);
    setTimeout(() => {
      this.progreso = "50"
    }, 2000);
    setTimeout(() => {
      this.progreso = "75"
    }, 3000);
    setTimeout(() => {
      this.progreso = "100"
      setTimeout(() => {
        this.divCarro = true;
      }, 1000);
    }, 4000);
  }  
  //METODOS PARA MOSTRAR INFORMACIÓN DE LA MOTO
  async openModalmotorcycle(content,moto:string){
    this.modalService.open(content);
    const [listamoto,tipoMoto] = await Promise.all([
      this.carroService.getListato(moto),
      this.carroService.getTipo(moto)
    ])
    listamoto.forEach((doc)=>{
      this.marcasMoto.push(doc.data().MARCA)
    })
    tipoMoto.forEach((doc2)=>{
       this.accesoriosMoto.push(doc2.data().ACCESORIO)
    })
  }
  async datosMoto(vehiculo,marca,accesorio){
    const caracteristicasMoto = await this.carroService.getCaracteristicas(vehiculo,marca.value,accesorio.value)
    caracteristicasMoto.forEach((result)=>{
      console.log(result.data().PRECIO);
      this.btnDesiable = true
      this.precio = result.data().PRECIO;
      this.marca = marca.value;
      this.accesorio = accesorio.value;
    })
  }

  predecirMoto(){
    setTimeout(() => {
      this.progreso1 = "25"
    }, 1000);
    setTimeout(() => {
      this.progreso1 = "50"
    }, 2000);
    setTimeout(() => {
      this.progreso1 = "75"
    }, 3000);
    setTimeout(() => {
      this.progreso1 = "100"
      setTimeout(() => {
        this.divMoto = true;
      }, 1000);
    }, 4000);
  }


  

}
