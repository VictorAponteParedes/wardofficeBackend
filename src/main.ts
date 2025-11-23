// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);

  console.log(`Aplicación corriendo en: http://localhost:${port}/api`);
  console.log(`Swagger (cuando lo agreguemos): http://localhost:${port}/api/docs`);
}

bootstrap();



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { UsersService } from './modules/users/users.service';
// import { Roles } from './enums/roles';

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const usersService = app.get(UsersService);

//   const adminData = {
//     email: 'vaponte520@gmail.com',
//     password: 'Admin123',
//     role: Roles.ADMIN,
//     name: 'Victor',
//     lastName: 'Aponte',
//   };

//   try {
//     const existing = await usersService.findByEmail(adminData.email);
//     if (existing) {
//       console.log('El usuario admin ya existe:', existing.email);
//       console.log('Nombre:', existing.name, existing.lastName);
//       await app.close();
//       return;
//     }

//     const admin = await usersService.createUser(
//       adminData.email,
//       adminData.password,
//       adminData.role,
//       adminData.name,
//       adminData.lastName,
//     );

//     console.log('USUARIO ADMIN CREADO CORRECTAMENTE');
//     console.log('Nombre completo:', admin.name, admin.lastName);
//     console.log('Email:', admin.email);
//     console.log('Rol:', admin.role);
//     console.log('ID:', admin.id);
//   } catch (error: any) {
//     console.error('Error creando admin:', error.message);
//   } finally {
//     await app.close();
//     process.exit(0);
//   }
// }

// bootstrap();