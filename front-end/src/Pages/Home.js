import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import CarsApi from "./../CarsApi"

class Home extends Component {
    state = {
        cars: [],
        planes: []
    }
    
    getFromMongoDB = async () => {
        const carsResponse = await CarsApi.get("/cars")
        const planesResponse = await CarsApi.get("/planes")

        console.log("ServerData:", carsResponse)
        this.setState({ 
            cars: carsResponse.cars, 
            planes: planesResponse.planes
        })
    }

    async componentDidMount() {
        //await getFromMongoDB();
    }
    
    renderCar = (car) => {
        return (
            <div key={car._id}>
                <h1>{car.make}</h1>
                <h2>{car.model}</h2>
                <h3>{car.year}</h3>
                <h4>{car.mileage}</h4>
            </div>
        )
    }

    renderCars = (cars) => {
        if (!cars) {
            console.log("loading", cars)
            return (<div>Loading...</div>)
        }

        const carElements = cars
            // .filter((car, index, array) => {
            //     return ("C" <= car.make && car.make <= "Z")
            //         || ("c" <= car.make && car.make <= "z")
            // })
            .map(this.renderCar)

        return carElements
    }

    renderPlane = (plane) => {
        return (
            <div>
                {
                    plane.size === "100"
                    ? <h1>{plane.name}</h1>
                    : plane.size === "10"
                        ? <h2>{plane.name}</h2>
                        : plane.size === "1"
                            ? <h3>{plane.name}</h3>
                            : <div>ERROR</div>
                }
            </div>
        )
    }
    
    render() {
        return (
            <div>
                {this.state.planes.map(this.renderPlane)}
                {this.renderCars(this.props.data.allCars)}
            </div>
        )
    }
}

const query = gql `
query {
    allCars {
      id make model year mileage
    }
}
`

export default graphql(query)(Home)