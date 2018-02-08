import React, {Component} from 'react'
import CarsApi from './../CarsApi'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateCar extends Component {
    state = {
        make: "",
        model: "",
        year: 0,
        mileage: 0
    }

    onChangeHandler = (e) => {
        switch(e.target.id) {
            case "make":
                this.setState({ make: e.target.value })
                break
            case "model":
                this.setState({ model: e.target.value })
                break
            case "year":
                this.setState({ year: Number(e.target.value) })
                break
            case "mileage":
                this.setState({ mileage: Number(e.target.value) })
                break
            default:
                throw Error("Invalid Id")
        }
    }

    clickHandler = async () => {
        //await CarsApi.post("/cars", this.state)
        const car = await this.props.mutate({
            variables: this.state
          })

        console.log(car)
    }

    render() {
        return (
            <div>
                <div>Make: <input id="make" type="text" onChange={this.onChangeHandler} /></div>
                <div>Model: <input id="model" type="text" onChange={this.onChangeHandler} /></div>
                <div>Year: <input id="year" type="text" onChange={this.onChangeHandler} /></div>
                <div>Mileage: <input id="mileage" type="text" onChange={this.onChangeHandler} /></div>
                <button onClick={this.clickHandler}>Create</button>
            </div>
        )
    }
}

const mutation = gql `
    mutation (
            $make: String!
            $model: String!
            $year: Int!
            $mileage: Int
        ) {
            createCar(
                make: $make
                model: $model
                year: $year
                mileage: $mileage
            ) {
                id make model year mileage
            }
        }
    `
export default graphql(mutation)(CreateCar)