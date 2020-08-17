import Sequelize, { Model } from 'sequelize';

class Pokemon extends Model {
  static init(sequelize) {
    super.init(
      {
        pokemon_identifier: Sequelize.INTEGER,
        name: Sequelize.STRING,
        avatar_url: Sequelize.STRING,
        types: Sequelize.ARRAY(Sequelize.STRING),
        abilities: Sequelize.ARRAY(Sequelize.STRING),
        height: Sequelize.INTEGER,
        weight: Sequelize.INTEGER,
      }, {
        sequelize
      }
    )

    return this;
  }
}

export default Pokemon;
