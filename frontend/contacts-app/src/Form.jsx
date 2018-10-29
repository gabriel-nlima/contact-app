import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {InsertBtn} from './Contacts.jsx';
import MaskedInput from 'react-text-mask'
export default class Form extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			name:'',
			email:'',
			gender:'',
			birthday:'',
			phone:'',
		}
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleNewSubmit = this.handleNewSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.backBtn = this.backBtn.bind(this);
	}
	//captura as mudanças nos inputs e seta no state
	handleNameChange = event =>{this.setState({ name: event.target.value })}
	handleEmailChange = event =>{this.setState({ email: event.target.value })}
	handleGenderChange = event =>{this.setState({ gender: event.target.value })}
	handleBirthdayChange = event =>{this.setState({ birthday: event.target.value })}
	handlePhoneChange = event =>{this.setState({ phone: event.target.value })}

	componentDidMount(){
		//Caso não seja um novo contato
		if(this.props.isNew === false){
			this.setState({
				name:this.props.contact.name,
				gender:this.props.contact.gender,
				birthday:this.props.contact.birthday,
				email:this.props.contact.email,
				phone:this.props.contact.phone,
			})
		}
	}
	//Inserir contato na API
	handleNewSubmit = event =>{
		axios.post('http://localhost:8080/contacts',
			{name: this.state.name, gender: this.state.gender, birthday: this.state.birthday,
			phone: this.state.phone, email: this.state.email})
				.then(res=> {
       			console.log(res);
        		console.log(res.data);
			});
		alert('Contato cadastrado');
		//Fecha o formulario e renderiza o botão de novo contato
		ReactDOM.unmountComponentAtNode(document.getElementById('sec'));
		ReactDOM.render(<InsertBtn/>, document.getElementById('sec'));
		event.preventDefault();
		
		}
		//Atualizar contato na API
	handleUpdate = event =>{
		axios.put(this.props.contact._links.self.href,
			{name: this.state.name, gender: this.state.gender, birthday: this.state.birthday,
			phone: this.state.phone, email: this.state.email})
				.then(res=> {
       			console.log(res);
        		console.log(res.data);
			});
		alert('Contato ' +this.state.name +' atualizado');
		//Fecha o formulario e renderiza o botão de novo contato
		ReactDOM.unmountComponentAtNode(document.getElementById('sec'));
		ReactDOM.render(<InsertBtn/>, document.getElementById('sec'));
		event.preventDefault();
		}
		
	backBtn(){
		//Fecha o formulario e renderiza o botão de novo contato
		ReactDOM.unmountComponentAtNode(document.getElementById('sec'));
		ReactDOM.render(<InsertBtn/>, document.getElementById('sec'));
	}
	render(){
		const btnMargin={
			marginRight: '10px'
		}
		//renderiza o formulario de acordo com o contato passado
		return(
			<div className="col-sm-12">
			<h4>{this.props.isNew ? "Cadastrar novo contato" : "Atualizar contato: "+this.props.contact.name}</h4>
				<form onSubmit={this.props.isNew ? this.handleNewSubmit : this.handleUpdate}>
					<div className="form-row">
						<div className="form-group col-sm-6">
							<label htmlFor="name">Nome</label>
							<input type="text" className="form-control" name="name" 
							onChange={this.handleNameChange} id="name" value={this.state.name} 
							placeholder="Nome completo"/>
						</div>
						<div className="form-group col-sm-3">
							<label htmlFor="gender">Gênero</label>
							<select id="gender" name="gender" onChange={this.handleGenderChange} 
							className="form-control" required value={this.state.gender}>
							    <option defaultValue value="">Escolha</option>
							    <option value="MALE">Masculino</option>
							    <option value="FEMALE">Feminino</option>
							 </select>
						</div>
						<div className="form-group col-sm-3 ">
							<label htmlFor="birthday">Nascimento</label>
							<input type="date" className="form-control" name="birthday" 
							onChange={this.handleBirthdayChange} id="birthday"
							 placeholder="Data de Aniversário" value={this.state.birthday}/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-sm-8">
							<label htmlFor="email">Email</label>
							<input type="email" name="email"  onChange={this.handleEmailChange} 
							className="form-control" id="email" 
							placeholder="E-mail" value={this.state.email}/>
						</div>
						<div className="form-group col-sm-4">
							<label htmlFor="phone">Telefone</label>
							 <MaskedInput
							 	className="form-control" id="phone" placeholderChar=" " onChange={this.handlePhoneChange} value={this.state.phone}
     							mask={['(', /[1-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
							/>
						</div>
					</div>
					<div className="text-right">
						<button style={btnMargin} onClick={this.backBtn} className="btn btn-light">Voltar</button>
						<button type="submit" className="btn btn-primary">Salvar</button>
					</div>
				</form>
			</div>
		);
	}
}