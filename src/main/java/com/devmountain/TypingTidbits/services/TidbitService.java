package com.devmountain.TypingTidbits.services;

import com.devmountain.TypingTidbits.dtos.TidbitDto;

import javax.transaction.Transactional;
import java.util.Optional;

public interface TidbitService {
    @Transactional
    void addTidbit(TidbitDto tidbitDto);

    Optional<TidbitDto> getTidbitById(Long tidbitId);
}
