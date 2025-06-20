package com.example.warehouse.jwt;

import com.example.warehouse.config.CustomUserDetailService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Service
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("📥 API Hit: " + request.getMethod() + " " + request.getRequestURI());

        String path=request.getServletPath();
        if("OPTIONS".equalsIgnoreCase(request.getMethod()) ||path.matches(("/api/v1/auth/login"))){
            filterChain.doFilter(request,response);
        }else{

            String authHeader=request.getHeader("Authorization");
            String token =null;
            String username=null;

            if(authHeader != null && authHeader.startsWith("Bearer ")){
                token=authHeader.substring(7);
                try{
                    username= jwtService.extractUsername(token);
                    if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserDetails userDetails = customUserDetailService.loadUserByUsername(username);
                        if (jwtService.validateToken(token,userDetails)){
                            UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                        }else{
                            sendErrorResponse(response,HttpServletResponse.SC_UNAUTHORIZED,"invalid or token expire");
                            return;
                        }
                    }
                } catch (ExpiredJwtException e) {
                    sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Token has expired");
                    return;

                } catch (SignatureException e) {
                    sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid token signature");
                    return;

                } catch (MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
                    sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);

    }
    private void sendErrorResponse(HttpServletResponse response,int status,String message) throws IOException{
        response.setStatus(status);
        response.setContentType("application/json");
        String origin=response.getHeader("Origin");
        if("http://localhost:3001".equals(origin)){
            response.setHeader("Access-Control-Allow-Origin",origin);
        }else{
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
        }
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");

        String json = "{\"message\":\"" + message + "\"}";
        response.getWriter().write(json);
        response.getWriter().flush();
        response.getWriter().close();
    }
}
