package com.devmountain.TypingTidbits.services;

import com.devmountain.TypingTidbits.dtos.TidbitDto;
import com.devmountain.TypingTidbits.entities.Tidbit;
import com.devmountain.TypingTidbits.repositories.TidbitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
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

    @Override
    public TidbitDto getRandomTidbitByUserId(Long userId){
        List<Tidbit> resultList = tidbitRepository.findTidbitsByUserId(userId);
        List<TidbitDto> appleSauce = new ArrayList<>();

        for(int i = 0; i< resultList.size(); i++){
            TidbitDto llama = new TidbitDto(resultList.get(i));
            appleSauce.add(llama);
        }

        int randomIndex = (int) (Math.random() * appleSauce.size());
        TidbitDto randomTidbitDto = appleSauce.get(randomIndex);

        return randomTidbitDto;
    }

}

// service layer - "heavy lifting" figures out if what user typed matches string on screen