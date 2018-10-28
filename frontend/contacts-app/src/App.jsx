import React from 'react';
import ContactsList, {InsertBtn} from './Contacts.jsx';
import './index.css';

//Container renderizado na página
class App extends React.Component {
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
//High Order Component, recebe um componente e o renderizia dentro de uma row
//passando alguns dados para o componente
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
class Header extends React.Component{
	render(){
		return(
			<h2 className="text-center">Contatos</h2>
		);
	}
}
class Footer extends React.Component{
	render(){
		return(
			<div className="footer">
				<p> Gabriel Nascimento Lima</p>
				<p className="text-muted"> gabriel.lima13372@gmail.com</p>
			</div>
		);
	}
}
export default App;