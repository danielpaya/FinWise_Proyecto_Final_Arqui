package com.finwise.finwise_backend.users.dto;

import com.finwise.finwise_backend.shared.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateDTO {
    private String name;
    private String email;
    private String password;
    private Role role;
}
