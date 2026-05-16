package com.finwise.finwise_backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI finwiseOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Development Server");
        
        Contact contact = new Contact();
        contact.setEmail("contact@finwise.ai");
        contact.setName("FinWise Team");
        
        License mitLicense = new License()
                .name("MIT License")
                .url("https://choosealicense.com/licenses/mit/");
        
        Info info = new Info()
                .title("FinWise AI Backend API")
                .version("1.0")
                .contact(contact)
                .description("API documentation for FinWise AI - Personal Finance Management Application")
                .license(mitLicense);
        
        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer));
    }
}
