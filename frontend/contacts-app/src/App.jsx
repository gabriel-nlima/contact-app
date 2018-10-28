import React from 'react';
import ReactDOM from 'react-dom';
import ContactsList from './Contacts.jsx';
import {NewContactHoc} from './Contacts.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
   render(){
   	return(
   		<div>
   			<Container/>
   		</div>
   	);
   }
}

class Container extends React.Component{
	
	render(){
		const MainRow = RowHoc(ContactsList, 'main');
		const SecondaryRow = RowHoc(InsertBtn,'sec');
		return(
			<div className="container">
				<Header/>
				<MainRow/>
				<SecondaryRow/>
				<Footer/>
			</div>
		);
	}
}

function RowHoc(Component, id){
	return class extends React.Component{
		render(){
			return( 
				<div className="row" id={id}>
					<Component />
				</div>)
		}
	}
}
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
export default App;