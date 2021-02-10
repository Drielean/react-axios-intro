import React from "react";
import axios from "axios";

import SearchResults from "./SearchResults";

class Search extends React.Component {
  // 2. Definir o state pra segurar o valor do input
  state = {
    searchTerm: "",
    results: [],
    error: false,
    fullTextSearch: false,
  };

  // 3. Atualizar o state com o que o usuário digitar dentro do input
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  // 1. Escutar o evento de clique no botão "Search" e rodar uma função
  handleClick = async () => {
    // 4. Incluir o que foi digitado no input na URL da pesquisa na API
    try {
      const response = await axios.get(
        `https://restcountries.eu/rest/v2/name/${
          this.state.searchTerm
        }?fullText=${this.state.fullTextSearch ? "true" : "false"}`
      );

      console.log(response);

      // 5. Atualizar o state com o resultado da pesquisa
      this.setState({ results: [...response.data], error: false });
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 404) {
        this.setState({ error: true });
      }
    }
  };

  render() {
    return (
      <div className="col-6">
        <div className="input-group">
          <input
            className="form-control form-control-lg"
            onChange={this.handleChange}
            value={this.state.searchTerm}
          />

          <div className="input-group-append">
            <button className="btn btn-primary" onClick={this.handleClick}>
              Search
            </button>
          </div>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="fullText"
            checked={this.state.fullTextSearch}
            onChange={() => {
              this.setState({ fullTextSearch: !this.state.fullTextSearch });
            }}
          />
          <label className="form-check-label" htmlFor="fullText">
            Search by exact name
          </label>
        </div>

        {/* 6. Passar o state como prop para o componente que vai exibir os resultados */}
        <SearchResults results={this.state.results} error={this.state.error} />
      </div>
    );
  }
}

export default Search;
