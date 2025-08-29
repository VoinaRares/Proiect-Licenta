package org.example.interactivemapbackend.repos;

import org.example.interactivemapbackend.model.App_User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<App_User, Long> {

}
