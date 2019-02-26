import React from 'react';
import { connect } from 'react-redux';
// import { BASE_API_URL, API_URL, fetchData } from '../utils/ApiUtils';
import { BASE_API_URL } from '../constants/ApiUrls';
import {
    filterRequest
} from '../redux/actions';


class FilterBox extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            list: []
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    componentWillMount(){
        if(this.props.filterName){
            fetch(`${BASE_API_URL}/api/${this.props.filterName}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ list: data });
            })
            .catch(err => console.log('ERROR', err));
        }
    }

    handleFilter(e){
        const { filterParams, filterName } = this.props;
        this.props.filter && this.props.filter({
            ...filterParams,
            [filterName]: e.target.value
        });
    }

    render(){
        const { placeholder, filterParams, filterName } = this.props;
        
        return(
            this.state.list.length > 0
            ?
            <select 
                className="filter-box" 
                value={filterParams[filterName] || ''} 
                onChange={this.handleFilter}
            >
                <option value={''} key={'empty'}>{placeholder || 'Select'}</option>
                {
                    this.state.list.map(item =>
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    )
                }
            </select>
            :
            <div>Loading...</div>
        );
    }
}


export default connect(
	state => ({
		filterParams: state.filter
	}),
	dispatch => ({
		filter: q => dispatch(filterRequest(q))
	})
)(FilterBox);