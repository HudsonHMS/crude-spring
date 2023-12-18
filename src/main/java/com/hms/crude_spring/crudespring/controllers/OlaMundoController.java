package com.hms.crude_spring.crudespring.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OlaMundoController {

    @GetMapping("/ola")
    public String olaMundo() {
        return "Olá mundo";
    }

}
