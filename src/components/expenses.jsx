import React, {Component} from "react";
import {getEntries} from '../services/fakeEntries';


class Entries extends Component {
    state ={
        entries: getEntries()
    };

    totalCalculation() {
        const {entries} = this.state;
        let total = 0;
        // eslint-disable-next-line array-callback-return
        entries.map(entry => total += entry.amount)
        return total
    }

    renderResume() {
        const {entries} = this.state;
        if (entries.length === 0) return <h5 className="title is-5 center">There are no entries!</h5>
        return <h5 className="title is-5 center">There are {entries.length} entries. Total amount of expenses is { this.totalCalculation()}€. </h5>
    }

    handleDelete(id) {
        const {entries} = this.state;
        let newEntries = []
        // eslint-disable-next-line array-callback-return
        entries.map(entry => {
            if (entry.id !== id) {
                newEntries.push(entry)
            }
        })
        this.setState({entries: newEntries})
    }

    getCategoryClasses(id) {
        const {entries} = this.state;
        let classes = "tag is-";
        entries.map(entry => {
            if (entry.id === id) {
                if (entry.category === "groceries") {
                    classes += "primary";
                }
                if (entry.category === "restaurant") {
                    classes += "dark";
                }
                if (entry.category === "gift") {
                    classes += "warning";
                }
            }
        })
        return classes;
    }

    renderTable() {
        const {entries} = this.state;
        if (entries.length === 0) return null
        return (
            <table className="table is-fullwidth">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Shop</th>
                    <th>Date</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {entries.map(entry =>
                    <tr key={entry.id}>
                        <th>{entry.id}</th>
                        <td>{entry.title}</td>
                        <td>{entry.amount}</td>
                        <td><span className={this.getCategoryClasses(entry.id)}>{entry.category}</span></td>
                        <td>{entry.shop}</td>
                        <td>{entry.date}</td>
                        <td><button onClick={() => this.handleDelete(entry.id)} className="button is-danger is-small">delete</button></td>
                    </tr>)}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="container">
                <h1 className="title center">Expenses</h1>
                {this.renderResume()}
                {this.renderTable()}
            </div>
        );

    }
}

export default Entries;