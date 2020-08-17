import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Pokemon from '../app/models/Pokemon';

const models = [Pokemon];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
