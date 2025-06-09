package com.example.warehouse.seeder;

import com.example.warehouse.entity.User;
import com.example.warehouse.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if(userRepo.count() == 0){
            userRepo.save(mapSeedUser());
            log.info("Admin Seed Successfully.");
        }else{
            log.info("Admin Already Seed.");
        }
    }

    private User mapSeedUser(){
        User user=new User();
        user.setUserName("super admin user");
        user.setEmail("admin@gmail.com");
        user.setPassword(encoder.encode("Admin@admin123"));
        user.setRole("ROLE_SUPER_ADMIN");
        user.setStatus(true);
        return user;
    }
}
