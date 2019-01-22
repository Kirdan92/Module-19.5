class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchText: '',
			users: []
		};
	}

	onChangeHandle(evet) {
		this.setState({searchText: event.target.value});
		//Zmiana stanu na wartosc z input
	}

	onSubmit(event) {
		event.preventDefault();
		const {searchText} = this.state;
		const url = `https://api.github.com/search/users?q=${searchText}`;
		fetch(url)
			.then(response => response.json())
			.then(responseJson => this.setState({users: responseJson.items}));
			//stan users ustawiany na tablice items z odpowiedzi 
	}

	render() {
		return(
			<div className="container">
				<h1><i className="fab fa-github"></i> GitHub User Search</h1>
				<form onSubmit={event => this.onSubmit(event)}>
					<label htmlFor="searchText">Search by user name: </label>
					<input
						type="text"
						id="searchText"
						onChange={event => this.onChangeHandle(event)}
						value={this.state.searchText}
						placeholder="Username"/>

				</form>
				<UsersList users={this.state.users}/>
			</div>
		);
	}
}

class UsersList extends React.Component {
	//getter mapujący tablice users z App na element User z propsami key i user.
	get users() {
		return this.props.users.map(user => <User key={user.id} user={user}/>);
	}

	render() {
		return(
			<div className="users-container">
				{this.users}
			</div>
		);
	}
}

class User extends React.Component {
	render() {
		return(
			<div className="user-box">
				<a href={this.props.user.html_url} target="_blank">
					<img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
				</a>
				<a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);