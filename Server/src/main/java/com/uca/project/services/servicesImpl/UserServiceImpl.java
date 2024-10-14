package com.uca.project.services.servicesImpl;

import com.uca.project.domain.DTOs.UserRegisterDTO;
import com.uca.project.domain.entities.Home;
import com.uca.project.domain.entities.Role;
import com.uca.project.domain.entities.Token;
import com.uca.project.domain.entities.User;
import com.uca.project.repositories.HomeRepository;
import com.uca.project.repositories.RoleRepository;
import com.uca.project.repositories.TokenRepository;
import com.uca.project.repositories.UserRepository;
import com.uca.project.services.HomeService;
import com.uca.project.services.UserService;
import com.uca.project.utils.JWTTools;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final JWTTools jwtTools;

    private final TokenRepository tokenRepository;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, JWTTools jwtTools, TokenRepository tokenRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.jwtTools = jwtTools;
        this.tokenRepository = tokenRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User findByIdentifier(String identifier) {
        try{
            UUID id = UUID.fromString(identifier);
            return userRepository.findById(id).orElse(null);
        }catch (IllegalArgumentException e){
        }
        return userRepository.findOneUserByUsernameOrEmail(identifier, identifier);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void registerUser(UserRegisterDTO info) {
        User user = new User();
        user.setUsername(info.getUsername());
        user.setEmail(info.getEmail());
        user.setActive(true);
        user.setDui(null);
        user.setPictureurl(info.getPictureurl());
        userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {

        return userRepository.findUserByUsername(username);
    }

    @Override
    public User findById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Token registerToken(User user) throws Exception {
        cleanTokens(user);

        String tokenString = jwtTools.generateToken(user);
        Token token = new Token(tokenString, user);

        tokenRepository.save(token);

        return token;
    }

    @Override
    public Boolean isTokenValid(User user, String token) {
        try {
            cleanTokens(user);
            List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

            tokens.stream()
                    .filter(tk -> tk.getContent().equals(token))
                    .findAny()
                    .orElseThrow(() -> new Exception());

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void cleanTokens(User user) throws Exception {
        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if(!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });

    }

    @Override   //lo uso
    public List<User> findUsersByRole(String roleName) {
        Role role = roleRepository.findByRole(roleName);
        return userRepository.findByRolesContaining(role);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }


    @Override   //lo uso
    public User findUserAuthenticated() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findOneUserByUsernameOrEmail(username, username);
    }
}
