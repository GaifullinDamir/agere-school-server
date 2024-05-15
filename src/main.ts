import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        credentials: true,
        origin: true
    })

    const config = new DocumentBuilder()
        .setTitle('Agere-school-api')
        .setDescription('Документация к api Agere.')
        .setVersion('1.0.0')
        .addTag('Agere')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
};

start();