import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.sortByOptions = {
            'Mejor Match': 'best_match',
            'Más estrellas': 'rating',
            'Más opiniones': 'review_count'
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
    }

    getSortByClass(sortByOption) {
        if(this.state.sortBy === sortByOption) {
            return 'active';
        }else {
            return '';
        }
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li 
            onClick={this.handleSortByChange.bind(this, sortByOptionValue)} 
            className={this.getSortByClass(sortByOptionValue)}
            key={sortByOptionValue}>{sortByOption}</li>
        });
    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        }, () => {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        })
    } 

    handleTermChange(event) {
        this.setState({
            term: event.target.value
        })
    }

    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        })
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    handleKeyPress(event) {
        if(event.key === 'Enter') {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input  onChange={this.handleTermChange} 
                            placeholder="Comida" 
                            onKeyPress={this.handleKeyPress}/>
                    <input  onChange={this.handleLocationChange} 
                            placeholder="Ciudad/Barrio" 
                            onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Buscar</button>
                </div>
            </div>
        )
    }
}

export default SearchBar;