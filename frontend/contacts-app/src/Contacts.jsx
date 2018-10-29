import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Form from './Form.jsx';


//High Order Components de contatos
//recebe o componente e passa o contato para o mesmo, então renderiza
function contactsHoc(Component, contact, other){
	return class extends React.Component{
		render(){
			return( <Component contact={contact} isNew={other}/>)
		}
	}
}
//HOC para novo contato (passa um contato vazio)
const EmptyContact = {name: '', email:'', gender:'', birthday:'', phone:'',}
export const NewContactHoc = contactsHoc(Form, EmptyContact, true);
//Botao de novo contato
export class InsertBtn extends React.Component{
	constructor(props){
		super(props);
		this.handleNewContact = this.handleNewContact.bind(this);
	}
	handleNewContact(){
		ReactDOM.render(<NewContactHoc/>, document.getElementById('sec'))
	}
	render(){
		return(
			<div className="col-sm-12 text-right">
				<button type="submit" className="btn btn-primary" onClick={this.handleNewContact}>Novo Contato</button>
			</div>
		);
	}
}
//Busca os contatos da API e renderiza a tabela
export default class ContactsList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contacts: []
		}
	}
	componentDidMount(){
		this.getContacts();
	}
	componentDidUpdate(){
		this.getContacts();
	}
	getContacts(){
		axios.get('http://localhost:8080/contacts').then(res =>{
			const contacts = res.data._embedded.contacts;
			this.setState({ contacts: contacts});
		});
	}
	render(){
		return(
			<div className="col-sm-12">
				<h4>Lista de Contatos</h4>
				<table className="table table-bordered table-hover table-sm">
					<thead>
						<tr>
							<th scope="col">Nome</th>
							<th scope="col">E-mail</th>
							<th scope="col">Ações</th>
						</tr>
					</thead>
					<tbody>
						{this.state.contacts.map((contact) => <ContactsRow
							contact = {contact} key={contact._links.self.href}/>)}
					</tbody>
				</table>
			</div>
		);
	}
}
//Componente de linhas da tabela
class ContactsRow extends React.Component{
	constructor(props){
		super(props);
		this.handleViewClick = this.handleViewClick.bind(this);
	}
	handleViewClick(){
		//HOC que passa o contato a ser visualizado
		const ViewContactHoc = contactsHoc(ViewContact, this.props.contact,false);
		ReactDOM.render(<ViewContactHoc/>, document.getElementById('sec'))
	}
	render(){
		const btnMargin={
			marginRight: '4px'
		}
		return(
			<tr key= {this.props.contact._links.self.href}>
				<td>{this.props.contact.name}</td>
				<td>{this.props.contact.email}</td>
				<td className="text-center">
					<button style={btnMargin} className="btn btn-success btn-sm" onClick={this.handleViewClick}>
						<img src="./imgs/baseline_visibility_black_18dp.png" alt="Visualizar"/>
					</button>
					<DeleteContact name={this.props.contact.name} id={this.props.contact._links.self.href}/>
				</td>
			</tr>
		);
	}
}
//Visualizar o contato
export class ViewContact extends React.Component{
	constructor(props){
		super(props);
		this.setState({contact:''});
		this.handleUpdateClick = this.handleUpdateClick.bind(this);
	}
	componentDidMount(){
		this.getContact();
	}
	componentDidUpdate(){
		this.getContact();
	}
	getContact(){
		axios.get(this.props.contact._links.self.href).then(res =>{
			const contact = res.data;
			this.setState({ contact: contact});
		});
	}
	handleUpdateClick(){
		//HOC que passa o contato a ser atualizado no formulario
		const UpdateContactHoc = contactsHoc(Form, this.props.contact ,false);
		ReactDOM.render(<UpdateContactHoc/>, document.getElementById('sec'))
	}
	render(){
		return(
			<React.Fragment>
				<div className="col-sm-4">
				<h4>Dados pessoais</h4>
					Nome<p>{this.props.contact.name}</p>
					Gênero<p>{this.props.contact.gender === 'MALE' ? 'Masculino' : 'Feminino'}</p>
					Data de nascimento<p>{this.props.contact.birthday}</p>
				</div>
				<div className="col-sm-4">
				<h4>Dados de contato</h4> 
					E-mail <p>{this.props.contact.email}</p>
					Telefone <p>{this.props.contact.phone}</p>
				</div>
				<div className="col-sm-4 text-right">
					<button className="btn btn-secondary" onClick={this.handleUpdateClick}>
						<img src="./imgs/baseline_edit_black_18dp.png" alt="Editar"/>
					</button>
				</div>
			</React.Fragment>
		);
	}
}
//Deletar o contato
class DeleteContact extends React.Component{
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete = event => {
	    axios.delete(this.props.id)
	      .then(res => {
	        console.log(res);
	        console.log(res.data);
	      })
	    alert('Contato '+this.props.name +' deletado');
	    ReactDOM.unmountComponentAtNode(document.getElementById('sec'));
	    ReactDOM.render(<InsertBtn/>, document.getElementById('sec'));
      	event.preventDefault();
  }

  render(){
  	return(
  		<button className="btn btn-danger btn-sm"  onClick={this.handleDelete}>
			<img src="./imgs/baseline_delete_black_18dp.png" alt="Excluir"/>
		</button>
  	);
  }
}