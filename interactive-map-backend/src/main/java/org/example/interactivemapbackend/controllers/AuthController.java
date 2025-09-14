package org.example.interactivemapbackend.controllers;


import org.example.interactivemapbackend.model.App_User;
import org.example.interactivemapbackend.services.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/auth/sign-up")
    App_User signUp(@RequestBody App_User user) {
        return authService.createUser(user);
    }

    @GetMapping("/auth/login/{id}")
    App_User login(@PathVariable long id) {
        return authService.getUserById(id);
    }


    @GetMapping("auth/email-exists")
    Boolean emailExists(@RequestParam("email") String email) {
        return authService.emailExists(email);
    }

    @GetMapping("auth/username-exists")
    Boolean usernameExists(@RequestParam("username") String username) {
        return authService.usernameExists(username);
    }


}
