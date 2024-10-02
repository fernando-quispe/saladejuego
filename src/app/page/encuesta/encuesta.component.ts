import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../servicios/data.service';
import { Encuesta } from '../../clases/encuesta';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, FormsModule, NgIf],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})

export class EncuestaComponent implements OnInit{

  estado="1";
  encuesta: Encuesta;
  formulario: FormGroup;
  mail_usuario:string;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private encuestaService: DataService,
    public authFire: AngularFireAuth){      
    
    this.authFire.authState.subscribe(res=>{
      if(res && res.uid){
        this.mail_usuario = res.email;
      }
    });

    this.encuesta=new Encuesta();
    this.encuesta.respuestaPuntuacion="1";
    this.encuesta.email=this.mail_usuario;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99), Validators.pattern('^[0-9]*$')]],
      telefono: ['',[Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      conocer: ['',[Validators.required]],
      game: ['',[Validators.required]]
    });
  }

  isValid(field: string) {
    const validateField = this.formulario.get(field);
    let retorno = !validateField.valid && validateField.touched
    ? 'is-invalid'
    : validateField.touched
    ? 'is-valid'
    : '';
    return retorno;
  }

  Enviar(){
    this.encuesta.nombre=this.formulario.value.nombre;
    this.encuesta.apellido=this.formulario.value.apellido;
    this.encuesta.edad=this.formulario.value.edad;
    this.encuesta.telefono=this.formulario.value.telefono;
    this.encuesta.respuestaConocer=this.formulario.value.conocer;
    this.encuesta.email=this.mail_usuario;
    console.log(this.encuesta);
    this.encuestaService.GuardarEncuesta(this.encuesta).then(() => {
      this.toastr.success("Encuesta guardada", "Gracias por los comentarios!!!")
    })
    .catch(err => {
      this.toastr.error("Al guardar encuesta: " + err.message, "Error");
    })
    this.estado='2';  
  }

  changeGame(e){
    this.encuesta.respuestaJuego = e.target.value;
  }
  
  radioButtonSelect(e){
   this.encuesta.respuestaPuntuacion = e.target.value; 
  }
}