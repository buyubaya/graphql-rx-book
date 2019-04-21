import React from 'react';
// import { BASE_API_URL, API_URL, fetchData } from '../utils/ApiUtils';
import { BASE_API_URL } from '../constants/ApiUrls';


class FilterBox extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            list: []
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    // componentWillMount(){
    //     if(this.props.filterName){
    //         fetch(`${BASE_API_URL}/api/${this.props.filterName}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({ list: data });
    //         })
    //         .catch(err => console.log('ERROR', err));
    //     }
    // }

    handleFilter(e){
        const { onChange } = this.props;
        onChange && onChange(e.target.value);
    }

    render(){
        const { data, placeholder, value } = this.props;
        
        return(
            data && data.length > 0
            ?
            <select 
                className="filter-box" 
                value={value} 
                onChange={this.handleFilter}
            >
                <option value={''} key={'empty'}>{placeholder || 'Select'}</option>
                {
                    data.map(item =>
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


export default FilterBox;