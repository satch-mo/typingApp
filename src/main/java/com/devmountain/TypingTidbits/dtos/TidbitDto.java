package com.devmountain.TypingTidbits.dtos;

import com.devmountain.TypingTidbits.entities.Tidbit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TidbitDto {
    private Long id;
    private String body;
    private UserDto userDto;

    public TidbitDto(Tidbit tidbit){
        if (tidbit.getId() != null){
            this.id = tidbit.getId();
        }
        if (tidbit.getBody() != null){
            this.body = tidbit.getBody();
        }
    }
}
