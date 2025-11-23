
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { UsersService } from './modules/users/users.service';

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const usersService = app.get(UsersService);

//   try {
//     const admin = await usersService.createUser(
//       'vaponte520@gmail.com',
//       'Admin{123.}', // Se hasheará automáticamente
//       'admin'
//     );
//     console.log('✅ Usuario admin creado exitosamente:');
//     console.log('   Email:', admin.email);
//     console.log('   Role:', admin.role);
//     console.log('   ID:', admin.id);
//   } catch (error) {
//     if (error.message.includes('unique constraint')) {
//       console.log('⚠️  El usuario admin@example.com ya existe');
//     } else {
//       console.log('❌ Error creando usuario:', error.message);
//     }
//   } finally {
//     await app.close();
//     process.exit(0);
//   }
// }

// bootstrap();