import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminBookList from '../../components/admin/AdminBookList';
import AdminBookForm from '../../components/admin/AdminBookForm';
import Pagination from '../../components/admin/Pagination';
import {
    BOOK_API_URL,
    ADMIN_API_URL,
    CATEGORY_API_URL,
    AUTHOR_API_URL,
    BRAND_API_URL
} from '../../constants/ApiUrls';


class AdminBookPage extends React.Component {
    constructor(){
        super();

        this.state = {
            editItem: null,
            addItem: false,
            bookList: [],
            maxPage: 5,
            count: 0,
            filterParams: {
                page: 1,
                limit: 5
            }
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this._removeItemFromBookList = this._removeItemFromBookList.bind(this);
        this._addItemToBookList = this._addItemToBookList.bind(this);
        this._handleSubmitSuccess = this._handleSubmitSuccess.bind(this);
        this._toPage = this._toPage.bind(this);
    }

    static childContextTypes = {
        bookList: PropTypes.array,
        count: PropTypes.number,
        editItem: PropTypes.object,
        handleEdit: PropTypes.func,
        handleAdd: PropTypes.func,
        hideForm: PropTypes.func,
        _removeItemFromBookList: PropTypes.func,
        _addItemToBookList: PropTypes.func,
        _handleSubmitSuccess: PropTypes.func,
        user: PropTypes.object
    };

    getChildContext(){
        return({
            bookList: this.state.bookList,
            count: this.state.count,
            editItem: this.state.editItem,
            handleEdit: this.handleEdit,
            handleAdd: this.handleAdd,
            hideForm: this.hideForm,
            _removeItemFromBookList: this._removeItemFromBookList,
            _addItemToBookList: this._addItemToBookList,
            _handleSubmitSuccess: this._handleSubmitSuccess,
            user: this.props.user
        });
    }

    componentDidMount(){
        const { filterParams } = this.state;
        this.fetchBookAPI(filterParams);
    }

    fetchBookAPI(filterParams={}){
        let query = [];
        for(let x in filterParams){
            const pair = `${x}=${filterParams[x]}`;
            query.push(pair);
        }
        query = query.length > 0 ? '?' + query.join('&') : '';

        fetch(BOOK_API_URL + query)
        .then(res => res.json())
        .then(data => {
            this.setState({ bookList: data.list, count: data.count });
        });
    }

    handleEdit(item){
        console.log('HANDLE EDIT', item);
        this.setState({ editItem: item, addItem: false });
    }

    handleAdd(){
        this.setState({ editItem: null, addItem: true });
    }

    hideForm(){
        this.setState({ editItem: null, addItem: false });
    }

    _removeItemFromBookList(id){
        const { user } = this.props;
        if(user && user.token){
            console.log('DELETE', id);
            fetch(`${BOOK_API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then(res => res.json())
            .then(json => {
                let { bookList } = this.state;
                bookList = bookList.filter(item => item._id !== id)
                this.setState({ bookList });
            })
            .catch(err => console.log('DELETE ERROR', err));
        }
    }

    _addItemToBookList(item){
        let { bookList } = this.state;
        item.category = { _id: item.category };
        item.author = { _id: item.author };
        item.brand = { _id: item.brand };
        bookList.push(item);
        this.setState({ bookList });
    }

    _editItemFromBookList(item){
        let { bookList, editItem } = this.state;

        for(let i=0, len=bookList.length; i<len; i++){
            if(bookList[i]._id === editItem._id){
                bookList[i] = { ...item };
                bookList[i]['category'] = { _id: item.category };
                bookList[i]['author'] = { _id: item.author };
                bookList[i]['brand'] = { _id: item.brand };
                break;
            }
        }
        this.setState({ bookList });
    }

    _handleSubmitSuccess(data){
        let { bookList, editItem } = this.state;

        if(editItem === null){
            this._addItemToBookList(data);
        }
        else {            
            this._editItemFromBookList(data);
        }

        this.hideForm();
    }

    _toPage(p){
        this.setState(
            state => ({
                filterParams: { ...state.filterParams, page: p }
            }),
            () => this.fetchBookAPI(this.state.filterParams)
        );
    }

    render(){
        const { editItem, addItem, maxPage, count, filterParams: { page, limit } } = this.state;

        return(
            <div className='admin-page book-page'>
                <AdminBookList />
                {
                    (editItem || addItem) &&
                    <div className='overlay' onClick={this.hideForm}>
                        <div className='overlay-inner' onClick={this.stopPropagation}>
                            <AdminBookForm />
                        </div>
                    </div>
                }
                <Pagination 
                    page={page}
                    limit={limit}
                    maxPage={maxPage}
                    count={count}
                    toPage={this._toPage}
                />
            </div>
        );
    }
}


export default connect(
    state => ({
        user: state.user
    })
)(AdminBookPage);