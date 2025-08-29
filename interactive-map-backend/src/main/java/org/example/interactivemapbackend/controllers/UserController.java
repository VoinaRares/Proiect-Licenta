package org.example.interactivemapbackend.controllers;

import org.example.interactivemapbackend.exceptions.UserNotFoundException;
import org.example.interactivemapbackend.model.App_User;
import org.example.interactivemapbackend.repos.UserRepository;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class UserController {
    private final UserRepository userRepository;
    private final App_UserModelAssembler userModelAssembler;

    public UserController(UserRepository userRepository, App_UserModelAssembler userModelAssembler) {
        this.userRepository = userRepository;
        this.userModelAssembler = userModelAssembler;
    }

    @GetMapping("/users")
    CollectionModel<EntityModel<App_User>> allUsers() {
        List<EntityModel<App_User>> users = userRepository.findAll().stream().map(userModelAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(users, linkTo(methodOn(UserController.class).allUsers()).withSelfRel());
    }

    @PostMapping("/users")
    App_User createUser(@RequestBody App_User user) {
        return userRepository.save(user);
    }

    @GetMapping("/users/{id}")
    EntityModel<App_User> findUser(@PathVariable Long id) {
        App_User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return userModelAssembler.toModel(user);
    }

    @PutMapping("/users/{id}")
    App_User updateUser(@PathVariable Long id, @RequestBody App_User newUser) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(newUser.getUsername());
            user.setPassword(newUser.getPassword());
            user.setEmail(newUser.getEmail());
            user.setActive(newUser.isActive());
            return userRepository.save(user);

        }).orElseGet(() -> userRepository.save(newUser));
    }

    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
