import React, { Component } from 'react';
import { FaSpinner, FaPlus, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import './styles.css';

class Main extends Component {
  state = {
    planets: [],
    loading: false,
  };

  handleSubmit = async () => {
    this.setState({ loading: true });

    const number = Math.floor(Math.random() * 61) + 1;
    const { planets } = this.state;
    const response = await api.get(`planets/${number}/`);

    this.setState({
      planets: [...planets, response.data],
      loading: false,
    });
  };

  handleClear = () => {
    this.setState({
      planets: [],
    });
  };

  render() {
    const { planets, loading } = this.state;
    return (
      <>
        <button
          type="button"
          loading={loading ? 1 : 0}
          onClick={this.handleSubmit}
        >
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </button>
        <button type="button" onClick={this.handleClear}>
          <FaTrash color="#FFF" size={14} />
        </button>
        <ul>
          {planets.map(planet => (
            <li key={planet.name}>
              <p>POPULATION: {planet.population}</p>
              <p>PLANET: {planet.name}</p>
              <p>TERRAIN: {planet.terrain}</p>
              <p>CLIMATE: {planet.climate}</p>
              <p>FILMS: {planet.films.length}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Main;
