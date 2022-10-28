import axios from 'axios';
import React, { Component } from 'react'
import Global from './Global';

export default class Doctores extends Component {
    
    state={
        status:false,
        statusSal:false,
        doctores:[]
    }

    
    getDoctores=()=>{
        var especialidad=this.props.especialidad;
        var request="/api/Doctores/DoctoresEspecialidad/"+especialidad;
        var url=Global.urlDoctores+request;

        axios.get(url).then(res=>{
            this.setState({status:true, doctores:res.data})
        })

        //Es el momento de dibujar los doctores en la tabla!!
    }

   
  render() {

    //Dibujaremos la tabla siempre y cuando el estado sea true para asegurar que la
    //request se ha llevado a cabo correctamente
    if(this.state.status==true){
    return (
      <div>
        <h1>Doctores</h1>
        <table>
            <thead>
                <tr>
                    <th>Apellido</th>
                    <th>Especialidad</th>
                    <th>Salario</th>
                </tr>
            </thead>
            <tbody>
            {
            this.state.doctores.map((doctor,index)=>{
                return(
                    <tr key={doctor.idDoctor}>
                        <td>{doctor.apellido}</td>
                        <td>{doctor.especialidad}</td>
                        <td>{doctor.salario}</td>
                    </tr>
                )
            })
        }

            </tbody>
        </table>
        
      </div>
    )
  }else{
    return(<div>
        <h1>No ha habido carga de doctores</h1>
    </div>)
  }
}
}
