package br.com.amigopet.controller.form;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import br.com.amigopet.model.Usuario;
import br.com.amigopet.repository.UsuarioRepository;

public class AtualizacaoUsuarioForm {

	private String nome;
	private String email;
	private String senha;
	private String celular;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public Usuario atualizar(Long id, UsuarioRepository usuarioRepository) {
		
		Usuario usuario = usuarioRepository.getOne(id);
		boolean existeEmail = usuarioRepository.existsByEmail(this.email);
		System.out.println("veio do site: " + this.email);
		System.out.println("ja do banco: " + usuario.getEmail());

		
		if (existeEmail) {
			if (this.email.equals(usuario.getEmail())) {
				System.out.println("o email é o seu mesmo");
				usuario.setNome(this.nome);
				usuario.setSenha(this.senha);
				usuario.setCelular(this.celular);
				usuarioRepository.save(usuario);
				return usuario;
			} else {
				return null;
			}
		} else {
			System.out.println("email Não existe e será alterado");
			usuario.setNome(this.nome);
			usuario.setEmail(this.email);
			usuario.setSenha(this.senha);
			usuario.setCelular(this.celular);
			
			usuarioRepository.save(usuario);
			 return usuario;
		}

	}

	public UsernamePasswordAuthenticationToken converter() {
		return new UsernamePasswordAuthenticationToken(email, senha);

	}
}
