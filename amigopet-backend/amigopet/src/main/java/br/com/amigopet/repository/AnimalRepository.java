package br.com.amigopet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.amigopet.model.Animal;
import br.com.amigopet.model.Usuario;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

	public List<Animal> findAllByUsuario(Usuario usuario);

	public List<Animal> findAllByStatus(String status);

	public List<Animal> findAllByStatusAndUsuario(String status, Usuario usuario);

	

	public List<Animal> findAllByEstadoOrCidadeOrPorteOrTipoOrSexoOrIdade(int estado, int cidade, String porte,
			String tipo, String sexo, String idade);

}
