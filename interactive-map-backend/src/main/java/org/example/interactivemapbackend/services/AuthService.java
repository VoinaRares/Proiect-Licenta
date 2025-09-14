package org.example.interactivemapbackend.services;

import org.example.interactivemapbackend.exceptions.UserNotFoundException;
import org.example.interactivemapbackend.model.App_User;
import org.example.interactivemapbackend.repos.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public App_User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public App_User createUser(App_User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash here
        return userRepository.save(user);
    }

    public boolean emailExists(String email) {
        return userRepository.findAll().stream().anyMatch(user -> user.getEmail().equals(email));
    }

    public boolean usernameExists(String username) {
        return userRepository.findAll().stream().anyMatch(user -> user.getUsername().equals(username));
    }

}
