import React, {Component} from 'react'

export default class extends Component {
    state = {
        cars: [],
        planes: []
    }

    getData = async (path) => {
        const url = `https://back-end-eeeusepmqs.now.sh${path}`
        const response = await fetch(url)
        const data = await response.json()

        return data
    }

    
    async componentDidMount() {
        const carsResponse = await this.getData("/cars")
        const planesResponse = await this.getData("/planes")

        console.log("ServerData:", carsResponse)
        this.setState({ 
            cars: carsResponse.cars, 
            planes: planesResponse.planes
        })
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
        const carElements = cars
            .filter((car, index, array) => {
                return ("C" <= car.make && car.make <= "Z")
                    || ("c" <= car.make && car.make <= "z")
            })
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
                {this.renderCars(this.state.cars)}
            </div>
        )
    }
}