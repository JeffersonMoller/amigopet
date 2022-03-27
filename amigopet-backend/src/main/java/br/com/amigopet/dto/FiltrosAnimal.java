package br.com.amigopet.dto;

import java.util.List;

import br.com.amigopet.model.Animal;
import br.com.amigopet.repository.AnimalRepository;

public class FiltrosAnimal {

	private String tipo;
	private String idade;
	private String sexo;
	private int cidade;
	private int estado;
	private String porte;

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getIdade() {
		return idade;
	}

	public void setIdade(String idade) {
		this.idade = idade;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public int getCidade() {
		return cidade;
	}

	public void setCidade(int cidade) {
		this.cidade = cidade;
	}

	public int getEstado() {
		return estado;
	}

	public void setEstado(int estado) {
		this.estado = estado;
	}

	public String getPorte() {
		return porte;
	}

	public void setPorte(String porte) {
		this.porte = porte;
	}

	public List<Animal> filtra(AnimalRepository animalRepository, FiltrosAnimal filtrosAnimal) {

		List<Animal> animais = animalRepository.findAllByEstadoOrCidadeOrPorteOrTipoOrSexoOrIdade(filtrosAnimal.getEstado(), filtrosAnimal.getCidade(), filtrosAnimal.getPorte(), filtrosAnimal.getTipo(), filtrosAnimal.getSexo(), filtrosAnimal.getIdade());
		return animais;
	}

}
