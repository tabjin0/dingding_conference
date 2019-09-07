package com.service.Impl.msg;

import com.entity.Chat;
import com.repository.ChatRepository;
import com.service.msg.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat save(Chat chat) {

        return chatRepository.save(chat);
    }
}
