package br.com.amigopet.controller;


import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.amigopet.controller.form.AtualizacaoDicaForm;
import br.com.amigopet.dto.DicaDto;
import br.com.amigopet.files.upload.message.ResponseMessage;
import br.com.amigopet.files.upload.service.FilesStorageService;
import br.com.amigopet.model.Dica;
import br.com.amigopet.model.Usuario;
import br.com.amigopet.repository.DicaRepository;
import br.com.amigopet.repository.UsuarioRepository;
import br.com.amigopet.server.DataDica;

@CrossOrigin("*")
@RestController
@RequestMapping("/dica")
public class DicaController {

	@Autowired
	DicaRepository dicaRepository;

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	DataDica dataServer;

	@Autowired
	FilesStorageService storageService;

	@PostMapping("/cadastrar")
	public Dica cadastrar(@RequestBody Dica dica) {
		return dicaRepository.save(dica);
	}

	@PostMapping("/cadastrarfoto/{idDica}")
	public ResponseEntity<ResponseMessage> cadastrarfoto(@Valid @PathVariable("idDica") Long idDica,
			@RequestParam("imagem") MultipartFile imagem) throws Exception {

		String message = "";

		try {
			Dica dica = criaHashImagem(idDica, imagem);

			dataServer.criaDiretorio(imagem, dica);

			dicaRepository.save(dica);

			message = "Uploaded the file successfully: " + imagem.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not upload the file: " + imagem.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}

	}

	@GetMapping("/visualizar/{id}")
	@Transactional
	public DicaDto visualizar(@PathVariable Long id) {
		Dica dica = dicaRepository.getOne(id);

		return new DicaDto(dica);
	}

	@PutMapping("/alterar/{id}")
	@Transactional
	public ResponseEntity<DicaDto> altera(@PathVariable Long id, @RequestBody @Valid AtualizacaoDicaForm form) {
		Dica dica = form.atualizar(id, dicaRepository);
		return ResponseEntity.ok(new DicaDto(dica));
	}

	@DeleteMapping("/deletar/{id}")
	@Transactional
	public ResponseEntity<?> deletar(@PathVariable Long id) {
		dicaRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/listarporusuario/{id}")
	public List<DicaDto> listaPorUsuario(@PathVariable Long id) {
		Usuario usuario = usuarioRepository.getOne(id);

		List<Dica> dicas = dicaRepository.findAllByUsuario(usuario);
		return DicaDto.converterLista(dicas);
	}

	@GetMapping("/lista")
	public List<DicaDto> lista() {
		List<Dica> dicas = dicaRepository.findAll();
		return DicaDto.converterLista(dicas);
	}


	@GetMapping("/buscaimagem/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.load(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}
	

	private Dica criaHashImagem(@Valid Long idDica, MultipartFile imagem) throws Exception {
		Dica dica = dicaRepository.findById(idDica).orElseThrow(() -> new Exception("Dica não encontrada"));
		String nome = imagem.getOriginalFilename().substring(0, imagem.getOriginalFilename().length() - 4);
		String ext = imagem.getOriginalFilename().substring(imagem.getOriginalFilename().length() - 4,
				imagem.getOriginalFilename().length());
		String imgHashSave = nome + '_' + System.currentTimeMillis() + ext;

		dica.setImagem(imgHashSave);

		return dica;
	}
}
