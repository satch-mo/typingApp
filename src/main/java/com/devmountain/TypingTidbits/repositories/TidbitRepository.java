package com.devmountain.TypingTidbits.repositories;

import com.devmountain.TypingTidbits.entities.Tidbit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TidbitRepository extends JpaRepository<Tidbit, Long> {
    List<Tidbit> findTidbitsByUserId(Long userId);
}
