package com.devmountain.TypingTidbits.services;

import com.devmountain.TypingTidbits.dtos.TidbitDto;
import com.devmountain.TypingTidbits.entities.Tidbit;
import com.devmountain.TypingTidbits.repositories.TidbitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Service
public class TidbitServiceImpl implements TidbitService{
    @Autowired
    private TidbitRepository tidbitRepository;

    @Override
    @Transactional
    public void addTidbit(TidbitDto tidbitDto){
        Tidbit tidbit = new Tidbit(tidbitDto);
        tidbitRepository.saveAndFlush(tidbit);
    }

    @Override
    public Optional<TidbitDto> getTidbitById(Long tidbitId){
        Optional<Tidbit> tidbitOptional = tidbitRepository.findById(tidbitId);
        if (tidbitOptional.isPresent()){
            return Optional.of(new TidbitDto(tidbitOptional.get()));
        }
        return Optional.empty();
    }
}

// service layer - "heavy lifting" figures out if what user typed matches string on screen