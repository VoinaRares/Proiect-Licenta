package org.example.interactivemapbackend.controllers;

import org.example.interactivemapbackend.model.App_User;
import org.example.interactivemapbackend.services.UserService;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class UserController {
    private final UserService userService;
    private final App_UserModelAssembler userModelAssembler;

    public UserController(UserService userService, App_UserModelAssembler userModelAssembler) {
        this.userService = userService;
        this.userModelAssembler = userModelAssembler;
    }

    @GetMapping("/users")
    CollectionModel<EntityModel<App_User>> allUsers() {
        List<EntityModel<App_User>> users = userService.getAllUsers()
                .stream().map(userModelAssembler::toModel).collect(Collectors.toList());
        return CollectionModel.of(users,
                linkTo(methodOn(UserController.class).allUsers()).withSelfRel());
    }

    @PostMapping("/users")
    App_User createUser(@RequestBody App_User user) {
        return userService.createUser(user);
    }

    @GetMapping("/users/{id}")
    EntityModel<App_User> findUser(@PathVariable Long id) {
        return userModelAssembler.toModel(userService.getUserById(id));
    }

    @PutMapping("/users/{id}")
    App_User updateUser(@PathVariable Long id, @RequestBody App_User newUser) {
        return userService.updateUser(id, newUser);
    }

    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

