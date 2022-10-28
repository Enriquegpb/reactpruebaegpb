import axios from 'axios';
import React, { Component } from 'react'
import Doctores from './Doctores';
import Global from './Global';

export default class Especialidad extends Component {

    state={
        especialidades:[],
        stutus:false,
        especialidad:""
    }

    //Creamos las referencias 
    cajaIncremento=React.createRef();
    selectEspeRef=React.createRef();

    cargarEspecilidad=()=>{
        var request="/api/Doctores/Especialidades";
        var url=Global.urlDoctores+request;

        axios.get(url).then(res=>{
            this.setState({stutus:true,especialidades:res.data})
        })
    }

    buscarEmpleados = (e) => {
        e.preventDefault();
        var especialidad = this.selectEspeRef.current.value;
        this.setState({
            especialidad: especialidad
        });
    }

    
    actulizarSalario=(e)=>{
        e.preventDefault();
        var incremento=parseInt(this.cajaIncremento.current.value);
        var especialidad=this.selectEspeRef.current.value;
        var request="/api/Doctores/"+especialidad+"/"+incremento;
        var url=Global.urlDoctores+request;

        axios.put(url).then(res=>{
            this.setState({
                statusSal:true,
            })
            
        })

    }

    
    componentDidMount=()=>{
        this.cargarEspecilidad();
    }




  render() {
    if(this.state.stutus==true){
    return (
      <div><h1>Incremeto Salarial doctores</h1>
        <form onSubmit={this.actulizarSalario}>
            <select ref={this.selectEspeRef}>
                {
                    this.state.especialidades.map((especialidad,index)=>{
                        return(
                            <option value={especialidad} key={index}>{especialidad}</option>
                        )
                    })
                    
                }    
            </select>
            <label>Incremeto Salarial</label>
            <input type={"text"} ref={this.cajaIncremento}/>
            <button>Incremetar salarios</button>
            <Doctores especialidad={this.state.especialidad}/>
        </form>
        
      </div>
      
    )
  }else{
    return(
        <h1>Incremeto Salarial doctores No encontrado</h1>
    )
  }
}
}
