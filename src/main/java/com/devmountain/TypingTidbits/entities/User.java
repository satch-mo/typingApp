package com.devmountain.TypingTidbits.entities;

import com.devmountain.TypingTidbits.dtos.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;

@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column
    private String password;

//    private Set<Score> scoreSet = new HashSet<>();

    public User(UserDto userDto){
        if (userDto.getUsername() != null){
            this.username = userDto.getUsername();
        }
        if (userDto.getPassword() != null){
            this.password = userDto.getPassword();
        }
    }
}
