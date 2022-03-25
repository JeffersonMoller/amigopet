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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.amigopet.controller.form.AtualizacaoAnimalForm;
import br.com.amigopet.dto.AnimalDto;
import br.com.amigopet.dto.FiltrosAnimal;
import br.com.amigopet.files.upload.message.ResponseMessage;
import br.com.amigopet.files.upload.service.FilesStorageService;
import br.com.amigopet.model.Animal;
import br.com.amigopet.model.Usuario;
import br.com.amigopet.repository.AnimalRepository;
import br.com.amigopet.repository.UsuarioRepository;
import br.com.amigopet.server.DataAnimal;

@CrossOrigin("*")
@RestController
@RequestMapping("/animal")
public class AnimalController {

	@Autowired
	AnimalRepository animalRepository;

	@Autowired
	UsuarioRepository usuarioRepository;

	@Autowired
	FilesStorageService storageService;

	@Autowired
	DataAnimal dataServer;

	@PostMapping("/cadastrar")
	public Animal cadastrar(@RequestBody Animal animal) {
		return animalRepository.save(animal);

	}

	@PostMapping("/cadastrarfoto/{idAnimal}")
	public ResponseEntity<ResponseMessage> cadastrar(@Valid @PathVariable("idAnimal") Long idAnimal,
			@RequestPart(name = "imagem") MultipartFile imagem) throws Exception {
		String message = "";
		try {
		Animal animal = criaHashImagem(idAnimal, imagem);

		dataServer.criaDiretorio(imagem, animal);

		animalRepository.save(animal);

		message = "Uploaded the file successfully: " + imagem.getOriginalFilename();
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
	} catch (Exception e) {
		message = "Could not upload the file: " + imagem.getOriginalFilename() + "!";
		return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
	}
	}
	



	@GetMapping("/visualizar/{id}")
	@Transactional
	public AnimalDto visualizar(@PathVariable Long id) {
		Animal animal = animalRepository.getOne(id);

		return new AnimalDto(animal);
	}

	@PutMapping("/alterar/{id}")
	@Transactional
	public ResponseEntity<AnimalDto> alterar(@PathVariable Long id, @RequestBody @Valid AtualizacaoAnimalForm form) {
		Animal animal = form.atualizar(id, animalRepository);

		return ResponseEntity.ok(new AnimalDto(animal));
	}

	@DeleteMapping("/deletar/{id}")
	@Transactional
	public ResponseEntity<?> deletar(@PathVariable Long id) {
		animalRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/lista")
	public List<AnimalDto> lista() {
		List<Animal> animais = animalRepository.findAllByStatus("A");
		return AnimalDto.converterLista(animais);
	}

	@GetMapping("/listarporusuario/{id}")
	public List<AnimalDto> listaPorUsuario(@PathVariable Long id) {
		Usuario usuario = usuarioRepository.getOne(id);

		List<Animal> animais = animalRepository.findAllByUsuario(usuario);
		return AnimalDto.converterLista(animais);
	}

	@GetMapping("/buscaimagem/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.load(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@GetMapping("/listarporStatus/{id}/{status}")
	public List<AnimalDto> listaPorUsuario(@PathVariable Long id, @PathVariable String status) {
		Usuario usuario = usuarioRepository.getOne(id);

		if (status.equals("ambos")) {
			List<Animal> animais = animalRepository.findAllByUsuario(usuario);
			return AnimalDto.converterLista(animais);

		} else {

			List<Animal> animais = animalRepository.findAllByStatusAndUsuario(status, usuario);
			return AnimalDto.converterLista(animais);
		}
	}

	@PostMapping("/listarcomfiltro")
	public List<AnimalDto> listaPorUsuario(@Valid @RequestBody FiltrosAnimal filtrosAnimal) {

		List<Animal> animais = filtrosAnimal.filtra(animalRepository , filtrosAnimal);
		
		
		return AnimalDto.converterLista(animais);

	}

	private Animal criaHashImagem(@Valid Long idAnimal, MultipartFile imagem) throws Exception {
		Animal animal = animalRepository.findById(idAnimal).orElseThrow(() -> new Exception("Animal não encontrado"));
		String nome = imagem.getOriginalFilename().substring(0, imagem.getOriginalFilename().length() - 4);
		String ext = imagem.getOriginalFilename().substring(imagem.getOriginalFilename().length() - 4,
				imagem.getOriginalFilename().length());
		String imgHashSave = nome + '_' + System.currentTimeMillis() + ext;

		animal.setImagem(imgHashSave);
		return animal;
	}

}
