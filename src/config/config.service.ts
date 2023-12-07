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

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, false));
    return this;
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false)?.toLowerCase();
    return mode == 'production';
  }

  public isDevelopment() {
    const mode = this.getValue('NODE_ENV', false)?.toLowerCase();
    return mode == 'development' || mode == 'dev' || mode == 'develop';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('MYSQL_HOST'),
      port: parseInt(this.getValue('MYSQL_PORT')),
      username: this.getValue('MYSQL_USER'),
      password: this.getValue('MYSQL_PASSWORD'),
      database: this.getValue('MYSQL_DATABASE'),
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
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE',
]);

export { configService };
