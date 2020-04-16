<template>
  <div id="home" class="teste">
      <div class="loader" v-if="isLoading">
        <div class="spinner-border text-info p-4 h3" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <form class="p-5 shadow rounded formulario bg-light">
            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="inputState">UF</label>
                <select
                  id="inputState"
                  v-model="state"
                  :disabled="estados.length === 0"
                  class="form-control"
                  @change="carregarCidades()"
                >
                  <option
                    v-for="estado in estados"
                    :key="estado.id"
                    :value="estado.id"
                  >{{estado.sigla}}</option>
                </select>
              </div>
              <div class="form-group col-md-7">
                <label for="inputCidade">Cidade</label>
                <select
                  id="inputCidade"
                  class="form-control"
                  :disabled="cidades.length === 0"
                  v-model="city"
                  @change="carregarProfissoes()"
                >
                  <option
                    v-for="cidade in cidades"
                    :key="cidade.id"
                    :value="cidade.nome"
                  >{{cidade.nome}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Profissão</label>
              <select
                class="form-control"
                :disabled="profissoes.length === 0"
                v-model="profissao"
                @change="carregarEntidades()"
              >
                <i class="fas fa-suitcase"></i>
                <option
                  v-for="profissao in profissoes"
                  :key="profissao.profissao"
                >{{profissao.profissao}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Entidade</label>
              <select class="form-control" :disabled="entidades.length === 0" v-model="entidade">
                <option
                  v-for="entidade in entidades"
                  :key="entidade.RazaoSocial"
                >{{entidade.NomeFantasia}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="inputCity">Data de Nascimento</label>
              <input type="date" class="form-control" id="inputData" v-model="birthDate" />
            </div>
            <div class="form-group">
              <button
                type="button"
                class="btn btn-info mt-3"
                @click.prevent="carregarConvenios()"
              >Conferir Planos</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import environment from "../environments/environments";
import api from "../services/api";

const { IBGE_API_URL, API_URL, API_KEY, API_KEY_2, API_KEY_3 } = environment;

export default {
  name: "App",
  data() {
    return {
      isLoading: false,
      state: null,
      city: null,
      profissao: null,
      entidade: null,
      birthDate: null,
      estados: [],
      cidades: [],
      profissoes: [],
      entidades: [],
      planos: []
    };
  },
  methods: {
    async carregarEstados() {
      this.isLoading = true;
      const url = `${IBGE_API_URL}/localidades/estados/`;
      const response = await api.get(url);
      this.isLoading = false;

      this.estados = response.data;
    },

    stateName() {
      return this.estados.find(s => s.id === this.state).sigla;
    },

    async carregarCidades() {
      this.isLoading = true;
      const url = `${IBGE_API_URL}/localidades/estados/${this.state}/municipios`;
      const response = await api.get(url);
      this.isLoading = false;

      this.cidades = response.data;
    },

    async carregarProfissoes() {
      this.isLoading = true;
      const url = `${API_URL}/profissao/${this.stateName()}/${
        this.city
      }?api-key=${API_KEY}`;
      const response = await api.get(url);
      this.isLoading = false;

      this.profissoes = response.data;
    },

    async carregarEntidades() {
      this.isLoading = true;
      const url = `${API_URL}/entidade/${this.profissao}/${this.stateName()}/${
        this.city
      }?api-key=${API_KEY_2}`;
      const response = await api.get(url);
      this.isLoading = false;

      this.entidades = response.data;
    },

    async carregarConvenios() {
      this.isLoading = true;
      const url = `${API_URL}/plano?api-key=${API_KEY_3}`;

      const response = await api.post(
        url,
        {
          entidade: this.entidade,
          uf: this.stateName(),
          cidade: this.city,
          datanascimento: [this.birthDate]
        },
        {
          headers: {
            "x-gravitee-transaction-id": "69705fe6-8380-4886-b05f-e6838018869d"
          }
        }
      );
      this.planos = response.data.planos;
      this.isLoading = false;
      this.$router.push({ name: "planos", params: { planos: this.planos } });
    }
  },

  beforeMount() {
    this.carregarEstados();
  }
};
</script>

<style>
.formulario {
  width: 480px;
}

.loader {
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 99999999999999;
}

.teste {
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  bottom: 0;
  color: black;
  left: 0;
  overflow: auto;
  padding: 3em;
  position: absolute;
  right: 0;
  top: 0;
  background-size: cover;
}
</style>