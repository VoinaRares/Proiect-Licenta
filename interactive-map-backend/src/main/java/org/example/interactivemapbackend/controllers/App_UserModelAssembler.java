package org.example.interactivemapbackend.controllers;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.example.interactivemapbackend.model.App_User;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
public class App_UserModelAssembler implements RepresentationModelAssembler<App_User, EntityModel<App_User>> {
    @Override
    public EntityModel<App_User> toModel(App_User user) {
        return EntityModel.of(user,
                linkTo(methodOn(UserController.class).findUser(user.getId())).withSelfRel(),
                linkTo(methodOn(UserController.class).allUsers()).withRel("users"));
    }
}
