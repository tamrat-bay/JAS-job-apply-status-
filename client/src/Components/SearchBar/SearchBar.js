import React, { Component } from 'react'

export default class SearchBar extends Component {
    render() {
        return (
            <div>
                <h3>Search Applys</h3>
                <form class="form-inline">
                <i class="fas fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                    aria-label="Search"/>
                </form>
            </div>
        )
    }
}
