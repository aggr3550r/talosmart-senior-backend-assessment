import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      console.error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[], throwOnMissing: boolean) {
    keys.forEach((k) => this.getValue(k, throwOnMissing));
    return this;
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false)?.toLowerCase();
    return mode == 'production' || 'prod';
  }

  public isDevelopment() {
    const mode = this.getValue('NODE_ENV', false)?.toLowerCase();
    return mode == 'development' || mode == 'dev' || mode == 'develop';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const pgdBURL = this.getValue('DATABASE_URL');

    console.log('DB URL - %s', pgdBURL);

    if (this.isDevelopment()) {
      return {
        type: 'mysql',
        host: this.getValue('DB_HOST'),
        port: parseInt(this.getValue('DB_PORT')),
        username: this.getValue('DB_USER'),
        password: this.getValue('DB_PASSWORD'),
        database: this.getValue('DATABASE'),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
          __dirname + '/../**/*.repository{.ts,.js}',
        ],
        migrationsTableName: 'migration',
        migrations: [__dirname + 'src/migration/*.ts'],
        // autoLoadEntities: true,
        synchronize: true,
        migrationsRun: true,
        ssl: false,
      };
    } else {
      return {
        type: 'postgres',
        url: pgdBURL,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
          __dirname + '/../**/*.repository{.ts,.js}',
        ],
        migrationsTableName: 'migration',
        migrations: [__dirname + 'src/migration/*.ts'],
        // autoLoadEntities: true,
        synchronize: true,
        migrationsRun: true,
        ssl: true,
      };
    }
  }
}

let configService: ConfigService = new ConfigService(process.env).ensureValues(
  ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DATABASE'],
  true,
);

export { configService };
