package org.example.interactivemapbackend.services;

import org.example.interactivemapbackend.exceptions.UserNotFoundException;
import org.example.interactivemapbackend.model.App_User;
import org.example.interactivemapbackend.repos.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<App_User> getAllUsers() {
        return userRepository.findAll();
    }

    public App_User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public App_User createUser(App_User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash here
        return userRepository.save(user);
    }

    public App_User updateUser(Long id, App_User newUser) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(newUser.getUsername());
            user.setPassword(passwordEncoder.encode(newUser.getPassword()));
            user.setEmail(newUser.getEmail());
            user.setActive(newUser.isActive());
            return userRepository.save(user);
        }).orElseGet(() -> {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            return userRepository.save(newUser);
        });
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
