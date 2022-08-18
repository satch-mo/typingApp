package com.devmountain.TypingTidbits.controllers;

import com.devmountain.TypingTidbits.dtos.TidbitDto;
import com.devmountain.TypingTidbits.services.TidbitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/tidbits")
public class TidbitController {
    @Autowired
    private TidbitService tidbitService;

    @GetMapping("/{tidbitId}")
    public Optional<TidbitDto> getTidbitById(@PathVariable Long tidbitId){
        return tidbitService.getTidbitById(tidbitId);
    }

    @PostMapping("/user/{userId}")
    public void addTidbit(@RequestBody TidbitDto tidbitDto, @PathVariable Long userId){
        tidbitService.addTidbit(tidbitDto, userId);
    }

    @GetMapping("/userTidbit/{userId}")
    public TidbitDto getTidbitBelongingToUser(@PathVariable Long userId){
        return tidbitService.getRandomTidbitByUserId(userId);
    }
}




// first layer - receives http request and figures what to do with them
// endpoints localhost:8080/data
// figures out where next part of code to invoke is
// controller is for routing
// AND validation - making sure input is not bad request (ie -1)
// service is for doing things - makes call to repo to get data
// repository is for database (reading and writing)

// service layer heavy lifting

//@Controller("/facts")
//public class FactController {
//
//    @GetMapping("/single")
//    public Fact blahblahblah() {
//        Fact f = factService.giveMeAFact();
//        return f;
//    }
//
//    @GetMapping("/all")
//    public List<Fact> urmomishot() {
//        List<Fact> list = new List<Fact>();
//        list.add(factService.getAllTheFacts());
//        return list;
//    }
//}

