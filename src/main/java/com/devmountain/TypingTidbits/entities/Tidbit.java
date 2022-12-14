package com.devmountain.TypingTidbits.entities;

import com.devmountain.TypingTidbits.dtos.TidbitDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Tidbits")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tidbit {
    @Id
    @GeneratedValue
    private Long id;

    @Column(columnDefinition = "text")
    private String body;

    @ManyToOne
    @JsonBackReference
    private User user;

    public Tidbit(TidbitDto tidbitDto){
        if(tidbitDto.getBody() != null) {
            this.body = tidbitDto.getBody();
        }
    }
}