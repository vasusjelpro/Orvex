package com.orvex.api.config;

import com.orvex.compat.MotorCompatibilidad;
import com.orvex.compat.reglas.ReglasPorDefecto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MotorConfig {

    @Bean
    MotorCompatibilidad motorCompatibilidad() {
        return new MotorCompatibilidad(ReglasPorDefecto.crear());
    }
}
