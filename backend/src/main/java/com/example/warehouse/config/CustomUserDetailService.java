package com.example.warehouse.config;

import com.example.warehouse.entity.User; // This is your JPA entity
import com.example.warehouse.entity.UserPrincipal;
import com.example.warehouse.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);
        if (user != null) {
            return new UserPrincipal(user);
        } else {
            throw new UsernameNotFoundException("User Not Found!!");
        }
    }
}
