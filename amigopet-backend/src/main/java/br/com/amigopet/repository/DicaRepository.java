package br.com.amigopet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.amigopet.model.Dica;
import br.com.amigopet.model.Usuario;

public interface DicaRepository extends JpaRepository<Dica, Long> {

	List<Dica> findAllByUsuario(Usuario usuario);

}
